export interface Product {
  id: string
  _id?: string
  title: string
  name?: string
  slug: string
  description: string
  category: 'Sales' | 'Finance' | 'SEO & Performance' | 'Developer Tools' | string
  status: 'Live' | 'Beta' | 'Coming soon'
  iconName: string
  tags?: string[]
  price?: string
  features?: string[]
}

export interface UpcomingProduct {
  id: string
  title: string
  description: string
  category: string
  votes: number
}

export const PRODUCTS: Product[] = [
  {
    id: 'siteaudit',
    _id: 'siteaudit',
    title: 'Nexa SiteAudit',
    name: 'Nexa SiteAudit',
    slug: 'siteaudit',
    description:
      'Sub-second headless site diagnostic engine verifying Core Web Vitals, OpenGraph tags, WCAG accessibility, and broken links.',
    category: 'SEO & Performance',
    status: 'Live',
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
    id: 'quoteflow',
    _id: 'quoteflow',
    title: 'Nexa QuoteFlow',
    name: 'Nexa QuoteFlow',
    slug: 'quoteflow',
    description:
      'Interactive dynamic pricing and proposal builder with instant e-signatures, client view telemetry, and direct deposit payments.',
    category: 'Sales',
    status: 'Beta',
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
    id: 'invoicechaser',
    _id: 'invoicechaser',
    title: 'Nexa InvoiceChaser',
    name: 'Nexa InvoiceChaser',
    slug: 'invoicechaser',
    description:
      'Autonomous payment recovery sequence engine that tracks overdue invoices, calculates late fees, and collects payments via Stripe & Mollie.',
    category: 'Finance',
    status: 'Beta',
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
]

export const UPCOMING_PRODUCTS: UpcomingProduct[] = [
  {
    id: 'nexa-cron',
    title: 'Nexa CronEngine',
    description:
      'Serverless scheduled task monitor with instant Slack/Discord alerting on failed jobs.',
    category: 'Developer Tools',
    votes: 142,
  },
  {
    id: 'nexa-auth',
    title: 'Nexa MicroAuth',
    description:
      'Stateless Passkey & WebAuthn authentication widget with sub-5ms Edge verification.',
    category: 'Developer Tools',
    votes: 98,
  },
  {
    id: 'nexa-feedback',
    title: 'Nexa FeedbackPulse',
    description:
      'In-app micro-surveys and feature voting widget for SaaS product managers.',
    category: 'Sales',
    votes: 215,
  },
]

export async function getProducts(): Promise<Product[]> {
  return PRODUCTS
}

export async function getProductBySlug(
  slug: string
): Promise<Product | undefined> {
  return PRODUCTS.find((p) => p.slug === slug)
}