<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Legal/compliance review — standing requirement

nexalabs.tech takes real payments (Stripe checkout) and collects real
personal data (waitlist, contact form) from EU/NL visitors. Every
change that touches pricing, checkout, forms, data collection, cookies/
tracking, or the legal pages must be checked against current EU/NL law
(GDPR, ePrivacy/cookie rules, Consumer Rights Directive incl. the
withdrawal-button requirement from Directive (EU) 2023/2673, Dutch
mandatory business-disclosure rules under BW art. 3:15d) before
shipping, not just reviewed once.

Rules for this review, every time:
- Verify against current official sources (EUR-Lex, autoriteitpersoonsgegevens.nl,
  business.gov.nl, kvk.nl) — never assert a legal requirement from memory alone.
- Never invent company facts: KvK number, VAT/BTW ID, registered address,
  refund/withdrawal policy specifics, or legal claims. Where real facts are
  missing, flag it for the business owner (or their lawyer) to supply —
  don't fill the gap with a plausible-sounding placeholder.
- Fix structural/plumbing issues directly (e.g. footer links to legal
  pages, consent-mechanism scaffolding). Do not write the substantive
  legal text of a policy or a consent-waiver disclosure yourself —
  that needs a lawyer's sign-off given the real liability involved.
- Report format: Issues found / Changes made / Remaining risks / Sources
  used / Compliance status.

Status as of 2026-09-16 (see that session for full detail):
- Privacy Policy, Terms & Conditions, and Cookie Policy are drafted and
  published live in Sanity (`legal` type, slugs `privacy-policy`,
  `terms-and-conditions`, `cookie-policy` — footer links resolve).
  Each still has a bracketed placeholder for company legal name/KvK
  number/VAT-id/registered address — fill these in the moment real
  registration exists, and get all three reviewed by a lawyer once the
  business is operating for real (they were drafted to accurately
  describe current site behavior, not reviewed by counsel).
- Checkout is deliberately disabled (`app/api/checkout/route.ts` returns
  503 unconditionally) because Nexa Labs isn't KvK/VAT-registered yet
  and can't legally take payments. `CheckoutButton.tsx` is unused in the
  UI already. Re-enabling requires, at minimum: KvK + VAT registration,
  real VAT-inclusive pricing, and EU withdrawal-right handling (disclosure
  + withdrawal button per Directive (EU) 2023/2673, or a valid consent/
  waiver flow for immediate digital delivery) — do not just restore the
  old route without adding these.
- The waitlist confirmation email has a real (manual/reply-based, not
  automated) unsubscribe path — keep this truthful if it's ever changed
  to an automated one.
