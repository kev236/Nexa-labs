'use client'

import { useState } from 'react'

interface WaitlistFormProps {
  productName?: string
  slug?: string
}

export default function WaitlistForm({
  productName = 'Nexa Tool',
  slug,
}: WaitlistFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    setErrorMessage('')

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, productName, slug }),
      })

      if (!res.ok) {
        throw new Error('Failed to submit. Please try again.')
      }

      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
      setErrorMessage('Something went wrong — please try again.')
    }
  }

  return (
    <div className="border border-white/10 bg-black/40 rounded-2xl p-6 md:p-8 backdrop-blur-md">
      <div className="mb-6">
        <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">
          Early Access Program
        </span>
        <h3 className="text-2xl font-bold text-white mt-1">
          Join the Waitlist for {productName}
        </h3>
        <p className="text-sm text-gray-400 mt-2">
          Be among the first engineers to access this tool upon deployment.
        </p>
      </div>

      {status === 'success' ? (
        <div className="bg-emerald-950/40 border border-emerald-500/30 p-4 rounded-xl font-mono text-xs text-emerald-400">
          ✓ Access request registered. We will notify you when deployment slot opens.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="engineer@company.com"
              required
              className="grow px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-purple-500 font-mono placeholder:text-gray-600"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-medium text-sm rounded-xl transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)] whitespace-nowrap"
            >
              {status === 'loading' ? 'Submitting...' : 'Request Early Access'}
            </button>
          </div>
          {status === 'error' && (
            <p className="text-xs text-red-400 font-mono">{errorMessage}</p>
          )}
        </form>
      )}
    </div>
  )
}