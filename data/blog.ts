import type { ComponentProps } from 'react'
import { PortableText } from '@portabletext/react'
import type { SanityImageSource } from '@sanity/image-url'
import { client } from '@/lib/sanity'

/** Whatever shape the installed @portabletext/react expects for `value` — no separate type dependency to keep in sync. */
type PortableTextValue = ComponentProps<typeof PortableText>['value']

export interface Post {
  _id: string
  title: string
  slug: string
  publishedAt: string
  excerpt: string
  mainImage?: SanityImageSource & { alt?: string }
  body?: PortableTextValue
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