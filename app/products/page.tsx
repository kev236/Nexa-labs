import FadeIn from '@/components/FadeIn'
import ProductCard from '@/components/ProductCard'
import { getProducts, Product } from '@/data/products'

export const metadata = {
  title: 'Products — Nexa Labs',
  description: 'Explore the full suite of autonomous micro-software products by Nexa Labs.',
}

export default async function ProductsPage() {
  const products: Product[] = await getProducts()

  return (
    <div className="max-w-6xl mx-auto px-6 py-20 space-y-12">
      <FadeIn direction="up">
        <div className="max-w-2xl space-y-4">
          <span className="text-xs font-mono tracking-widest text-purple-400 uppercase border border-purple-500/30 bg-purple-950/30 px-3 py-1 rounded-full">
            ECOSYSTEM CATALOG
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mt-4">
            Our Products
          </h1>
          <p className="text-gray-400 text-lg">
            A growing collection of focused software products engineered to eliminate friction.
          </p>
        </div>
      </FadeIn>

      <div className="grid md:grid-cols-3 gap-6 pt-6">
        {products.map((product: Product, index: number) => (
          <FadeIn key={product._id || product.id || index} delay={index * 0.1} direction="up">
            <ProductCard product={product} />
          </FadeIn>
        ))}
      </div>
    </div>
  )
}