# nexalabs.tech Audit Log

Ongoing log for the Website Audit & Improvement Agent role (see AGENTS.md).
Newest entries at the top. Each entry: what was checked, what was found,
what changed and why, what's still open.

---

## 2026-09-23 — Content accuracy, SEO metadata, accessibility pass

**Checked:** the two items the 2026-09-16 entry flagged as not yet
covered — SEO content depth (per-page metadata, heading structure) and
a broader accessibility pass — plus content-accuracy (unverified
technical/performance claims) and a dead-code check, prompted by
picking up autonomous work with no other task queued.

**Found and fixed (low-risk, auto-applied):**
- **Fabricated technical claims, live on every generic product page.**
  `app/products/[slug]/page.tsx` hard-coded a "Sub-15ms Edge / Stateless
  Auth / Zero Overhead" stat-tile row on *every* product using that
  template — currently Nexa SiteAudit (a Lighthouse-style diagnostic
  tool), Nexa QuoteFlow (a proposal/e-sign builder), and Nexa
  InvoiceChaser (an invoice-chasing automation tool). None of these are
  edge APIs; "Stateless Auth" and "Sub-15ms Edge" are meaningless-to-
  false claims about them. The 2026-09-16 session already noticed this
  exact problem for the Clip Scoring API and worked around it by giving
  that one product a bespoke page instead — this fixes the root cause
  by removing the fabricated block from the shared template. Each
  product's real `features` list (already rendered just above it) is
  the honest source of truth and needed no replacement content.
  Same issue, smaller scale: `components/FAQ.tsx`'s fallback FAQ
  answer claimed "sub-15ms execution speeds" for integrations
  generally — removed the specific number, kept the rest of the answer.
- **Legal pages had no per-page metadata at all.** Privacy Policy,
  Terms & Conditions, and Cookie Policy (`app/[slug]/page.tsx`) showed
  the root layout's generic homepage tagline as their browser-tab title
  and search-result title/snippet — e.g. the Privacy Policy's tab said
  "Nexa Labs — Small software. Big impact." instead of "Privacy
  Policy | Nexa Labs". Added `generateMetadata` using the page's own
  real `title` field (already fetched from Sanity) — no invented copy.
- **`/changelog` had no metadata either** (real, valuable content —
  release notes — inheriting the same generic homepage tagline/
  description). Added a real title + description + matching OG/Twitter
  fields so shared links preview correctly.
- **`/success` (post-payment page) had no `robots` directive**, so it
  inherited the default `index: true` — a transactional "thank you"
  page has no content value to a search visitor and shouldn't be
  indexed. Added `robots: { index: false, follow: false }`. (Checkout
  is still disabled — this route isn't reachable in practice right
  now — but the fix is correct regardless and costs nothing to have in
  place already.)
- **Second `<h1>` possible on every blog/changelog/legal page.**
  `components/PortableTextComponents.tsx` mapped Sanity's "H1" rich-text
  block style straight to an `<h1>` tag — but every page that renders
  this content already has its own real `<h1>` (the page/post title)
  above it. Any CMS author who picked that heading style in Sanity would
  have produced two `<h1>`s on the page, a WCAG 1.3.1 violation. Shifted
  every level down one (H1 style → `<h2>` tag, H2 → `<h3>`, etc.) so CMS
  content nests under the real page heading; same visual sizes as
  before, purely a tag change.
- **Form labels not programmatically associated with their inputs**
  (`components/ContactForm.tsx`): all four fields had visible `<label>`
  text with no `htmlFor`/`id` pairing, so a screen reader announced
  "edit text, required" with no accessible name at all. Added matching
  `id`/`htmlFor` pairs. Also added `aria-pressed` + `role="group"` to
  the inquiry-type button toggle (General/Support/Partnership), which
  only communicated its selected state visually (background color).
- **Placeholder-as-only-label** on the two newsletter/waitlist email
  inputs (`components/WaitlistForm.tsx`, `components/
  NewsletterWaitlist.tsx`) — placeholder text is not a reliable
  accessible name (it disappears on input and isn't consistently
  exposed by assistive tech). Added `aria-label="Email address"` to
  both.
