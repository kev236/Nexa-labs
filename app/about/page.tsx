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
      desc: 'We bouwen geen software om de techniek, maar om specifieke frictiepunten en inefficiënties direct op te lossen.',
    },
    {
      badge: '02',
      title: 'Zero Friction UI',
      desc: 'Onze interfaces worden gestript van alle ruis. Een product moet binnen enkele seconden te begrijpen en te gebruiken zijn.',
    },
    {
      badge: '03',
      title: 'Ecosystem Architecture',
      desc: 'Elk product werkt als een autonoom instrument, maar deelt de snelheid, betrouwbaarheid en esthetiek van de Nexa Labs kern.',
    },
    {
      badge: '04',
      title: 'Relentless Iteration',
      desc: 'We lancering vroeg, verzamelen echte gebruikerseigen data en verbeteren continue op basis van wat écht impact heeft.',
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
            Software without the unnecessary complexity.
          </h1>
          <p className="text-gray-400 text-lg md:text-xl font-normal leading-relaxed">
            Nexa Labs is een onafhankelijke software studio. We ontwikkelen een portfolio van gefocuste tools die ontworpen zijn rondom één basisprincipe: verwijder de frictie en maak het resultaat beter.
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
                  In plaats van overladen &quot;all-in-one&quot; platforms te bouwen die traag en ingewikkeld worden, richt Nexa Labs zich op een verzameling hyper-gespecialiseerde micro-producten. Elk product doet exact één ding — uitzonderlijk goed.
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
              Methodologie
            </span>
            <h2 className="text-3xl font-bold text-white">Hoe wij software bouwen.</h2>
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
            Wil je meer weten of samenwerken?
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