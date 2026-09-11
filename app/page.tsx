import Link from 'next/link'
import FadeIn from '@/components/FadeIn'
import ProductCard from '@/components/ProductCard'
import InteractiveDemo from '@/components/InteractiveDemo'
import StatsCounter from '@/components/StatsCounter'
import NewsletterWaitlist from '@/components/NewsletterWaitlist'
import { getProducts, Product } from '@/data/products'

export const revalidate = 60

export default async function HomePage() {
  const products = await getProducts().catch(() => [])

  return (
    <div className="flex flex-col pt-16 space-y-24">
      {/* HERO SECTION */}
      <section className="relative min-h-[80vh] flex flex-col justify-center items-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
          <div className="w-150 h-150 bg-purple-900/10 blur-[120px] rounded-full" />
        </div>

        <div className="z-10 flex flex-col items-center w-full max-w-4xl">
          <FadeIn direction="up" delay={0.1}>
            <span className="text-[11px] font-mono tracking-widest text-purple-400 uppercase border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 rounded-full mb-8 inline-block shadow-[0_0_15px_rgba(168,85,247,0.15)]">
              NEXA LABS
            </span>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <h1 className="text-5xl md:text-7xl font-extrabold text-zinc-100 tracking-tight leading-tight mb-6">
              Small software.<br className="hidden md:block" /> Big impact.
            </h1>
          </FadeIn>

          <FadeIn direction="up" delay={0.3}>
            <p className="text-zinc-400 text-lg md:text-xl max-w-2xl leading-relaxed mb-10 mx-auto">
              We build focused software products that make complicated things simple. An expanding ecosystem of professional tools.
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
              <Link
                href="/products"
                className="px-8 py-3.5 bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-xl transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] text-sm"
              >
                Explore Products
              </Link>
              <Link
                href="/about"
                className="px-8 py-3.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-medium rounded-xl border border-zinc-800 transition-all text-sm"
              >
                About Nexa Labs
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* DEMO SECTION */}
      <section className="max-w-4xl mx-auto px-6 w-full">
        <FadeIn direction="up">
          <InteractiveDemo />
        </FadeIn>
      </section>

      {/* LIVE STATS COUNTER */}
      <StatsCounter />

      {/* PRODUCTS SECTION */}
      <section id="products" className="py-20 px-6 bg-zinc-950/60 border-y border-zinc-900">
        <div className="max-w-6xl mx-auto space-y-12">
          <FadeIn direction="up">
            <div className="md:w-2/3 space-y-3">
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-100">
                Software built to solve real problems.
              </h2>
              <p className="text-zinc-400 text-base md:text-lg">
                We create focused tools that are simple to understand, easy to use, and built to deliver results.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            {products.map((product: Product, index: number) => (
              <FadeIn key={product.id} delay={index * 0.1} direction="up">
                <ProductCard product={product} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn direction="up">
            <h2 className="text-3xl font-bold text-zinc-100 mb-16 text-center">
              We build. We test. We improve.
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { num: '01', title: 'Build', desc: 'We turn simple ideas into useful software.' },
              { num: '02', title: 'Test', desc: 'We put our products in the hands of real users.' },
              { num: '03', title: 'Improve', desc: 'We continuously improve the products that people love.' },
            ].map((step, i) => (
              <FadeIn key={step.num} delay={i * 0.15} direction="up" className="relative">
                <div className="text-6xl font-black text-zinc-900 absolute -top-8 -left-4 z-0 pointer-events-none">
                  {step.num}
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-zinc-200 mb-2">{step.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER / EARLY ACCESS */}
      <section className="max-w-4xl mx-auto px-6 w-full">
        <FadeIn direction="up">
          <NewsletterWaitlist />
        </FadeIn>
      </section>

      {/* VISION SECTION */}
      <section className="py-24 px-6 relative overflow-hidden bg-zinc-950 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <FadeIn direction="up">
            <h2 className="text-4xl md:text-5xl font-extrabold text-zinc-100">
              One problem at a time.
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl mx-auto">
              We're building a growing ecosystem of small software products — each designed to solve a specific problem exceptionally well.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 px-6 text-center pb-24">
        <FadeIn direction="up">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-4">
            Find software that works for you.
          </h2>
          <p className="text-zinc-400 text-base mb-8">
            Explore the growing collection of products from Nexa Labs.
          </p>
          <Link
            href="/products"
            className="inline-flex px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-xl transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] text-sm"
          >
            Explore Products
          </Link>
        </FadeIn>
      </section>
    </div>
  )
}