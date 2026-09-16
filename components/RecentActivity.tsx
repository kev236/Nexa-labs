import Link from 'next/link'
import SpotlightCard from '@/components/SpotlightCard'
import { getChangelog } from '@/data/changelog'

const TYPE_COLOR: Record<string, string> = {
  Feature: 'text-emerald-400',
  Fix: 'text-red-400',
  Improvement: 'text-purple-400',
  Announcement: 'text-blue-400',
}

/**
 * Replaces the old "Architecture Sandbox" demo, which simulated a fake
 * test run and printed canned output ("Global Edge Latency: 14ms")
 * regardless of what button you pressed — nothing behind it was real.
 * This shows the actual latest changelog entries instead. If none are
 * published yet, it renders nothing, same honest-empty-state pattern
 * as Testimonials — never a placeholder "nothing shipped yet" screen.
 */
export default async function RecentActivity() {
  const entries = (await getChangelog().catch(() => [])).slice(0, 3)
  if (entries.length === 0) return null

  return (
    <SpotlightCard className="p-6 md:p-8 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-zinc-800/60 pb-4">
        <div>
          <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest bg-purple-950/40 border border-purple-500/20 px-2.5 py-1 rounded-md">
            Live From The Lab
          </span>
          <h3 className="text-lg font-bold text-zinc-100 mt-2">Recently shipped</h3>
        </div>
        <Link
          href="/changelog"
          className="text-xs font-mono text-purple-400 hover:text-purple-300 transition-colors"
        >
          Full changelog &rarr;
        </Link>
      </div>

      <div className="font-mono text-xs bg-zinc-950 p-4 rounded-xl border border-zinc-800/80 space-y-3">
        <div className="flex items-center gap-2 text-zinc-600 mb-1">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
          <span className="ml-2 text-zinc-400">~/nexa-labs --log --recent</span>
        </div>
        {entries.map((entry) => (
          <p key={entry._id} className="text-zinc-300">
            <span className="text-zinc-600">
              {new Date(entry.releaseDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>{' '}
            <span className={TYPE_COLOR[entry.type] ?? 'text-zinc-400'}>[{entry.type}]</span>{' '}
            {entry.title}
          </p>
        ))}
      </div>
    </SpotlightCard>
  )
}
