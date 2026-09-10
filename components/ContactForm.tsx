'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="p-6 bg-purple-900/20 border border-purple-500/50 rounded-xl text-purple-200">
        Bedankt! Je bericht is succesvol verzonden. We nemen zo snel mogelijk contact op.
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <div>
        <label className="block text-sm text-gray-400 mb-1">Naam</label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-1">E-mailadres</label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-1">Onderwerp</label>
        <input
          type="text"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-1">Bericht</label>
        <textarea
          required
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
        />
      </div>

      {status === 'error' && (
        <p className="text-red-400 text-sm">Er is iets misgegaan. Probeer het opnieuw.</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-purple-600 hover:bg-purple-500 text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50"
      >
        {status === 'loading' ? 'Verzenden...' : 'Bericht verzenden'}
      </button>
    </form>
  )
}