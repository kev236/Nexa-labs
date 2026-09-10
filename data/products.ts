import { client } from '@/lib/sanity'

export interface Product {
  _id: string
  name: string
  slug: string
  description?: string
  price?: number
  status?: 'coming-soon' | 'beta' | 'live'
  iconName?: string
  image?: any
  features?: string[]
  body?: any
}

export async function getProducts(): Promise<Product[]> {
  return await client.fetch(
    `*[_type == "product"] | order(_createdAt desc) {
      _id,
      name,
      "slug": slug.current,
      description,
      price,
      status,
      iconName,
      image,
      features
    }`
  )
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return await client.fetch(
    `*[_type == "product" && slug.current == $slug][0] {
      _id,
      name,
      "slug": slug.current,
      description,
      price,
      status,
      iconName,
      image,
      features,
      body
    }`,
    { slug }
  )
}