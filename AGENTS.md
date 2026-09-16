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

Known open items as of the last audit (2026-09-16) — see that session's
report for full detail: no published Privacy Policy/Terms/Cookie Policy
content yet (mechanism exists via the `legal` Sanity type + footer links
now point at /privacy-policy, /terms-and-conditions, /cookie-policy —
create matching Sanity documents with those exact slugs); no KvK/BTW
number or registered address published anywhere on the site; the Stripe
checkout has no right-of-withdrawal disclosure, no withdrawal button
(required since 19 June 2026 under Directive (EU) 2023/2673), and no
consent-to-immediate-performance / waiver-of-withdrawal-right checkbox
for digital goods; product prices aren't labeled as VAT-inclusive or
exclusive.
