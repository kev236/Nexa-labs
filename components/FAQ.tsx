import { client } from '@/lib/sanity'
import FadeIn from '@/components/FadeIn'
import FAQAccordion, { type FAQItem } from '@/components/FAQAccordion'

// Was a hardcoded array here — content editors had no way to add or
// change an FAQ without a code change and a deploy. Now reads the `faq`
// document type (sanity/schemaTypes/faq.ts), which already existed in
// the schema but had no frontend consumer at all.
async function getFaqs(): Promise<FAQItem[]> {
  return client.fetch<FAQItem[]>(
    `*[_type == "faq"] | order(_createdAt asc) { question, answer }`
  )
}

const FALLBACK_FAQS: FAQItem[] = [
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

export default async function FAQ() {
  const faqs = await getFaqs().catch(() => [])
  // Sanity unreachable, or no FAQ documents published yet: fall back
  // to the same 4 questions this section always shipped with, rather
  // than rendering an empty section on a live page.
  const items = faqs.length > 0 ? faqs : FALLBACK_FAQS

  return (
    <section className="max-w-4xl mx-auto px-6 w-full py-12">
      <FadeIn direction="up">
        <div className="text-center space-y-3 mb-12">
          <span className="text-[10px] font-mono tracking-widest text-purple-400 uppercase border border-purple-500/30 bg-purple-950/40 px-3 py-1 rounded-full inline-block">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl font-bold text-zinc-100">Everything you need to know</h2>
          <p className="text-zinc-400 text-sm max-w-xl mx-auto">
            Clear answers about our autonomous architecture, deployment speed, and product roadmap.
          </p>
        </div>

        <FAQAccordion items={items} />
      </FadeIn>
    </section>
  )
}
