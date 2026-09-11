import FadeIn from '@/components/FadeIn'
import SpotlightCard from '@/components/SpotlightCard'
import Link from 'next/link'

export default function SuccessPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-32 text-center space-y-8">
      <FadeIn direction="up">
        <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(16,185,129,0.2)]">
          <span className="text-3xl text-emerald-400">✓</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          Payment Successful
        </h1>
        
        <p className="text-gray-400 text-lg">
          Thank you for your purchase. Your account and license details have been sent to your email address.
        </p>
      </FadeIn>

      <FadeIn direction="up" delay={0.1}>
        <SpotlightCard className="p-6 mt-8 border-white/10 text-left">
          <h3 className="text-white font-medium mb-2">What happens next?</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>1. You will receive an invoice via email shortly.</li>
            <li>2. Follow the instructions in the email to activate your workspace.</li>
            <li>3. Our team is available if you need help with onboarding.</li>
          </ul>
        </SpotlightCard>
      </FadeIn>

      <FadeIn direction="up" delay={0.2} className="pt-6">
        <Link
          href="/"
          className="inline-block bg-white text-black font-semibold px-8 py-3.5 rounded-full hover:bg-gray-200 transition-all"
        >
          Return to Dashboard
        </Link>
      </FadeIn>
    </div>
  )
}