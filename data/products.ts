import { client } from '@/lib/sanity'

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

// Static for now — no live voting backend behind these numbers yet. See
// components/ProductPipeline.tsx.
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

const STATUS_LABEL: Record<string, Product['status']> = {
  live: 'Live',
  beta: 'Beta',
  'coming-soon': 'Coming soon',
}

type SanityProduct = {
  _id: string
  name: string
  slug: string
  description?: string
  category?: string
  status?: string
  iconName?: string
  tags?: string[]
  price?: number
  features?: string[]
}

function toProduct(doc: SanityProduct): Product {
  return {
    id: doc.slug,
    _id: doc._id,
    title: doc.name,
    name: doc.name,
    slug: doc.slug,
    description: doc.description ?? '',
    category: doc.category ?? 'Developer Tools',
    status: STATUS_LABEL[doc.status ?? 'coming-soon'] ?? 'Coming soon',
    iconName: doc.iconName ?? 'box',
    tags: doc.tags,
    price: doc.price !== undefined ? `€${doc.price}` : undefined,
    features: doc.features,
  }
}

const PRODUCT_PROJECTION = `{
  _id,
  name,
  "slug": slug.current,
  description,
  category,
  status,
  iconName,
  tags,
  price,
  features
}`

/**
 * Products are managed in Sanity Studio (Products & Ecosystem) — this is
 * the one place that reads them, so every page listing products goes
 * through this same query and mapping rather than drifting copies of it.
 */
export async function getProducts(): Promise<Product[]> {
  const docs = await client.fetch<SanityProduct[]>(
    `*[_type == "product" && defined(slug.current)] | order(name asc) ${PRODUCT_PROJECTION}`
  )
  return docs.map(toProduct)
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const doc = await client.fetch<SanityProduct | null>(
    `*[_type == "product" && slug.current == $slug][0] ${PRODUCT_PROJECTION}`,
    { slug }
  )
  return doc ? toProduct(doc) : undefined
}
