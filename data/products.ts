export interface Product {
  id: string
  title: string
  slug: string
  description: string
  category: 'Sales' | 'Finance' | 'SEO & Performance' | 'Developer Tools'
  status: 'Live' | 'Beta' | 'Coming soon'
  iconName: string
  tags: string[]
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
    title: 'Nexa SiteAudit',
    slug: 'siteaudit',
    description:
      'Sub-second headless site diagnostic engine verifying Core Web Vitals, OpenGraph tags, WCAG accessibility, and broken links.',
    category: 'SEO & Performance',
    status: 'Live',
    iconName: 'search',
    tags: ['SEO', 'Lighthouse', 'WCAG'],
  },
  {
    id: 'quoteflow',
    title: 'Nexa QuoteFlow',
    slug: 'quoteflow',
    description:
      'Interactive dynamic pricing and proposal builder with instant e-signatures, client view telemetry, and direct deposit payments.',
    category: 'Sales',
    status: 'Beta',
    iconName: 'file-text',
    tags: ['Proposals', 'e-Sign', 'Stripe'],
  },
  {
    id: 'invoicechaser',
    title: 'Nexa InvoiceChaser',
    slug: 'invoicechaser',
    description:
      'Autonomous payment recovery sequence engine that tracks overdue invoices, calculates late fees, and collects payments via Stripe & Mollie.',
    category: 'Finance',
    status: 'Beta',
    iconName: 'receipt',
    tags: ['Invoicing', 'Automation', 'Payments'],
  },
]

export const UPCOMING_PRODUCTS: UpcomingProduct[] = [
  {
    id: 'nexa-cron',
    title: 'Nexa CronEngine',
    description: 'Serverless scheduled task monitor with instant Slack/Discord alerting on failed jobs.',
    category: 'Developer Tools',
    votes: 142,
  },
  {
    id: 'nexa-auth',
    title: 'Nexa MicroAuth',
    description: 'Stateless Passkey & WebAuthn authentication widget with sub-5ms Edge verification.',
    category: 'Developer Tools',
    votes: 98,
  },
  {
    id: 'nexa-feedback',
    title: 'Nexa FeedbackPulse',
    description: 'In-app micro-surveys and feature voting widget for SaaS product managers.',
    category: 'Sales',
    votes: 215,
  },
]

export async function getProducts(): Promise<Product[]> {
  return PRODUCTS
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return PRODUCTS.find((p) => p.slug === slug)
}