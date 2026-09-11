'use client'

import { useState } from 'react'
import FadeIn from '@/components/FadeIn'
import { ChevronDown } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: 'How do Nexa micro-tools work together?',
    answer:
      'Each Nexa tool is built as an autonomous, lightweight module. You can use them independently to solve a single problem or chain them together via API/webhooks to automate entire workflows.',
  },
  {
    question: 'Are there any heavy SDKs or complex installations?',
    answer:
      'No. All tools are designed with a zero-bloat philosophy. Most integrations require just a lightweight API key or a simple drop-in script with sub-15ms execution speeds.',
  },
  {
    question: 'How does access and pricing work across new SaaS releases?',
    answer:
      'Early access members get immediate entry into new beta tools. Once a tool goes live, it features transparent usage-based or simple flat-monthly tiers with no hidden contracts.',
  },
  {
    question: 'Can I request a custom micro-SaaS tool for my team?',
    answer:
      'Yes. Our product pipeline is heavily driven by user votes and feedback. You can submit concept proposals through "In The Lab" or directly contact our engineering team.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="max-w-4xl mx-auto px-6 w-full py-12">
      <FadeIn direction="up">
        <div className="text-center space-y-3 mb-12">
          <span className="text-[10px] font-mono tracking-widest text-purple-400 uppercase border border-purple-500/30 bg-purple-950/40 px-3 py-1 rounded-full inline-block">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl font-bold text-zinc-100">
            Everything you need to know
          </h2>
          <p className="text-zinc-400 text-sm max-w-xl mx-auto">
            Clear answers about our autonomous architecture, deployment speed, and product roadmap.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={index}
                className="rounded-2xl border border-zinc-800/80 bg-zinc-900/30 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between p-6 text-left cursor-pointer focus:outline-none"
                >
                  <span className="text-base font-semibold text-zinc-100">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-zinc-400 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-purple-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-zinc-400 leading-relaxed border-t border-zinc-800/40 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </FadeIn>
    </section>
  )
}