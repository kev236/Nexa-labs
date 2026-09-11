'use client'

import { useState } from 'react'

export default function NewsletterWaitlist() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    setTimeout(() => {
      setStatus('success')
      setEmail('')
    }, 800)
  }

  return (
    <div className="p-8 md:p-12 rounded-3xl border border-purple-500/20 bg-linear-to-b from-purple-950/20 to-zinc-950 text-center max-w-3xl mx-auto relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-purple-500/10 blur-3xl pointer-events-none rounded-full" />

      <span className="text-[10px] font-mono tracking-widest text-purple-400 uppercase border border-purple-500/30 bg-purple-950/40 px-3 py-1 rounded-full inline-block mb-4">
        Early Access Feed
      </span>

      <h3 className="text-2xl md:text-3xl font-bold text-zinc-100 mb-3">
        Be First to Test New Software Modules
      </h3>

      <p className="text-zinc-400 text-sm max-w-lg mx-auto mb-8 leading-relaxed">
        Join engineering leaders and digital teams getting direct access to our latest micro-SaaS deployments.
      </p>

      {status === 'success' ? (
        <div className="bg-emerald-950/40 border border-emerald-500/30 p-4 rounded-xl text-emerald-400 font-mono text-xs">
          ✓ Subscribed! You will receive early access links prior to public releases.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="engineer@company.com"
            required
            className="grow px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-100 text-sm focus:outline-none focus:border-purple-500 font-mono placeholder:text-zinc-600"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-medium text-sm rounded-xl transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)] whitespace-nowrap cursor-pointer"
          >
            {status === 'loading' ? 'Joining...' : 'Get Invites'}
          </button>
        </form>
      )}
    </div>
  )
}