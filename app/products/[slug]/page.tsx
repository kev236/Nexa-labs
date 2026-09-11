import { getProductBySlug, getProducts } from '@/data/products'
import { urlFor } from '@/lib/sanity'
import WaitlistForm from '@/components/WaitlistForm'
import SpotlightCard from '@/components/SpotlightCard'
import FadeIn from '@/components/FadeIn'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const products = await getProducts()
  return products.map((product) => ({ slug: product.slug }))
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const isComingSoon = product.status === 'coming-soon' || product.status === 'beta'

  return (
    <div className="max-w-6xl mx-auto px-6 py-20 space-y-20">
      {/* BREADCRUMB */}
      <FadeIn direction="up">
        <Link
          href="/products"
          className="text-xs font-mono text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2"
        >
          ← Back to all products
        </Link>
      </FadeIn>

      {/* HERO SECTION */}
      <div className="grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <FadeIn direction="up">
            <div className="flex items-center gap-3">
              <span
                className={`text-xs font-mono tracking-widest uppercase px-3 py-1 rounded-full border ${
                  isComingSoon
                    ? 'border-purple-500/30 bg-purple-500/10 text-purple-300'
                    : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                }`}
              >
                ● {product.status || 'Live'}
              </span>
              <span className="text-xs font-mono text-gray-500 uppercase">
                {product.price ? `€${product.price}` : 'Early Access'}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mt-4">
              {product.name}
            </h1>

            <p className="text-gray-400 text-lg md:text-xl leading-relaxed mt-4">
              {product.description}
            </p>
          </FadeIn>

          {/* FEATURES LIST */}
          {product.features && product.features.length > 0 && (
            <FadeIn direction="up" delay={0.1}>
              <div className="pt-4 space-y-3">
                <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">
                  Key Capabilities
                </span>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {product.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center text-gray-300 text-sm bg-white/3 border border-white/5 p-3 rounded-xl"
                    >
                      <span className="mr-2 text-purple-400 font-bold">✓</span> {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          )}

          {/* CONVERSION BOX (WAITLIST / ORDER) */}
          <FadeIn direction="up" delay={0.2}>
            <SpotlightCard className="p-8 border-purple-500/30 mt-6">
              {isComingSoon ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                    <h3 className="text-lg font-bold text-white">Join the Early Access List</h3>
                  </div>
                  <p className="text-gray-400 text-sm">
                    {product.name} is currently in active development. Enter your email to be among the first to access the beta version.
                  </p>
                  <WaitlistForm productName={product.name} />
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white">Deploy for Your Organization</h3>
                  <p className="text-gray-400 text-sm">
                    Contact us for direct licensing or custom integration requirements.
                  </p>
                  <Link
                    href={`/contact?product=${encodeURIComponent(product.name)}`}
                    className="inline-block bg-purple-600 hover:bg-purple-500 text-white font-medium py-3.5 px-8 rounded-full transition-all shadow-[0_0_25px_rgba(168,85,247,0.3)]"
                  >
                    Get in Touch / Request Access
                  </Link>
                </div>
              )}
            </SpotlightCard>
          </FadeIn>
        </div>

        {/* RIGHT PREVIEW GRAPHIC */}
        <div className="lg:col-span-5">
          <FadeIn direction="none" delay={0.3}>
            <SpotlightCard className="p-6 relative min-h-95 flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-0 bg-purple-600/10 blur-3xl pointer-events-none" />

              {product.image ? (
                <div className="relative h-64 w-full rounded-xl overflow-hidden border border-white/10">
                  <Image
                    src={urlFor(product.image).url()}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-full h-64 rounded-xl border border-white/10 bg-black/60 p-5 font-mono text-xs text-purple-300 space-y-3 flex flex-col justify-center">
                  <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    <span className="text-gray-500 text-[10px] ml-auto">{product.slug}.nexa</span>
                  </div>
                  <div className="text-gray-400">// Status: IN_DEVELOPMENT</div>
                  <div className="text-purple-400">&gt; Loading modules for {product.name}...</div>
                  <div className="text-gray-500">&gt; Core engine initialized.</div>
                  <div className="text-emerald-400">&gt; Ready for early preview.</div>
                </div>
              )}

              <div className="pt-6 border-t border-white/5 flex justify-between items-center text-xs text-gray-500 font-mono">
                <span>NEXA LABS CORE</span>
                <span>BUILD v0.9</span>
              </div>
            </SpotlightCard>
          </FadeIn>
        </div>
      </div>
    </div>
  )
}