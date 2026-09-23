#!/usr/bin/env node
// One-time (idempotent) seed: creates the 3 products that used to be
// hardcoded in data/products.ts as real Sanity `product` documents, so
// the live site isn't left empty the moment it starts reading from
// Sanity instead of that array. Safe to re-run — createOrReplace with a
// fixed _id upserts rather than duplicating.
//
// Needs SANITY_API_TOKEN (a token with write access — create one at
// sanity.io/manage → your project → API → Tokens) plus the usual
// NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET, in
// .env.local or already exported.
//
// Usage: npm run seed:products
import { createClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN

if (!projectId) {
  console.error('NEXT_PUBLIC_SANITY_PROJECT_ID is not set.')
  process.exit(1)
}
if (!token) {
  console.error('SANITY_API_TOKEN is not set — a write token is required to seed documents.')
  process.exit(1)
}

const client = createClient({ projectId, dataset, apiVersion: '2024-01-01', useCdn: false, token })

const PRODUCTS = [
  {
    _id: 'product-siteaudit',
    _type: 'product',
    name: 'Nexa SiteAudit',
    slug: { _type: 'slug', current: 'siteaudit' },
    description:
      'Sub-second headless site diagnostic engine verifying Core Web Vitals, OpenGraph tags, WCAG accessibility, and broken links.',
    category: 'SEO & Performance',
    status: 'live',
    iconName: 'search',
    tags: ['SEO', 'Lighthouse', 'WCAG'],
    features: [
      'Sub-second Headless Lighthouse Diagnostic',
      'OpenGraph, Schema.org & Meta-Tag Verification',
      'WCAG 2.1 AA Accessibility Compliance Engine',
      'Real-time Broken Link & Asset Crawling',
      'CI/CD Deployment Gate Webhooks',
    ],
  },
  {
    _id: 'product-quoteflow',
    _type: 'product',
    name: 'Nexa QuoteFlow',
    slug: { _type: 'slug', current: 'quoteflow' },
    description:
      'Interactive dynamic pricing and proposal builder with instant e-signatures, client view telemetry, and direct deposit payments.',
    category: 'Sales',
    status: 'beta',
    iconName: 'file-text',
    tags: ['Proposals', 'e-Sign', 'Stripe'],
    features: [
      'Interactive Dynamic Pricing & Scope Selection',
      'Instant Edge PDF Generation & e-Signature',
      'Real-time Client View & Open Telemetry',
      'Direct Stripe Deposit Payment Integration',
      'Custom Domain Support with Tailored Branding',
    ],
  },
  {
    _id: 'product-invoicechaser',
    _type: 'product',
    name: 'Nexa InvoiceChaser',
    slug: { _type: 'slug', current: 'invoicechaser' },
    description:
      'Autonomous payment recovery sequence engine that tracks overdue invoices, calculates late fees, and collects payments via Stripe & Mollie.',
    category: 'Finance',
    status: 'beta',
    iconName: 'receipt',
    tags: ['Invoicing', 'Automation', 'Payments'],
    features: [
      'Smart Escalation Sequences (Email & API Reminders)',
      'Direct Accounting Sync (QuickBooks, Xero, Exact Online)',
      'One-Click Instant Payment Link Embedding',
      'Autonomous Late Fee & Penalty Calculation',
      'Immutable Audit Logs & Read-Receipt Tracking',
    ],
  },
  {
    _id: 'product-clip-scoring-api',
    _type: 'product',
    name: 'Clip Scoring API',
    slug: { _type: 'slug', current: 'clip-scoring-api' },
    description:
      "Score a short-form clip's virality and copyright risk before you spend time editing it — one API call, real reasoning, draft captions for YouTube, TikTok, and Instagram.",
    category: 'Developer Tools',
    status: 'beta',
    iconName: 'code',
    tags: ['API', 'Short-form', 'Content'],
    features: [
      'Virality score (0–100) from a clip description and optional source URL',
      'Copyright-risk read with real reasoning, not a keyword flag',
      'Draft captions and hashtags per platform',
      'Plain-English repost/skip recommendation with a confidence score',
    ],
    // No price set deliberately — billing is manual (see
    // app/products/clip-scoring-api/page.tsx), so there is no real number
    // to publish here yet.
  },
]

const transaction = client.transaction()
for (const product of PRODUCTS) {
  transaction.createOrReplace(product)
}
const result = await transaction.commit()
console.log(`seeded ${result.results.length} products:`, result.results.map((r) => r.id).join(', '))
