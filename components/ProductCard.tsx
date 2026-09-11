import Link from 'next/link'
import SpotlightCard from '@/components/SpotlightCard'
import { Product } from '@/data/products'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const title = product.title || product.name || 'Product'
  const productId = product._id || product.id || product.slug

  return (
    <Link href={`/products/${product.slug}`}>
      <SpotlightCard className="h-full flex flex-col justify-between p-6 rounded-2xl border border-zinc-800/80 bg-zinc-900/30 hover:border-purple-500/40 transition-colors">
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono text-purple-300 bg-purple-950/50 border border-purple-500/30 px-2.5 py-1 rounded-md">
              {product.category || 'Micro-Tool'}
            </span>
            <div className="flex items-center gap-2">
              {product.price && (
                <span className="text-xs font-mono text-zinc-400">
                  {product.price}
                </span>
              )}
              {product.status && (
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-2 py-0.5 rounded">
                  {product.status}
                </span>
              )}
            </div>
          </div>
          <h3 className="text-lg font-bold text-zinc-100 mb-2">{title}</h3>
          <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3 mb-6">
            {product.description}
          </p>
        </div>
        <span className="text-xs font-mono text-purple-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
          View Specifications &rarr;
        </span>
      </SpotlightCard>
    </Link>
  )
}