'use client'

import { useState } from 'react'
import ProductCard from './ProductCard'
import { Product } from '@/data/products'

interface EcosystemFilterProps {
  products: Product[]
}

export default function EcosystemFilter({ products }: EcosystemFilterProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All')

  const categories = ['All', 'Sales', 'Finance', 'SEO & Performance', 'Developer Tools']

  const filteredProducts =
    activeCategory === 'All'
      ? products
      : products.filter((p) => p.category === activeCategory)

  return (
    <div className="space-y-8">
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-zinc-800/60 pb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-purple-600 text-white font-semibold shadow-[0_0_12px_rgba(168,85,247,0.3)]'
                : 'bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}