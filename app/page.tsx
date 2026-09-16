import Link from 'next/link'
import { Mail, MessageSquareText, GitBranch } from 'lucide-react'
import FadeIn from '@/components/FadeIn'
import ProductCard from '@/components/ProductCard'
import HeroVisual from '@/components/HeroVisual'
import RecentActivity from '@/components/RecentActivity'
import SystemPulse from '@/components/SystemPulse'
import Testimonials from '@/components/Testimonials'
import NewsletterWaitlist from '@/components/NewsletterWaitlist'
import ContactForm from '@/components/ContactForm'
import SpotlightCard from '@/components/SpotlightCard'
import FAQ from '@/components/FAQ'
import { getProducts, Product } from '@/data/products'

export const revalidate = 60

const PRINCIPLES = [
  {
    badge: '01',
    title: 'Problem-First Engineering',
    desc: 'We do not build software for the sake of technology, but to directly solve specific friction points and operational inefficiencies.',
  },
  {
    badge: '02',
    title: 'Zero Friction UI',
    desc: 'Our interfaces are stripped of all noise. A product must be understood and usable within seconds.',
  },
  {
    badge: '03',
    title: 'Ecosystem Architecture',
    desc: 'Every product operates as an autonomous tool, sharing the speed, reliability, and design principles of the Nexa Labs core.',
  },
  {
    badge: '04',
    title: 'Relentless Iteration',
    desc: 'We launch early, collect real user feedback, and continuously refine based on what truly drives impact.',
  },
]

