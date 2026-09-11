import { Product } from '@/data/products'
import * as Icons from 'lucide-react'
import Link from 'next/link'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const iconName = product.iconName || 'Activity'
  const IconComponent = (Icons as Record<string, any>)[iconName] || Icons.Activity

  const isComingSoon = product.status === 'coming-soon' || product.status === 'beta'

  return (
    <div className="group relative rounded-2xl border border-white/10 bg-white/[0.02] p-7 backdrop-blur-md transition-all duration-300 hover:border-purple-500/50 hover:bg-white/[0.04] hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] flex flex-col justify-between h-full">
      {/* Top Ambient Highlight */}
      <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div>
        {/* Header with Icon and Status Badge */}
        <div className="flex items-center justify-between mb-6">
          <div className="p-3 rounded-xl border border-purple-500/20 bg-purple-950/30 text-purple-400 group-hover:scale-105 group-hover:border-purple-500/40 transition-all">
            <IconComponent className="w-5 h-5" />
          </div>

          <span
            className={`text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full border ${
              isComingSoon
                ? 'border-purple-500/30 bg-purple-500/10 text-purple-300'
                : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
            }`}
          >
            ● {product.status || 'Live'}
          </span>
        </div>

        {/* Title & Description */}
        <h3 className="text-xl font-semibold text-white tracking-tight group-hover:text-purple-300 transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-400 text-sm mt-2.5 leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* Action Footer */}
      <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-medium">
        <span className="text-gray-400 font-mono">
          {product.price ? `€${product.price}` : 'Ecosystem'}
        </span>

        <Link
          href={`/products/${product.slug}`}
          className="text-white flex items-center gap-1.5 group/link hover:text-purple-400 transition-colors"
        >
          Bekijk product
          <span className="transition-transform group-hover/link:translate-x-1">→</span>
        </Link>
      </div>
    </div>
  )
}