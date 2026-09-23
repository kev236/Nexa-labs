import { MetadataRoute } from 'next'
import { getProducts, Product } from '@/data/products'
import { getPosts, Post } from '@/data/blog'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nexalabs.tech'

  // Haal alle dynamische data op uit Sanity
  const [products, posts] = await Promise.all([
    getProducts().catch(() => []),
    getPosts().catch(() => []),
  ])

  // Static pages. /about and /contact are excluded here on purpose —
  // both are redirect-only stubs to homepage sections (#story, #contact)
  // since the one-page redesign, not distinct pages worth indexing.
  const staticRoutes = ['', '/products', '/blog', '/changelog', '/privacy-policy', '/terms-and-conditions', '/cookie-policy'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }))

  // Dynamische productpagina's
  const productRoutes = products.map((product: Product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // Dynamische blogpagina's
  const postRoutes = posts.map((post: Post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...productRoutes, ...postRoutes]
}