'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

export default function ProductWaitlistForm({ productName }: { productName: string }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, productName }),
      })

      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="p-6 md:p-8 rounded-3xl border border-purple-500/20 bg-linear-to-b from-purple-950/20 to-zinc-950 space-y-6">
      <div>
        <span className="text-[10px] font-mono tracking-widest text-purple-400 uppercase border border-purple-500/30 bg-purple-950/40 px-2.5 py-1 rounded-full inline-block mb-3">
          Early Access
        </span>
        <h3 className="text-xl font-bold text-zinc-100">Get Early Deployment Access</h3>
        <p className="text-xs text-zinc-400 mt-1">
          Join the waitlist for <strong className="text-zinc-200">{productName}</strong>. We notify beta testers in batches.
        </p>
      </div>

      {status === 'success' ? (
        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-center space-y-2">
          <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
          <p className="text-xs font-mono text-emerald-300">
            You are registered on the official waitlist for {productName}!
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="product-email" className="block text-xs font-mono text-zinc-400 mb-2">
              Work Email *
            </label>
            <input
              id="product-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="engineer@company.com"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 text-sm focus:outline-none focus:border-purple-500 font-mono placeholder:text-zinc-600"
            />
          </div>

          {status === 'error' && (
            <p className="text-xs font-mono text-red-400">
              Registration failed. Please try again.
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-3.5 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-medium text-sm rounded-xl transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] flex items-center justify-center gap-2 cursor-pointer"
          >
            {status === 'loading' ? 'Registering Payload...' : 'Join Waitlist'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      )}
    </div>
  )
}