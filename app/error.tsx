'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-125 flex flex-col items-center justify-center px-6 text-center">
      <div className="space-y-6 max-w-md border border-red-500/20 bg-black/40 p-8 rounded-2xl backdrop-blur-xl">
        <span className="text-xs font-mono tracking-widest text-red-400 uppercase border border-red-500/30 bg-red-950/30 px-3 py-1 rounded-full">
          SYSTEM_EXCEPTION
        </span>

        <h2 className="text-2xl font-bold text-white">Execution Interrupted</h2>

        <p className="text-xs font-mono text-gray-400">
          &gt; {error.message || 'An unexpected runtime anomaly was caught.'}
        </p>

        <button
          onClick={() => reset()}
          className="bg-red-600/80 hover:bg-red-500 text-white font-medium text-xs px-5 py-2.5 rounded-xl transition-all shadow-[0_0_15px_rgba(239,68,68,0.3)]"
        >
          Re-initialize Session
        </button>
      </div>
    </div>
  )
}