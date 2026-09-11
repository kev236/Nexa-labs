export interface Product {
  _id: string
  id?: string
  title: string
  name?: string
  slug: string
  description: string
  category: string
  status: string
  features: string[]
  price?: string
  iconName?: string
}

export const PRODUCTS: Product[] = [
  {
    _id: 'siteaudit',
    id: 'siteaudit',
    title: 'Nexa SiteAudit',
    name: 'Nexa SiteAudit',
    slug: 'siteaudit',
    description:
      'Sub-second headless site diagnostic engine verifying Core Web Vitals, OpenGraph tags, WCAG accessibility, and broken links.',
    category: 'Performance & SEO',
    status: 'Live',
    price: 'Free / Pro',
    iconName: 'search',
    features: [
      'Sub-second Headless Lighthouse Diagnostic',
      'OpenGraph, Schema.org & Meta-Tag Verification',
      'WCAG 2.1 AA Accessibility Compliance Engine',
      'Real-time Broken Link & Asset Crawling',
      'CI/CD Deployment Gate Webhooks',
    ],
  },
  {
    _id: 'quoteflow',
    id: 'quoteflow',
    title: 'Nexa QuoteFlow',
    name: 'Nexa QuoteFlow',
    slug: 'quoteflow',
    description:
      'Interactive dynamic pricing and proposal builder with instant e-signatures, client view telemetry, and direct deposit payments.',
    category: 'Sales Automation',
    status: 'Beta',
    price: '$29/mo',
    iconName: 'file-text',
    features: [
      'Interactive Dynamic Pricing & Scope Selection',
      'Instant Edge PDF Generation & e-Signature',
      'Real-time Client View & Open Telemetry',
      'Direct Stripe Deposit Payment Integration',
      'Custom Domain Support with Tailored Branding',
    ],
  },
  {
    _id: 'invoicechaser',
    id: 'invoicechaser',
    title: 'Nexa InvoiceChaser',
    slug: 'invoicechaser',
    description:
      'Autonomous payment recovery sequence engine that tracks overdue invoices, calculates late fees, and collects payments via Stripe & Mollie.',
    category: 'Finance Ops',
    status: 'Beta',
    price: '$19/mo',
    iconName: 'credit-card',
    features: [
      'Smart Escalation Sequences (Email & API Reminders)',
      'Direct Accounting Sync (QuickBooks, Xero, Exact Online)',
      'One-Click Instant Payment Link Embedding',
      'Autonomous Late Fee & Penalty Calculation',
      'Immutable Audit Logs & Read-Receipt Tracking',
    ],
  },
]

export async function getProducts(): Promise<Product[]> {
  return PRODUCTS
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return PRODUCTS.find((p) => p.slug === slug)
}