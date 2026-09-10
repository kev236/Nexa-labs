import { Product } from '@/data/products'
import * as Icons from 'lucide-react'
import Link from 'next/link'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const iconName = product.iconName || 'Activity'
  const IconComponent = (Icons as Record<string, any>)[iconName] || Icons.Activity

  return (
    <div className="border border-gray-800 rounded-xl p-6 bg-gray-900/50">
      <div className="flex items-center space-x-3 mb-4">
        <IconComponent className="w-6 h-6 text-blue-500" />
        <h3 className="text-xl font-bold text-white">{product.name}</h3>
      </div>
      <p className="text-gray-400 text-sm mb-4">{product.description}</p>
      <Link
        href={`/products/${product.slug}`}
        className="text-blue-400 text-sm font-medium hover:underline"
      >
        Bekijk product →
      </Link>
    </div>
  )
}