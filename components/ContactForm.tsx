'use client'

import { useState } from 'react'

const INQUIRY_TYPES = [
  { value: 'general', label: 'General' },
  { value: 'support', label: 'Support' },
  { value: 'partnership', label: 'Partnership' },
] as const

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: 'general',
  })
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
        setFormData({ name: '', email: '', subject: '', message: '', inquiryType: 'general' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="p-6 bg-purple-900/20 border border-purple-500/50 rounded-xl text-purple-200 font-mono text-sm">
        ✓ Message sent. We&apos;ll get back to you shortly.
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-2 bg-zinc-950 p-1 rounded-lg border border-zinc-800 w-fit">
        {INQUIRY_TYPES.map((type) => (
          <button
            key={type.value}
            type="button"
            onClick={() => setFormData({ ...formData, inquiryType: type.value })}
            className={`px-3 py-1.5 text-xs font-mono rounded-md transition-colors ${
              formData.inquiryType === type.value
                ? 'bg-purple-600 text-white font-semibold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      <div>
        <label className="block text-sm text-zinc-400 mb-1">Name</label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
        />
      </div>

      <div>
        <label className="block text-sm text-zinc-400 mb-1">Email address</label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
        />
      </div>

      <div>
        <label className="block text-sm text-zinc-400 mb-1">Subject</label>
        <input
          type="text"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
        />
      </div>

      <div>
        <label className="block text-sm text-zinc-400 mb-1">Message</label>
        <textarea
          required
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
        />
      </div>

      {status === 'error' && (
        <p className="text-red-400 text-sm font-mono">Something went wrong — please try again.</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-purple-600 hover:bg-purple-500 text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
      >
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
