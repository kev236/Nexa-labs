'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

export default function ApiAccessRequestForm() {
  const [email, setEmail] = useState('')
  const [useCase, setUseCase] = useState('')
  const [company_website, setCompanyWebsite] = useState('') // honeypot
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !useCase) return

    setStatus('loading')
    try {
      const res = await fetch('/api/request-api-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, useCase, company_website }),
      })

      if (res.ok) {
        setStatus('success')
        setEmail('')
        setUseCase('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-center space-y-2">
        <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
        <p className="text-sm font-mono text-emerald-300">
          Request received — we&apos;ll reply by email to set up access and billing.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 md:p-8 rounded-3xl border border-purple-500/20 bg-linear-to-b from-purple-950/20 to-zinc-950">
      {/* Honeypot — hidden from real visitors, off-screen not display:none so screen readers skip it correctly */}
      <div style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}>
        <label htmlFor="company_website">Company website</label>
        <input
          id="company_website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={company_website}
          onChange={(e) => setCompanyWebsite(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="api-access-email" className="block text-sm text-zinc-400 mb-1">
          Work email
        </label>
        <input
          id="api-access-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
        />
      </div>

      <div>
        <label htmlFor="api-access-use-case" className="block text-sm text-zinc-400 mb-1">
          What would you use it for?
        </label>
        <textarea
          id="api-access-use-case"
          required
          rows={3}
          value={useCase}
          onChange={(e) => setUseCase(e.target.value)}
          placeholder="e.g. scoring clips for a repost channel before editing them"
          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
        />
      </div>

      {status === 'error' && (
        <p className="text-red-400 text-sm font-mono">Something went wrong — please try again.</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
      >
        {status === 'loading' ? 'Sending...' : 'Request access'}
        <ArrowRight className="w-4 h-4" />
      </button>

      <p className="text-[11px] text-zinc-500">
        €29/month flat or €0.015/call pay-as-you-go, billed manually — no card form on this site.
        By submitting, you agree to our{' '}
        <Link href="/privacy-policy" className="text-zinc-400 hover:text-purple-400 underline">
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  )
}
