import Link from 'next/link'
import { Logo } from './Logo'
import { getProducts } from '@/data/products'

export default async function Footer() {
  const products = await getProducts().catch(() => [])
  const live = products.filter((p) => p.status === 'Live').length

  return (
    <footer className="border-t border-zinc-800/80 bg-zinc-950/80 py-12 text-xs text-zinc-400 font-mono">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start">
            <Logo markSize={20} wordmarkClassName="font-bold text-zinc-200 tracking-wider" />
          </div>
          <p className="text-zinc-500">Autonomous Micro-Software Ecosystem.</p>
        </div>

        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{live} {live === 1 ? 'product' : 'products'} live</span>
        </div>

        <div className="flex items-center gap-6">
          <Link href="/#products" className="hover:text-zinc-200 transition-colors">
            Products
          </Link>
          <Link href="/blog" className="hover:text-zinc-200 transition-colors">
            Blog
          </Link>
          <Link href="/changelog" className="hover:text-zinc-200 transition-colors">
            Changelog
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-8 pt-6 border-t border-zinc-900 text-center text-zinc-600">
        © {new Date().getFullYear()} Nexa Labs. All rights reserved.
      </div>
    </footer>
  )
}
