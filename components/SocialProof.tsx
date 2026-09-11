export default function SocialProof() {
  const metrics = [
    { label: 'Edge Latency', value: '< 25ms' },
    { label: 'Uptime SLA', value: '99.99%' },
    { label: 'Micro-Tools', value: 'Autonomous' },
    { label: 'Architecture', value: 'Serverless' },
  ]

  return (
    <div className="border-y border-white/10 bg-white/2 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-center text-xs font-mono tracking-widest text-gray-500 uppercase mb-8">
          Engineered for Extreme Speed & Frictionless Integration
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl md:text-4xl font-extrabold font-mono tracking-tight bg-linear-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
                {metric.value}
              </div>
              <div className="text-xs font-mono text-gray-400 mt-1 uppercase tracking-wider">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}