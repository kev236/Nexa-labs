import Link from 'next/link'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-zinc-950/70 border-b border-zinc-800/60 transition-colors">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-linear-to-br from-purple-500 to-indigo-600 flex items-center justify-center font-bold text-white text-sm shadow-[0_0_12px_rgba(168,85,247,0.3)] group-hover:scale-105 transition-transform">
            N
          </div>
          <span className="font-bold tracking-wider text-sm text-zinc-100 group-hover:text-purple-300 transition-colors">
            NEXA LABS
          </span>
        </Link>

        <nav className="flex items-center gap-6 text-xs font-mono text-zinc-400">
          <Link href="/#products" className="hover:text-zinc-100 transition-colors">
            Products
          </Link>
          <Link href="/blog" className="hover:text-zinc-100 transition-colors">
            Blog
          </Link>
          <Link href="/changelog" className="hover:text-zinc-100 transition-colors">
            Changelog
          </Link>
          <Link
            href="/#products"
            className="hidden sm:inline-flex px-3.5 py-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 font-medium transition-all"
          >
            Access Suite
          </Link>
        </nav>
      </div>
    </header>
  )
}