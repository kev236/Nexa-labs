import BentoGrid from '@/components/BentoGrid'
import FadeIn from '@/components/FadeIn'
import HeroVisual from '@/components/HeroVisual'
import ProductCard from '@/components/ProductCard'
import SpotlightCard from '@/components/SpotlightCard'
import { getProducts } from '@/data/products'
import Link from 'next/link'

export default async function HomePage() {
  const products = await getProducts()

  return (
    <div className="space-y-36 pb-24 overflow-hidden">
      {/* HERO SECTION */}
      <section className="pt-20 md:pt-32 max-w-6xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-8">
          <FadeIn direction="up">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-500/30 bg-purple-950/30 text-purple-300 text-xs font-mono tracking-wide">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
              NEXA LABS ECOSYSTEM
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.1}>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gradient leading-[1.1]">
              Small software. <br />
              <span className="text-gradient-purple">Big impact.</span>
            </h1>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <p className="text-gray-400 text-lg md:text-xl max-w-xl font-normal leading-relaxed">
              We build focused, hyper-efficient tools designed to eliminate friction and solve single problems exceptionally well.
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={0.3}>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/products"
                className="bg-white hover:bg-gray-200 text-black font-semibold px-7 py-3.5 rounded-full transition-all duration-200 shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:shadow-[0_0_35px_rgba(255,255,255,0.35)]"
              >
                Explore Products
              </Link>
              <Link
                href="/about"
                className="border border-white/10 hover:border-white/20 bg-white/3 text-gray-300 font-medium px-7 py-3.5 rounded-full backdrop-blur-md transition-all duration-200"
              >
                About Nexa Labs
              </Link>
            </div>
          </FadeIn>
        </div>

        <div className="lg:col-span-5">
          <FadeIn direction="none" delay={0.4}>
            <HeroVisual />
          </FadeIn>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="max-w-6xl mx-auto px-6">
        <FadeIn direction="up">
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">
              Gefocuste Software
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-gradient">
              Built to solve real problems.
            </h2>
            <p className="text-gray-400 text-base">
              Eenvoudig te begrijpen, direct inzetbaar en ontworpen voor resultaat.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <FadeIn key={product.id || index} delay={index * 0.1} direction="up">
              <ProductCard product={product} />
            </FadeIn>
          ))}
        </div>
      </section>

      {/* HOW NEXA LABS WORKS */}
      <section className="max-w-6xl mx-auto px-6">
        <FadeIn direction="up">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">
              Methodologie
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              We build. We test. We improve.
            </h2>
          </div>
        </FadeIn>

        <BentoGrid />
      </section>

      {/* VISION STATEMENT */}
      <section className="max-w-5xl mx-auto px-6">
        <FadeIn direction="up">
          <SpotlightCard className="text-center py-16 px-8 relative overflow-hidden">
            <div className="max-w-2xl mx-auto space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-purple-400">
                Ecosystem Vision
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gradient">
                One problem at a time.
              </h2>
              <p className="text-gray-400 leading-relaxed">
                We bouwen gestaag aan een ecosysteem van kleine, hoogwaardige softwareproducten — elk ontwikkeld om één specifiek proces vlekkeloos uit te voeren.
              </p>
            </div>
          </SpotlightCard>
        </FadeIn>
      </section>

      {/* FINAL CTA */}
      <section className="max-w-6xl mx-auto px-6 text-center">
        <FadeIn direction="up">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
              Ready to streamline your workflow?
            </h2>
            <p className="text-gray-400 max-w-lg mx-auto">
              Ontdek de groeiende collectie tools van Nexa Labs.
            </p>
            <div>
              <Link
                href="/products"
                className="inline-block bg-purple-600 hover:bg-purple-500 text-white font-medium px-8 py-3.5 rounded-full transition-all duration-200 shadow-[0_0_30px_rgba(168,85,247,0.4)]"
              >
                Explore Products
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  )
}