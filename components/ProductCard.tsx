import { Product } from '@/data/products'
import SpotlightCard from './SpotlightCard'
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
    <SpotlightCard className="flex flex-col justify-between h-full group">
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="p-3.5 rounded-xl border border-purple-500/20 bg-purple-950/40 text-purple-400 group-hover:scale-110 group-hover:border-purple-500/50 group-hover:bg-purple-900/40 transition-all duration-300">
            <IconComponent className="w-6 h-6" />
          </div>

          <span
            className={`text-[11px] font-mono tracking-widest uppercase px-3 py-1 rounded-full border backdrop-blur-md ${
              isComingSoon
                ? 'border-purple-500/30 bg-purple-500/10 text-purple-300'
                : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
            }`}
          >
            ● {product.status || 'Live'}
          </span>
        </div>

        <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-purple-300 transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-400 text-sm mt-3 leading-relaxed font-normal">
          {product.description}
        </p>
      </div>

      <div className="mt-8 pt-5 border-t border-white/5 flex items-center justify-between text-xs font-medium">
        <span className="text-gray-500 font-mono uppercase tracking-wider">
          {product.price ? `€${product.price}` : 'Autonomous Tool'}
        </span>

        <Link
          href={`/products/${product.slug}`}
          className="text-white flex items-center gap-2 group/btn hover:text-purple-400 transition-colors"
        >
          Bekijk Details
          <span className="transition-transform group-hover/btn:translate-x-1.5">→</span>
        </Link>
      </div>
    </SpotlightCard>
  )
}