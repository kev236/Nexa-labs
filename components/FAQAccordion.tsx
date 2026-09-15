'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export interface FAQItem {
  question: string
  answer: string
}

export default function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="space-y-4">
      {items.map((faq, index) => {
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
              <span className="text-base font-semibold text-zinc-100">{faq.question}</span>
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
  )
}
