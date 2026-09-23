import FadeIn from '@/components/FadeIn'
import { getProducts, UPCOMING_PRODUCTS } from '@/data/products'
import { getChangelog } from '@/data/changelog'

/**
 * Replaces the old StatsCounter, which hardcoded invented numbers
 * ("< 15ms latency", "99.99% uptime", "1,200+ beta engineers" — none
 * backed by any real measurement). Every figure here is computed from
 * the same Sanity data the rest of the site reads, so it can only ever
 * say what's actually true right now.
 */
export default async function SystemPulse() {
  const [products, changelog] = await Promise.all([
    getProducts().catch(() => []),
    getChangelog().catch(() => []),
  ])

  const live = products.filter((p) => p.status === 'Live').length
  const beta = products.filter((p) => p.status === 'Beta').length
  const latest = changelog[0]

  const stats = [
    { label: 'Live Products', value: String(live) },
    { label: 'In Beta', value: String(beta) },
    { label: 'In The Lab', value: String(UPCOMING_PRODUCTS.length) },
  ]

  return (
    <section className="border-y border-zinc-900 bg-zinc-950/40 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <FadeIn key={stat.label} delay={index * 0.1} direction="up">
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
          <FadeIn delay={0.3} direction="up">
            <div className="text-center space-y-1">
              <div className="text-3xl md:text-4xl font-extrabold font-mono tracking-tight bg-linear-to-r from-purple-300 via-indigo-200 to-purple-400 bg-clip-text text-transparent">
                {latest ? new Date(latest.releaseDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '—'}
              </div>
              <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                Last Shipped
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
