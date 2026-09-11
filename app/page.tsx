import Link from 'next/link'
import FadeIn from '@/components/FadeIn'
import SpotlightCard from '@/components/SpotlightCard'
import SocialProof from '@/components/SocialProof'
import InteractiveDemo from '@/components/InteractiveDemo'
import { getProducts, Product } from '@/data/products'

export const revalidate = 60

export default async function HomePage() {
  const products = await getProducts().catch(() => [])

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 pt-20 text-center">
        <FadeIn direction="up">
          <span className="text-xs font-mono tracking-widest text-purple-400 uppercase border border-purple-500/30 bg-purple-950/30 px-3 py-1.5 rounded-full inline-block mb-6">
            Autonomous Micro-Software Suite
          </span>

          <h1 className="text-4xl md:text-7xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto mb-6">
            Build Faster with High-Performance <span className="bg-linear-to-r from-purple-400 via-purple-200 to-indigo-400 bg-clip-text text-transparent">Micro-Tools</span>
          </h1>

          <p className="text-gray-400 text-base md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            Eliminate bloat. Nexa Labs provides lightweight, autonomous software modules engineered for maximum velocity and zero-overhead workflows.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#products"
              className="w-full sm:w-auto px-8 py-3.5 bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-xl transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] text-sm"
            >
              Explore Products &rarr;
            </Link>
            <Link
              href="/changelog"
              className="w-full sm:w-auto px-8 py-3.5 bg-white/5 hover:bg-white/10 text-gray-300 font-medium rounded-xl border border-white/10 transition-all text-sm"
            >
              View System Changelog
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* Interactive Sandbox Section */}
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
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Engineered Ecosystem
            </h2>
            <p className="text-gray-400 text-sm md:text-base">
              Precision-crafted tools designed to operate independently or integrate into your existing tech stack.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product: Product, index: number) => {
            const item = product as Product & { title?: string; name?: string; category?: string }
            const title = item.title || item.name || 'Product'
            const category = item.category || 'Micro-Tool'

            return (
              <FadeIn key={item._id} delay={index * 0.1} direction="up">
                <Link href={`/products/${item.slug}`}>
                  <SpotlightCard className="h-full flex flex-col justify-between p-6 hover:border-purple-500/50 transition-colors">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-mono text-purple-400 bg-purple-950/40 border border-purple-500/20 px-2.5 py-1 rounded-md">
                          {category}
                        </span>
                        {item.status && (
                          <span className="text-xs font-mono text-gray-500">
                            {item.status}
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                      <p className="text-sm text-gray-400 line-clamp-3 mb-6">
                        {item.description}
                      </p>
                    </div>
                    <span className="text-xs font-mono text-purple-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      View Specifications &rarr;
                    </span>
                  </SpotlightCard>
                </Link>
              </FadeIn>
            )
          })}
        </div>
      </section>
    </div>
  )
}