export default async function HomePage() {
  const products = await getProducts().catch(() => [])

  return (
    <div className="flex flex-col pt-16">
      {/* HERO */}
      <section className="hex-field relative min-h-[88vh] flex flex-col justify-center items-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none ambient-glow" />

        <div className="z-10 flex flex-col items-center w-full max-w-4xl">
          <FadeIn direction="up" delay={0.1}>
            <span className="text-[11px] font-mono tracking-widest text-purple-400 uppercase border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 rounded-full mb-8 inline-block shadow-[0_0_15px_rgba(168,85,247,0.15)]">
              NEXA LABS
            </span>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-6 text-gradient">
              Small software.<br className="hidden md:block" /> Big impact.
            </h1>
          </FadeIn>

          <FadeIn direction="up" delay={0.3}>
            <p className="text-zinc-400 text-lg md:text-xl max-w-2xl leading-relaxed mb-10 mx-auto">
              We build focused software products that make complicated things simple. An expanding ecosystem of professional tools.
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
              <a
                href="#products"
                className="px-8 py-3.5 bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-xl transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] text-sm"
              >
                Explore Products
              </a>
              <a
                href="#story"
                className="px-8 py-3.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-medium rounded-xl border border-zinc-800 transition-all text-sm"
              >
                About Nexa Labs
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* VISUAL + RECENT ACTIVITY */}
      <section className="max-w-6xl mx-auto px-6 w-full grid md:grid-cols-2 gap-6 -mt-8 md:-mt-16 relative z-10 pb-16">
        <FadeIn direction="up">
          <HeroVisual />
        </FadeIn>
        <FadeIn direction="up" delay={0.1}>
          <RecentActivity />
        </FadeIn>
      </section>

      {/* SYSTEM PULSE — real, computed numbers */}
      <SystemPulse />

      {/* PRODUCTS */}
      <section id="products" className="py-20 px-6 bg-zinc-950/60 border-y border-zinc-900">
        <div className="max-w-6xl mx-auto space-y-12">
          <FadeIn direction="up">
            <div className="md:w-2/3 space-y-3">
              <span className="text-[10px] font-mono tracking-widest text-purple-400 uppercase border border-purple-500/30 bg-purple-950/40 px-3 py-1 rounded-full inline-block">
                The Ecosystem
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-100">
                Software built to solve real problems.
              </h2>
              <p className="text-zinc-400 text-base md:text-lg">
                We create focused tools that are simple to understand, easy to use, and built to deliver results.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            {products.map((product: Product, index: number) => (
              <FadeIn key={product.id} delay={index * 0.1} direction="up">
                <ProductCard product={product} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn direction="up">
            <h2 className="text-3xl font-bold text-zinc-100 mb-16 text-center">
              We build. We test. We improve.
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { num: '01', title: 'Build', desc: 'We turn simple ideas into useful software.' },
              { num: '02', title: 'Test', desc: 'We put our products in the hands of real users.' },
              { num: '03', title: 'Improve', desc: 'We continuously improve the products that people love.' },
            ].map((step, i) => (
              <FadeIn key={step.num} delay={i * 0.15} direction="up" className="relative">
                <div className="text-6xl font-black text-zinc-900 absolute -top-8 -left-4 z-0 pointer-events-none">
                  {step.num}
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-zinc-200 mb-2">{step.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* STORY / PHILOSOPHY — folded in from the old /about page */}
      <section id="story" className="py-20 px-6 bg-zinc-950/60 border-y border-zinc-900">
        <div className="max-w-6xl mx-auto space-y-16">
          <FadeIn direction="up">
            <div className="max-w-2xl space-y-4">
              <span className="text-[10px] font-mono tracking-widest text-purple-400 uppercase border border-purple-500/30 bg-purple-950/40 px-3 py-1 rounded-full inline-block">
                Our Purpose
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-gradient leading-tight">
                Software without unnecessary complexity.
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed">
                Nexa Labs is an independent software studio creating a portfolio of focused tools built around one core principle: remove friction and deliver superior results.
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="up">
            <SpotlightCard className="p-8 md:p-12 border-purple-500/20">
              <div className="grid md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-8 space-y-4">
                  <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">
                    Ecosystem Model
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-white">
                    Small tools. Autonomous power.
                  </h3>
                  <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                    Instead of building bloated &quot;all-in-one&quot; platforms that become slow and complex, Nexa Labs focuses on a suite of hyper-specialized micro-products. Each product executes one task — exceptionally well.
                  </p>
                </div>
                <div className="md:col-span-4 flex justify-center">
                  <div className="w-28 h-28 rounded-2xl border border-purple-500/30 bg-purple-900/20 flex items-center justify-center text-purple-400 font-mono font-bold text-2xl shadow-[0_0_40px_rgba(168,85,247,0.2)]">
                    NEXA
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6">
            {PRINCIPLES.map((p, idx) => (
              <FadeIn key={p.badge} delay={idx * 0.1} direction="up">
                <SpotlightCard className="h-full space-y-4">
                  <span className="text-xs font-mono text-purple-400 bg-purple-950/50 border border-purple-500/20 px-2.5 py-1 rounded-md inline-block">
                    {p.badge}
                  </span>
                  <h4 className="text-xl font-bold text-white">{p.title}</h4>
                  <p className="text-zinc-400 text-sm leading-relaxed">{p.desc}</p>
                </SpotlightCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS — real quotes only, renders nothing until published */}
      <Testimonials />

      {/* FAQ */}
      <div id="faq">
        <FAQ />
      </div>

      {/* NEWSLETTER / EARLY ACCESS */}
      <section className="max-w-4xl mx-auto px-6 w-full py-8">
        <FadeIn direction="up">
          <NewsletterWaitlist />
        </FadeIn>
      </section>

      {/* CONTACT — folded in from the old /contact page */}
      <section id="contact" className="py-20 px-6 bg-zinc-950/60 border-y border-zinc-900">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-8">
            <FadeIn direction="up">
              <div className="space-y-4">
                <span className="text-[10px] font-mono tracking-widest text-purple-400 uppercase border border-purple-500/30 bg-purple-950/40 px-3 py-1 rounded-full inline-block">
                  Direct Channel
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-zinc-100">Let&apos;s talk.</h2>
                <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                  Have a question about our micro-software suite, need support, or want to explore custom software collaboration?
                </p>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.1}>
              <div className="space-y-4">
                <div className="p-4 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-purple-950/50 border border-purple-500/20 text-purple-400">
                    <MessageSquareText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-zinc-200">A person reads every message</h4>
                    <p className="text-xs text-zinc-400 mt-0.5">No auto-reply-only inbox — every submission reaches the team directly.</p>
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
                    <GitBranch className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-zinc-200">Developer Ecosystem</h4>
                    <p className="text-xs text-zinc-400 mt-0.5">Follow release updates in the changelog as new tools ship.</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          <div className="lg:col-span-7">
            <FadeIn direction="up" delay={0.15}>
              <SpotlightCard className="p-6 md:p-10">
                <ContactForm />
              </SpotlightCard>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 px-6 text-center pb-24">
        <FadeIn direction="up">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-4">
            Find software that works for you.
          </h2>
          <p className="text-zinc-400 text-base mb-8">
            Explore the growing collection of products from Nexa Labs.
          </p>
          <Link
            href="/products"
            className="inline-flex px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-xl transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] text-sm"
          >
            Explore Products
          </Link>
        </FadeIn>
      </section>
    </div>
  )
}
