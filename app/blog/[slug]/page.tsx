import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { Metadata } from 'next'
import { getPostBySlug } from '@/data/blog'
import { urlFor } from '@/sanity/lib/image'
import FadeIn from '@/components/FadeIn'
import { ptComponents } from '@/components/PortableTextComponents'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found — Nexa Labs',
    }
  }

  const imageUrl = post.mainImage ? urlFor(post.mainImage).url() : undefined

  return {
    title: `${post.title} — Nexa Labs Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      images: imageUrl ? [{ url: imageUrl, alt: post.title }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: imageUrl ? [imageUrl] : [],
    },
  }
}

export const revalidate = 60

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="max-w-4xl mx-auto px-6 py-20 min-h-screen">
      <FadeIn direction="up">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-mono text-purple-400 hover:text-purple-300 mb-8 transition-colors"
        >
          &larr; Back to all posts
        </Link>

        <header className="space-y-4 mb-10">
          {post.publishedAt && (
            <span className="text-xs font-mono text-gray-500 block">
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          )}
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-lg text-gray-400 leading-relaxed">
              {post.excerpt}
            </p>
          )}
        </header>

        {post.mainImage && (
          <div className="relative h-64 md:h-96 w-full rounded-2xl overflow-hidden border border-white/10 mb-12">
            <Image
              src={urlFor(post.mainImage).url()}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="max-w-none">
          {post.body && <PortableText value={post.body} components={ptComponents} />}
        </div>
      </FadeIn>
    </article>
  )
}