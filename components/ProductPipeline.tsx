'use client'

import { useState } from 'react'
import SpotlightCard from './SpotlightCard'
import { UPCOMING_PRODUCTS, UpcomingProduct } from '@/data/products'

export default function ProductPipeline() {
  const [pipeline, setPipeline] = useState<UpcomingProduct[]>(UPCOMING_PRODUCTS)
  const [votedIds, setVotedIds] = useState<string[]>([])

  const handleVote = (id: string) => {
    if (votedIds.includes(id)) return

    setPipeline((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, votes: item.votes + 1 } : item
      )
    )
    setVotedIds([...votedIds, id])
  }

  return (
    <section className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800/80 pb-6">
        <div>
          <span className="text-xs font-mono text-purple-400 uppercase tracking-widest bg-purple-950/40 border border-purple-500/20 px-3 py-1 rounded-full inline-block mb-3">
            In The Lab
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-100">
            Shape the Future of Nexa Labs
          </h2>
        </div>
        <p className="text-xs text-zinc-400 max-w-sm">
          We build based on demand. Vote for the next micro-SaaS tool you want us to deploy to production.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {pipeline.map((item) => {
          const hasVoted = votedIds.includes(item.id)

          return (
            <SpotlightCard
              key={item.id}
              className="p-6 rounded-2xl border border-zinc-800/80 bg-zinc-900/30 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-purple-300 bg-purple-950/50 border border-purple-500/30 px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">
                    Concept
                  </span>
                </div>
                <h3 className="text-base font-bold text-zinc-100 mb-2">{item.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-zinc-800/50">
                <span className="text-xs font-mono text-zinc-400">
                  <strong className="text-purple-300">{item.votes}</strong> votes
                </span>
                <button
                  onClick={() => handleVote(item.id)}
                  disabled={hasVoted}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    hasVoted
                      ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-500/30'
                      : 'bg-zinc-800 hover:bg-purple-600 hover:text-white text-zinc-300 border border-zinc-700'
                  }`}
                >
                  {hasVoted ? '✓ Voted' : '▲ Upvote Tool'}
                </button>
              </div>
            </SpotlightCard>
          )
        })}
      </div>
    </section>
  )
}