import ContactForm from '@/components/ContactForm'
import FadeIn from '@/components/FadeIn'
import SpotlightCard from '@/components/SpotlightCard'

export const metadata = {
  title: 'Contact — Nexa Labs',
  description: 'Get in touch with the Nexa Labs team.',
}

export default function ContactPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="grid lg:grid-cols-12 gap-12 items-start">
        {/* LEFT INFO COLUMN */}
        <div className="lg:col-span-5 space-y-8">
          <FadeIn direction="up">
            <span className="text-xs font-mono tracking-widest text-purple-400 uppercase border border-purple-500/30 bg-purple-950/30 px-3 py-1 rounded-full">
              DIRECT LINE
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gradient leading-tight mt-4">
              Let&apos;s talk.
            </h1>
            <p className="text-gray-400 text-base leading-relaxed mt-4">
              Have a question about our products, feedback to share, or looking to collaborate with our engineering team? Reach out directly below.
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={0.1}>
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-3 p-4 rounded-xl border border-white/5 bg-white/3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <div>
                  <div className="text-xs font-mono text-gray-400">STATUS</div>
                  <div className="text-sm font-medium text-white">Engineering Online & Responding</div>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-white/5 bg-white/3 space-y-1">
                <div className="text-xs font-mono text-gray-400">EXPECTED RESPONSE</div>
                <div className="text-sm font-medium text-white">Within 24 hours on business days</div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* RIGHT FORM COLUMN */}
        <div className="lg:col-span-7">
          <FadeIn direction="up" delay={0.2}>
            <SpotlightCard className="p-8 md:p-10 border-purple-500/20">
              <ContactForm />
            </SpotlightCard>
          </FadeIn>
        </div>
      </div>
    </div>
  )
}