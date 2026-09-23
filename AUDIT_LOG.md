# nexalabs.tech Audit Log

Ongoing log for the Website Audit & Improvement Agent role (see AGENTS.md).
Newest entries at the top. Each entry: what was checked, what was found,
what changed and why, what's still open.

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
