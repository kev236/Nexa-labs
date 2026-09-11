import SpotlightCard from './SpotlightCard'

export default function BentoGrid() {
  const steps = [
    {
      num: '01',
      title: 'Build',
      desc: 'We turn simple, high-impact ideas into scalable software products.',
      badge: 'Engineering',
    },
    {
      num: '02',
      title: 'Test',
      desc: 'We put software directly into production to gather immediate user signals.',
      badge: 'Validation',
    },
    {
      num: '03',
      title: 'Improve',
      desc: 'Continuous refinement based on operational metrics and friction points.',
      badge: 'Optimization',
    },
  ]

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {steps.map((item, idx) => (
        <SpotlightCard key={idx} className="relative group">
          <div className="flex justify-between items-start mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-400/80 border border-purple-500/20 bg-purple-950/30 px-2.5 py-1 rounded-md">
              {item.badge}
            </span>
            <span className="text-5xl font-extrabold font-mono text-white/10 group-hover:text-purple-500/20 transition-colors">
              {item.num}
            </span>
          </div>

          <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
        </SpotlightCard>
      ))}
    </div>
  )
}