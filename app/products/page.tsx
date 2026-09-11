import { getProducts } from '@/data/products'
import ProductCard from '@/components/ProductCard'
import FadeIn from '@/components/FadeIn'

export const revalidate = 60

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <div className="max-w-6xl mx-auto px-6 py-20 min-h-screen space-y-12">
      <FadeIn direction="up">
        <header className="space-y-4 max-w-2xl">
          <span className="text-xs font-mono text-purple-400 uppercase tracking-widest bg-purple-950/40 border border-purple-500/20 px-3 py-1 rounded-full inline-block">
            Autonomous Suite
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-100 tracking-tight">
            Micro-Software Products
          </h1>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
            High-performance, single-purpose software modules engineered to streamline digital operations.
          </p>
        </header>
      </FadeIn>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => {
          const key = product._id || product.id || product.slug || index
          return (
            <FadeIn key={key} delay={index * 0.1} direction="up">
              <ProductCard product={product} />
            </FadeIn>
          )
        })}
      </div>
    </div>
  )
}