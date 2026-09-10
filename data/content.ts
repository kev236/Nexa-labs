import { client } from '@/lib/sanity'

export async function getTestimonials() {
  return await client.fetch(`*[_type == "testimonial"]`)
}

export async function getFAQs() {
  return await client.fetch(`*[_type == "faq"]`)
}

export async function getPosts() {
  return await client.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      excerpt,
      mainImage,
      "author": author->{name, image}
    }`
  )
}