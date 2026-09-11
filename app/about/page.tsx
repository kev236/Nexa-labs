import FadeIn from '@/components/FadeIn'
import SpotlightCard from '@/components/SpotlightCard'
import Link from 'next/link'

export const metadata = {
  title: 'About — Nexa Labs',
  description: 'Learn about Nexa Labs and our approach to building focused software.',
}

export default function AboutPage() {
  const principles = [
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

  return (
    <div className="max-w-6xl mx-auto px-6 py-20 space-y-28">
      {/* HERO SECTION */}
      <section className="max-w-3xl space-y-6">
        <FadeIn direction="up">
          <span className="text-xs font-mono tracking-widest text-purple-400 uppercase border border-purple-500/30 bg-purple-950/30 px-3 py-1 rounded-full">
            OUR PURPOSE
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gradient leading-tight mt-4">
            Software without unnecessary complexity.
          </h1>
          <p className="text-gray-400 text-lg md:text-xl font-normal leading-relaxed">
            Nexa Labs is an independent software studio creating a portfolio of focused tools built around one core principle: remove friction and deliver superior results.
          </p>
        </FadeIn>
      </section>

      {/* CORE PHILOSOPHY SPOTLIGHT */}
      <section>
        <FadeIn direction="up">
          <SpotlightCard className="p-10 md:p-14 border-purple-500/20">
            <div className="grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-8 space-y-4">
                <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">
                  Ecosystem Model
                </span>
                <h2 className="text-2xl md:text-4xl font-bold text-white">
                  Small tools. Autonomous power.
                </h2>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                  Instead of building bloated &quot;all-in-one&quot; platforms that become slow and complex, Nexa Labs focuses on a suite of hyper-specialized micro-products. Each product executes one task — exceptionally well.
                </p>
              </div>
              <div className="md:col-span-4 flex justify-center">
                <div className="w-32 h-32 rounded-2xl border border-purple-500/30 bg-purple-900/20 flex items-center justify-center text-purple-400 font-mono font-bold text-3xl shadow-[0_0_40px_rgba(168,85,247,0.2)]">
                  NEXA
                </div>
              </div>
            </div>
          </SpotlightCard>
        </FadeIn>
      </section>

      {/* OPERATING PRINCIPLES */}
      <section className="space-y-12">
        <FadeIn direction="up">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">
              Methodology
            </span>
            <h2 className="text-3xl font-bold text-white">How we build software.</h2>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-6">
          {principles.map((p, idx) => (
            <FadeIn key={idx} delay={idx * 0.1} direction="up">
              <SpotlightCard className="h-full space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono text-purple-400 bg-purple-950/50 border border-purple-500/20 px-2.5 py-1 rounded-md">
                    {p.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">{p.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
              </SpotlightCard>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="text-center space-y-6">
        <FadeIn direction="up">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Want to learn more or collaborate?
          </h2>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-block bg-white text-black font-semibold px-8 py-3.5 rounded-full hover:bg-gray-200 transition-all shadow-[0_0_25px_rgba(255,255,255,0.2)]"
            >
              Get in Touch
            </Link>
          </div>
        </FadeIn>
      </section>
    </div>
  )
}