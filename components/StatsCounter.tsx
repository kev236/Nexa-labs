import FadeIn from '@/components/FadeIn'

export default function StatsCounter() {
  const stats = [
    { label: 'Global Edge Latency', value: '< 15ms' },
    { label: 'Platform SLA Uptime', value: '99.99%' },
    { label: 'Early Beta Engineers', value: '1,200+' },
    { label: 'Autonomous Workflows', value: '100%' },
  ]

  return (
    <section className="border-y border-zinc-900 bg-zinc-950/40 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <FadeIn key={index} delay={index * 0.1} direction="up">
              <div className="text-center space-y-1">
                <div className="text-3xl md:text-4xl font-extrabold font-mono tracking-tight bg-linear-to-r from-purple-300 via-indigo-200 to-purple-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}