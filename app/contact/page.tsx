'use client'

import { useState } from 'react'
import FadeIn from '@/components/FadeIn'
import { Mail, Clock, MessageSquare, ArrowRight, CheckCircle2 } from 'lucide-react'

type InquiryType = 'general' | 'support' | 'partnership'

export default function ContactPage() {
  const [inquiryType, setInquiryType] = useState<InquiryType>('general')
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return

    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          inquiryType,
        }),
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

  return (
    <div className="pt-32 pb-24 px-6 max-w-6xl mx-auto w-full min-h-screen">
      <FadeIn direction="up">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-[10px] font-mono tracking-widest text-purple-400 uppercase border border-purple-500/30 bg-purple-950/40 px-3 py-1 rounded-full inline-block">
                Direct Channel
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-100 tracking-tight">
                Let&apos;s talk.
              </h1>
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                Have a question about our micro-software suite, need support, or want to explore custom software collaboration?
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-purple-950/50 border border-purple-500/20 text-purple-400">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-200">Guaranteed Response SLA</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">We respond to all technical and general inquiries within 12 hours.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-purple-950/50 border border-purple-500/20 text-purple-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-200">Direct Email</h4>
                  <p className="text-xs font-mono text-purple-300 mt-0.5">support@nexalabs.tech</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-purple-950/50 border border-purple-500/20 text-purple-400">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-200">Developer Ecosystem</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">Follow release updates and discussions on GitHub &amp; X.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 p-8 md:p-10 rounded-3xl border border-zinc-800/80 bg-zinc-900/30 backdrop-blur-md">
            {status === 'success' ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-zinc-100">Message Delivered</h3>
                <p className="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed font-mono">
                  Thank you for reaching out. Our engineering team has received your query and will reply via email shortly.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-6 px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono rounded-xl transition-all cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-3">Select Topic</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'general', label: 'General Inquiry' },
                      { id: 'support', label: 'Product Support' },
                      { id: 'partnership', label: 'Custom Build' },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setInquiryType(tab.id as InquiryType)}
                        className={`py-2.5 px-3 rounded-xl text-xs font-mono transition-all cursor-pointer border ${
                          inquiryType === tab.id
                            ? 'bg-purple-600 text-white font-semibold border-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.3)]'
                            : 'bg-zinc-950 text-zinc-400 hover:text-zinc-200 border-zinc-800'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-xs font-mono text-zinc-400">Name *</label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 text-sm focus:outline-none focus:border-purple-500 font-mono placeholder:text-zinc-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-xs font-mono text-zinc-400">Email *</label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@company.com"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 text-sm focus:outline-none focus:border-purple-500 font-mono placeholder:text-zinc-600"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="block text-xs font-mono text-zinc-400">Subject</label>
                  <input
                    id="subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="How can we help?"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 text-sm focus:outline-none focus:border-purple-500 font-mono placeholder:text-zinc-600"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-xs font-mono text-zinc-400">Message *</label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your project or technical question..."
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 text-sm focus:outline-none focus:border-purple-500 font-mono placeholder:text-zinc-600 resize-y"
                  />
                </div>

                {status === 'error' && (
                  <p className="text-red-400 font-mono text-xs">
                    Failed to send message. Please try again or email support@nexalabs.tech directly.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3.5 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-medium text-sm rounded-xl transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  {status === 'loading' ? 'Transmitting Payload...' : 'Send Message'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </FadeIn>
    </div>
  )
}