import { client } from '@/lib/sanity'

export interface Post {
  _id: string
  title: string
  slug: string
  publishedAt: string
  excerpt: string
  mainImage?: any
  body?: any
}

export async function getPosts(): Promise<Post[]> {
  return await client.fetch(`
    *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      excerpt,
      mainImage
    }
  `)
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return await client.fetch(
    `
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      excerpt,
      mainImage,
      body
    }
  `,
    { slug }
  )
}