- **Unlabeled range slider** (`components/RoiCalculator.tsx`) — had a
  visible text description in a `<span>` next to it, never connected to
  the `<input type="range">`. Added `aria-label="Active proposals and
  invoices per month"`.
- **Dead code:** `app/products/[slug]/ProductWaitlistForm.tsx` was a
  byte-identical, unimported duplicate of `components/
  ProductWaitlistForm.tsx` (confirmed via diff and a repo-wide import
  search before deleting) — almost certainly a leftover from when the
  Clip Scoring API page was split out. Removed.

**Checked clean, no fix needed:**
- Internal nav/footer links and homepage anchor targets (`/#products`,
  `/#story`, `/#contact`) all resolve to real routes/ids.
- Image `alt` text (blog cards, blog post hero, testimonials) is real
  and specific, no regression since the 2026-09-16 pass.
- `ProductWaitlistForm.tsx` and `ApiAccessRequestForm.tsx` already had
  correct `htmlFor`/`id` label association — not every form had this
  bug, just the three older ones.
- No other unverified-superlative language found in a broader grep
  (`99.9%`, `enterprise-grade`, `bank-level`, `industry-leading`, etc.)
  beyond what's listed above.

**Verification:** `npx tsc --noEmit` and `npm run lint` both clean
across the whole project (not just changed files). `next build` ran
through a full compile + typecheck successfully ("Compiled
successfully", "Finished TypeScript") and then failed during static
generation on the pre-existing Sanity network-egress sandbox
restriction noted in every prior entry (`app/[slug]/page.tsx`'s
`generateStaticParams`, unrelated to this pass's changes — confirmed by
the error pointing at a line that existed before this session) — full
`next build` still isn't possible in this sandbox; lint+typecheck
remains the floor per AGENTS.md.

**Open / needs human or legal review:**
- Same standing items as every prior entry: legal pages' bracketed
  KvK/VAT/address placeholders, checkout disabled pending KvK
  registration — neither touched here, both still blocked on the
  business actually registering.
- Not yet audited this pass: performance/bundle size (no bundle
  analysis run), and a real cross-browser/device check of the new
  mobile-nav work on the sibling `nexa-ai` dashboard (out of scope for
  this repo). Next run should cover bundle size at minimum.

---

## 2026-09-23 — Clip Scoring API product listing

**Context:** Nexa AI's dashboard just had its public-facing `/clip-api`
landing page gated back behind login (owner decided against any public
surface on that app). Per the owner's request, moved the public
marketing + request-access surface for the same product to this site
instead, reusing this repo's own established patterns rather than
inventing new ones. Nexa AI's backend (`/api/v1/score-clip`) still
serves the actual API directly to customers once they have a key — this
site is the storefront/lead-capture only, not a proxy.

**Changed:**
- New Sanity `apiAccessRequest` schema (email + use-case + timestamp,
  Dutch-labeled admin fields, same read-only-record pattern as
  `contactMessage`/`waitlist`) — separate from `waitlist` because it
  needs a use-case field the generic waitlist doesn't have.
- New `ApiAccessRequestForm` + `app/api/request-api-access` route,
  following the exact established 3-step pattern from
  `app/api/contact/route.ts`: best-effort Sanity write (fail-safe),
  hard-fail-visible Resend admin notify (reply-to the requester), and a
  best-effort Resend confirmation back to the requester. Honeypot field
  for bot filtering, matching the pattern already used in Nexa AI's own
  now-internal request form.
- New dedicated page `app/products/clip-scoring-api/page.tsx` — a
  static route at the same segment the generic `[slug]/page.tsx`
  template would otherwise catch, so this product gets a real API
  contract (request/response example) instead of that template's
  generic, unverified "Sub-15ms Edge / Stateless Auth / Zero Overhead"
  stat tiles. `generateStaticParams` in `[slug]/page.tsx` now excludes
  this slug to avoid both routes trying to statically generate the same
  path.
- Added "Developer Tools" to the `/products` category filter tabs
  (`EcosystemFilter.tsx`) — it was a valid Sanity category value with no
  corresponding tab, a pre-existing gap this product exposed.
- Added a `code` icon option (`ProductCard.tsx` + `product` schema) —
  the only prior options (search/file-text/receipt) didn't fit an API
  product.
- Added the Clip Scoring API to `scripts/seedProducts.mjs` (the existing
  idempotent seed pattern) for reproducibility, and separately created +
  published the live Sanity `product` document via direct MCP access so
  it's real now rather than waiting on a manual script run.
- Privacy-policy link added directly on the new request form (GDPR Art.
  13 transparency at the point of collection) — the existing
  `ContactForm`/`ProductWaitlistForm` don't have this either; adding it
  to the new form is a low-risk structural fix, not new legal text.

**Not done / needs the business owner:**
- No pricing number published — billing is manual/"contact us", so no
  real number exists yet to put in the `price` field. Don't fill it with
  a placeholder later; get a real number from the owner first.
- No new legal text was drafted. This form collects the same shape of
  data (email + free text) the existing, already-reviewed contact form
  and waitlist collect, under the same live Privacy Policy — it doesn't
  open new legal territory, but hasn't had a lawyer's eyes on it either
  (same standing caveat as the rest of the site's legal pages).

**Verification:** `npm run lint` and `npx tsc --noEmit` both clean. Full
`next build` not run this pass (same Sanity-network sandbox constraint
noted in the 2026-09-16 entry).

**Open:**
- Real production domain for Nexa AI's API is still unknown/unassigned —
  the request/response example on the new page uses an honest
  placeholder, not a real host, same as the (now internal) Nexa AI page
  it mirrors.

---

## 2026-09-16 — Initial audit pass

**Checked:** legal/compliance (carried over from same-day work), broken
links/routes, SEO metadata (sitemap/robots), accessibility (image alt
text), basic security (secrets exposure, unsafe patterns), mobile
responsiveness (390px viewport, hero + contact sections).

**Found and fixed (low-risk, auto-applied):**
- `app/sitemap.ts` still listed `/about` and `/contact` as indexable
  pages. Both are now redirect-only stubs to homepage anchors (`#story`,
  `#contact`) since the one-page redesign — leaving them in the sitemap
  told search engines to index pages that just redirect elsewhere.
  Removed both, added `/changelog` and the three legal pages
  (`/privacy-policy`, `/terms-and-conditions`, `/cookie-policy`), which
  were missing despite being real, real pages.

**Checked clean, no fix needed:**
- All internal `Link`/`href` targets resolve to real routes.
- `robots.ts` correctly disallows `/studio/` and `/api/`.
- The only image usage (`Testimonials.tsx` avatars) already has real,
  meaningful `alt` text via `next/image`.
- No `dangerouslySetInnerHTML`, no `eval`, no secrets in any
  `NEXT_PUBLIC_*` variable, no `.env*` file tracked in git.
- Mobile viewport (390px): no horizontal overflow, hero and contact
  sections both stack cleanly with no layout bugs.

**Verification:** `npm run lint` and `npx tsc --noEmit` both clean after
the sitemap fix. Full `next build` still can't run in this sandbox
(Sanity API calls blocked by network policy here — not a code issue,
confirmed in an earlier session) — lint+typecheck is the verification
floor per AGENTS.md until a build-capable environment is available.

**Open / needs human or legal review:**
- Privacy Policy / Terms / Cookie Policy still carry the bracketed
  company-registration placeholder (KvK, VAT-id, address) — blocked on
  KvK registration, not something to fix here.
- Checkout remains intentionally disabled for the same reason.
- Not yet audited this pass: performance/bundle size, SEO content depth
  (heading structure, meta descriptions per dynamic page), conversion-
  funnel UX beyond a visual check. Next run should cover these.
