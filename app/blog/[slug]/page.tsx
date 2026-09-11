import { getPostBySlug, getPosts, Post } from '@/data/blog'
import { urlFor } from '@/lib/sanity'
import FadeIn from '@/components/FadeIn'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const posts: Post[] = await getPosts()
  return posts.map((post: Post) => ({ slug: post.slug }))
}

// Custom serializers voor Sanity Portable Text
const RichTextComponents = {
  block: {
    h1: ({ children }: any) => <h1 className="text-3xl md:text-4xl font-bold text-white mt-12 mb-6">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-2xl md:text-3xl font-bold text-white mt-10 mb-5">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-xl font-bold text-gray-200 mt-8 mb-4">{children}</h3>,
    normal: ({ children }: any) => <p className="text-gray-400 leading-relaxed mb-6">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-purple-500 pl-4 py-1 bg-purple-500/5 my-6 text-gray-300 italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc list-outside ml-5 space-y-2 text-gray-400 mb-6">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal list-outside ml-5 space-y-2 text-gray-400 mb-6">{children}</ol>,
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-bold text-white">{children}</strong>,
    link: ({ children, value }: any) => (
      <a href={value?.href} target="_blank" rel="noreferrer" className="text-purple-400 hover:text-purple-300 underline decoration-purple-500/30 underline-offset-2">
        {children}
      </a>
    ),
  },
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="max-w-3xl mx-auto px-6 py-20">
      <FadeIn direction="up">
        <Link
          href="/blog"
          className="text-xs font-mono text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2 mb-10"
        >
          ← Back to Blog
        </Link>
        
        <header className="space-y-6 mb-12">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/30">
              ARTICLE
            </span>
            <time className="text-xs font-mono text-gray-500">
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-xl text-gray-400 leading-relaxed">
              {post.excerpt}
            </p>
          )}
        </header>

        {post.mainImage && (
        <div className="relative w-full h-100 md:h-125 rounded-2xl overflow-hidden mb-12 border border-white/10">
            <Image
            src={urlFor(post.mainImage).url()}
            alt={post.title}
            fill
            className="object-cover"
            priority
            />
        </div>
        )}

        {/* Content Rendered by Portable Text */}
        <div className="prose-container">
          {post.body ? (
            <PortableText value={post.body} components={RichTextComponents} />
          ) : (
            <p className="text-gray-500 font-mono text-sm border border-dashed border-white/10 p-6 rounded-xl">
              &gt; Content loading or empty...
            </p>
          )}
        </div>
      </FadeIn>
    </article>
  )
}