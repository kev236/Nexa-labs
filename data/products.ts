import { client } from '@/lib/sanity'

export async function getProducts() {
  return await client.fetch(`
    *[_type == "product"] {
      _id,
      name,
      "slug": slug.current,
      description,
      status,
      price,
      features,
      image
    }
  `)
}

export async function getProductBySlug(slug: string) {
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
      image
    }
  `,
    { slug }
  )
}