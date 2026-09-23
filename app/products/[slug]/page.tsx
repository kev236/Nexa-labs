import { notFound } from 'next/navigation'
import Link from 'next/link'
import FadeIn from '@/components/FadeIn'
import ProductWaitlistForm from '@/components/ProductWaitlistForm'
import { getProductBySlug, getProducts } from '@/data/products'
import { ArrowLeft, CheckCircle2, Zap, Shield, Cpu } from 'lucide-react'

export const revalidate = 60

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const products = await getProducts()
  // 'clip-scoring-api' has its own static route (app/products/clip-scoring-api)
  // with a real API contract instead of this template's generic stat tiles —
  // excluded here so the two don't both try to generate the same path.
  return products.filter((p) => p.slug !== 'clip-scoring-api').map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return { title: 'Product Not Found' }

  return {
    title: `${product.title} — Nexa Labs`,
    description: product.description,
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  return (
    <div className="pt-32 pb-24 px-6 max-w-5xl mx-auto w-full min-h-screen space-y-16">
      <FadeIn direction="up">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-purple-400 transition-colors mb-8"
        >
          <ArrowLeft size={14} /> Back to Ecosystem
        </Link>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono tracking-widest uppercase px-3 py-1 rounded-full bg-purple-950/50 border border-purple-500/30 text-purple-300">
                {product.category}
              </span>
              <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-0.5 rounded bg-emerald-950/40 border border-emerald-500/20 text-emerald-400">
                {product.status}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-100 tracking-tight">
              {product.title}
            </h1>

            <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
              {product.description}
            </p>

            {product.features && product.features.length > 0 && (
              <div className="pt-6 border-t border-zinc-800/80 space-y-3">
                <h3 className="text-xs font-mono text-purple-400 uppercase tracking-widest">
                  Technical Specifications
                </h3>
                <div className="grid gap-2.5">
                  {product.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs font-mono text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-zinc-800/80 text-center font-mono text-[11px]">
              <div className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/60">
                <Zap className="w-4 h-4 text-purple-400 mx-auto mb-1.5" />
                <span className="text-zinc-300 block">Sub-15ms Edge</span>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/60">
                <Shield className="w-4 h-4 text-purple-400 mx-auto mb-1.5" />
                <span className="text-zinc-300 block">Stateless Auth</span>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/60">
                <Cpu className="w-4 h-4 text-purple-400 mx-auto mb-1.5" />
                <span className="text-zinc-300 block">Zero Overhead</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <ProductWaitlistForm productName={product.title} />
          </div>
        </div>
      </FadeIn>
    </div>
  )
}