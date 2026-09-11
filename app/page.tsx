import FadeIn from '@/components/FadeIn'
import HeroVisual from '@/components/HeroVisual'
import ProductCard from '@/components/ProductCard'
import { getProducts } from '@/data/products'
import Link from 'next/link'

export default async function HomePage() {
  const products = await getProducts()

  return (
    <div className="space-y-32 pb-20">
      {/* HERO SECTION */}
      <section className="pt-16 md:pt-24 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <FadeIn direction="up">
          <span className="text-xs font-semibold tracking-widest text-purple-400 uppercase">
            NEXA LABS
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mt-3 leading-tight">
            Small software. <br />
            <span className="text-gray-400">Big impact.</span>
          </h1>
          <p className="text-gray-400 mt-6 text-lg max-w-lg">
            We build focused software products that make complicated things simple.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/products"
              className="bg-purple-600 hover:bg-purple-500 text-white font-medium px-6 py-3 rounded-lg transition-colors"
            >
              Explore Products
            </Link>
            <Link
              href="/about"
              className="border border-gray-800 hover:border-gray-700 text-gray-300 font-medium px-6 py-3 rounded-lg transition-colors"
            >
              About Nexa Labs
            </Link>
          </div>
        </FadeIn>

        <FadeIn direction="none" delay={0.2}>
          <HeroVisual />
        </FadeIn>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="max-w-6xl mx-auto px-6">
        <FadeIn direction="up">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-white">
              Software built to solve real problems.
            </h2>
            <p className="text-gray-400 mt-3">
              We create focused tools that are simple to understand, easy to use, and built to deliver results.
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
          <h2 className="text-3xl font-bold text-white text-center mb-16">
            We build. We test. We improve.
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { step: '01', title: 'Build', text: 'We turn simple ideas into useful software.' },
            { step: '02', title: 'Test', text: 'We put our products in the hands of real users.' },
            { step: '03', title: 'Improve', text: 'We continuously improve the products that people love.' },
          ].map((item, idx) => (
            <FadeIn key={idx} delay={idx * 0.15} direction="up">
              <div className="border border-gray-800/80 bg-gray-900/30 p-8 rounded-xl relative">
                <span className="text-4xl font-extrabold text-purple-500/30 absolute top-6 right-6">
                  {item.step}
                </span>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* VISION SECTION */}
      <section className="max-w-4xl mx-auto px-6 text-center">
        <FadeIn direction="up">
          <div className="border border-purple-500/20 bg-purple-950/10 p-12 rounded-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-purple-600/5 blur-3xl pointer-events-none" />
            <h2 className="text-3xl font-bold text-white">One problem at a time.</h2>
            <p className="text-gray-400 mt-4 max-w-xl mx-auto">
              We&apos;re building a growing ecosystem of small software products — each designed to solve a specific problem exceptionally well.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* FINAL CTA */}
      <section className="max-w-6xl mx-auto px-6 text-center">
        <FadeIn direction="up">
          <h2 className="text-3xl font-bold text-white">Find software that works for you.</h2>
          <p className="text-gray-400 mt-2">Explore the growing collection of products from Nexa Labs.</p>
          <div className="mt-6">
            <Link
              href="/products"
              className="inline-block bg-purple-600 hover:bg-purple-500 text-white font-medium px-8 py-3 rounded-lg transition-colors"
            >
              Explore Products
            </Link>
          </div>
        </FadeIn>
      </section>
    </div>
  )
}