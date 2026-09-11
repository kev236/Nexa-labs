import FadeIn from '@/components/FadeIn'
import SpotlightCard from '@/components/SpotlightCard'
import { getPosts, Post } from '@/data/blog'
import { urlFor } from '@/lib/sanity'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'Engineering Blog — Nexa Labs',
  description: 'Technical insights, updates, and thoughts from the Nexa Labs team.',
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <div className="max-w-6xl mx-auto px-6 py-20 space-y-12">
      <FadeIn direction="up">
        <div className="max-w-2xl space-y-4">
          <span className="text-xs font-mono tracking-widest text-purple-400 uppercase border border-purple-500/30 bg-purple-950/30 px-3 py-1 rounded-full">
            RESOURCES & INSIGHTS
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mt-4">
            Engineering Blog
          </h1>
          <p className="text-gray-400 text-lg">
            Thoughts on software architecture, performance, and building autonomous tools.
          </p>
        </div>
      </FadeIn>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
        {posts.map((post: Post, index: number) => (
          <FadeIn key={post._id} delay={index * 0.1} direction="up">
            <Link href={`/blog/${post.slug}`}>
              <SpotlightCard className="h-full flex flex-col hover:border-purple-500/50 transition-colors">
                {post.mainImage && (
                  <div className="relative h-48 w-full border-b border-white/10">
                    <Image
                      src={urlFor(post.mainImage).url()}
                      alt={post.title}
                      fill
                      className="object-cover rounded-t-xl"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col grow">
                  <span className="text-xs font-mono text-gray-500 mb-3">
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2">{post.title}</h3>
                  <p className="text-sm text-gray-400 line-clamp-3 mb-4 grow">{post.excerpt}</p>
                  <span className="text-sm text-purple-400 font-medium group-hover:text-purple-300 mt-auto flex items-center gap-1">
                    Read Article <span className="text-lg">→</span>
                  </span>
                </div>
              </SpotlightCard>
            </Link>
          </FadeIn>
        ))}

        {posts.length === 0 && (
          <div className="col-span-full py-20 text-center text-gray-500 font-mono text-sm border border-dashed border-white/10 rounded-2xl">
            &gt; No posts published yet. Compiling initial articles...
          </div>
        )}
      </div>
    </div>
  )
}