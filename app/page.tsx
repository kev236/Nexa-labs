import Link from 'next/link'
import FadeIn from '@/components/FadeIn'
import SpotlightCard from '@/components/SpotlightCard'
import SocialProof from '@/components/SocialProof'
import InteractiveDemo from '@/components/InteractiveDemo'
import RoiCalculator from '@/components/RoiCalculator'
import Footer from '@/components/Footer'
import { getProducts, Product } from '@/data/products'

export const revalidate = 60

export default async function HomePage() {
  const products = await getProducts().catch(() => [])

  return (
    <div className="space-y-28 pb-12">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 pt-20 text-center">
        <FadeIn direction="up">
          <span className="text-xs font-mono tracking-widest text-purple-300 uppercase border border-purple-500/30 bg-purple-500/10 px-3.5 py-1.5 rounded-full inline-block mb-6 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
            Autonomous Micro-Software Platform
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold text-zinc-100 tracking-tight leading-tight max-w-4xl mx-auto mb-6">
            Autonomous Micro-Tools to Audit, Propose &amp; <span className="bg-linear-to-r from-purple-300 via-indigo-200 to-purple-400 bg-clip-text text-transparent">Collect Payment</span>
          </h1>

          <p className="text-zinc-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            Nexa Labs replaces manual overhead with high-performance micro-utilities engineered for modern digital workflows.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#products"
              className="w-full sm:w-auto px-7 py-3 bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-xl transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] text-sm"
            >
              Explore Products &rarr;
            </Link>
            <Link
              href="/changelog"
              className="w-full sm:w-auto px-7 py-3 bg-zinc-900/80 hover:bg-zinc-800/80 text-zinc-300 font-medium rounded-xl border border-zinc-800 transition-all text-sm"
            >
              View System Changelog
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* Live Sandbox */}
      <section className="max-w-4xl mx-auto px-6">
        <FadeIn direction="up">
          <InteractiveDemo />
        </FadeIn>
      </section>

      {/* Social Proof Bar */}
      <SocialProof />

      {/* Product Showcase */}
      <section id="products" className="max-w-6xl mx-auto px-6 space-y-12">
        <FadeIn direction="up">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-bold text-zinc-100">
              The Nexa Suite
            </h2>
            <p className="text-zinc-400 text-sm">
              Deploy independently or integrate into your existing business stack.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product: Product, index: number) => (
            <FadeIn key={product._id} delay={index * 0.1} direction="up">
              <Link href={`/products/${product.slug}`}>
                <SpotlightCard className="h-full flex flex-col justify-between p-6 rounded-2xl border border-zinc-800/80 bg-zinc-900/30 hover:border-purple-500/40 transition-colors">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono text-purple-300 bg-purple-950/50 border border-purple-500/30 px-2.5 py-1 rounded-md">
                        {product.category}
                      </span>
                      <span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-2 py-0.5 rounded">
                        {product.status}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100 mb-2">{product.title}</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3 mb-6">
                      {product.description}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-purple-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    View Specifications &rarr;
                  </span>
                </SpotlightCard>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="max-w-4xl mx-auto px-6">
        <FadeIn direction="up">
          <RoiCalculator />
        </FadeIn>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}