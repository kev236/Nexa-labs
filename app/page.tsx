import Link from 'next/link'
import FadeIn from '@/components/FadeIn'
import SpotlightCard from '@/components/SpotlightCard'
import SocialProof from '@/components/SocialProof'
import InteractiveDemo from '@/components/InteractiveDemo'
import { getProducts, Product } from '@/data/products'

export const revalidate = 60

export default async function HomePage() {
  const products = await getProducts().catch(() => [])

  const corePillars = [
    {
      icon: '⚡',
      title: 'Sub-30ms Latency',
      desc: 'Executed globally on edge infrastructure without runtime overhead.',
    },
    {
      icon: '🛡️',
      title: 'Autonomous Logic',
      desc: 'Self-healing workflows that scale seamlessly without maintenance.',
    },
    {
      icon: '🔌',
      title: 'Zero-Friction API',
      desc: 'Drop-in integration designed for modern stack standards.',
    },
  ]

  return (
    <div className="space-y-28 pb-24">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 pt-20 text-center">
        <FadeIn direction="up">
          <span className="text-xs font-mono tracking-widest text-purple-300 uppercase border border-purple-500/30 bg-purple-500/10 px-3.5 py-1.5 rounded-full inline-block mb-6 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
            Autonomous Micro-Software Suite
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold text-zinc-100 tracking-tight leading-tight max-w-4xl mx-auto mb-6">
            Modular software tools engineered for <span className="bg-linear-to-r from-purple-300 via-indigo-200 to-purple-400 bg-clip-text text-transparent">maximum velocity</span>
          </h1>

          <p className="text-zinc-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            Nexa Labs replaces bloated SaaS subscriptions with lightweight, high-performance micro-utilities tailored for modern engineering teams.
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
              System Changelog
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* Core Architectural Pillars */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-6">
          {corePillars.map((pillar, i) => (
            <FadeIn key={i} delay={i * 0.1} direction="up">
              <SpotlightCard className="p-6 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-md">
                <div className="text-2xl mb-3">{pillar.icon}</div>
                <h3 className="text-base font-bold text-zinc-100 mb-2">{pillar.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{pillar.desc}</p>
              </SpotlightCard>
            </FadeIn>
          ))}
        </div>
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
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-bold text-zinc-100">
              Engineered Product Suite
            </h2>
            <p className="text-zinc-400 text-sm">
              Deploy individually or combine to power your autonomous infrastructure.
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
                  <SpotlightCard className="h-full flex flex-col justify-between p-6 rounded-2xl border border-zinc-800/80 bg-zinc-900/30 hover:border-purple-500/40 transition-colors">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-mono text-purple-300 bg-purple-950/50 border border-purple-500/30 px-2.5 py-1 rounded-md">
                          {category}
                        </span>
                        {item.status && (
                          <span className="text-xs font-mono text-zinc-500">
                            {item.status}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-zinc-100 mb-2">{title}</h3>
                      <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3 mb-6">
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