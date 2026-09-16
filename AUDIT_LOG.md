# nexalabs.tech Audit Log

Ongoing log for the Website Audit & Improvement Agent role (see AGENTS.md).
Newest entries at the top. Each entry: what was checked, what was found,
what changed and why, what's still open.

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
