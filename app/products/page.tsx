import FadeIn from '@/components/FadeIn'
import EcosystemFilter from '@/components/EcosystemFilter'
import ProductPipeline from '@/components/ProductPipeline'
import { getProducts } from '@/data/products'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ecosystem Catalog — Nexa Labs',
  description: 'Explore the full growing suite of autonomous micro-software products built by Nexa Labs.',
}

export const revalidate = 3600

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <div className="pt-32 pb-24 px-6 max-w-6xl mx-auto w-full min-h-screen space-y-20">
      <FadeIn direction="up">
        <header className="max-w-2xl space-y-4">
          <span className="text-xs font-mono tracking-widest text-purple-400 uppercase border border-purple-500/30 bg-purple-950/40 px-3 py-1 rounded-full inline-block">
            Growing Ecosystem
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-100 tracking-tight">
            Micro-Software Suite
          </h1>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
            Independent, highly focused software modules designed to eliminate operational friction and replace heavy legacy SaaS subscriptions.
          </p>
        </header>
      </FadeIn>

      <FadeIn direction="up">
        <EcosystemFilter products={products} />
      </FadeIn>

      <FadeIn direction="up">
        <ProductPipeline />
      </FadeIn>
    </div>
  )
}