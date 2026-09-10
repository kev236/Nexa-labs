'use client'

import { useState } from 'react'

export default function WaitlistForm({ productName }: { productName: string }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, product: productName }),
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

  if (status === 'success') {
    return (
      <div className="p-4 bg-purple-900/20 border border-purple-500/50 rounded-lg text-purple-200 text-sm">
        Je staat op de lijst! We mailen je zodra {productName} live gaat.
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-6 max-w-md">
      <input
        type="email"
        required
        placeholder="Je e-mailadres..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
      >
        {status === 'loading' ? 'Even geduld...' : 'Join Waitlist'}
      </button>
    </form>
  )
}