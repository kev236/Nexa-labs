import { client } from '@/lib/sanity'

export interface Product {
  _id?: string
  id?: string
  name: string
  slug: string
  description: string
  status?: string
  price?: number
  features?: string[]
  image?: any
  iconName?: string
}

export async function getProducts(): Promise<Product[]> {
  return await client.fetch(`
    *[_type == "product"] {
      _id,
      name,
      "slug": slug.current,
      description,
      status,
      price,
      features,
      image,
      iconName
    }
  `)
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return await client.fetch(
    `
    *[_type == "product" && slug.current == $slug][0] {
      _id,
      name,
      "slug": slug.current,
      description,
      status,
      price,
      features,
      image,
      iconName
    }
  `,
    { slug }
  )
}