import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-125 flex flex-col items-center justify-center px-6 text-center">
      <div className="space-y-6 max-w-md border border-purple-500/20 bg-black/40 p-8 rounded-2xl backdrop-blur-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-purple-600/10 blur-3xl pointer-events-none" />

        <span className="text-xs font-mono tracking-widest text-purple-400 uppercase border border-purple-500/30 bg-purple-950/30 px-3 py-1 rounded-full">
          ERR_404 // ROUTE_NOT_FOUND
        </span>

        <h1 className="text-6xl font-extrabold text-white tracking-tight">404</h1>

        <p className="text-xs font-mono text-gray-400">
          &gt; The requested path does not exist in the Nexa Labs core environment.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs px-5 py-2.5 rounded-xl transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)]"
          >
            Return Home
          </Link>
          <Link
            href="/products"
            className="bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 font-medium text-xs px-5 py-2.5 rounded-xl transition-colors"
          >
            View Products
          </Link>
        </div>
      </div>
    </div>
  )
}