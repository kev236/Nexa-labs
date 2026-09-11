import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import { getProductBySlug } from '@/data/products'
import FadeIn from '@/components/FadeIn'
import WaitlistForm from '@/components/WaitlistForm'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    return {
      title: 'Product Not Found — Nexa Labs',
    }
  }

  const title = (product as any).title || (product as any).name || 'Product'

  return {
    title: `${title} — Nexa Labs`,
    description: product.description,
    openGraph: {
      title,
      description: product.description,
    },
  }
}

export const revalidate = 60

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const item = product as any
  const title = item.title || item.name || 'Product'
  const category = item.category || 'Micro-Tool'

  return (
    <div className="max-w-4xl mx-auto px-6 py-20 min-h-screen space-y-12">
      <FadeIn direction="up">
        <Link
          href="/#products"
          className="inline-flex items-center gap-2 text-xs font-mono text-purple-400 hover:text-purple-300 mb-8 transition-colors"
        >
          &larr; Back to Ecosystem
        </Link>

        <header className="space-y-4 mb-10">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-purple-400 bg-purple-950/40 border border-purple-500/20 px-3 py-1 rounded-full uppercase tracking-wider">
              {category}
            </span>
            {item.status && (
              <span className="text-xs font-mono bg-white/5 border border-white/10 text-gray-400 px-2.5 py-1 rounded-md">
                {item.status}
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
            {title}
          </h1>

          <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
            {item.description}
          </p>
        </header>

        {item.features && Array.isArray(item.features) && item.features.length > 0 && (
          <div className="border border-white/10 bg-white/5 rounded-2xl p-6 md:p-8 space-y-4 mb-12">
            <h2 className="text-lg font-bold font-mono uppercase tracking-wider text-purple-300">
              Technical Specifications
            </h2>
            <ul className="grid sm:grid-cols-2 gap-3 text-sm text-gray-300 font-mono">
              {item.features.map((feat: string, index: number) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="text-purple-400">⚡</span> {feat}
                </li>
              ))}
            </ul>
          </div>
        )}

        <WaitlistForm productName={title} slug={slug} />
      </FadeIn>
    </div>
  )
}