'use client'

import { useState } from 'react'
import SpotlightCard from './SpotlightCard'

type ActionKey = 'latency' | 'scale' | 'security'

export default function InteractiveDemo() {
  const [activeAction, setActiveAction] = useState<ActionKey>('latency')
  const [isRunning, setIsRunning] = useState(false)
  const [output, setOutput] = useState<string | null>(null)

  const handleRun = () => {
    setIsRunning(true)
    setOutput(null)

    setTimeout(() => {
      setIsRunning(false)
      if (activeAction === 'latency') {
        setOutput('⚡ Global Edge Latency: 14ms | Status: Optimal')
      } else if (activeAction === 'scale') {
        setOutput('📈 Multi-tenant isolated node auto-scaled to 10k req/sec')
      } else {
        setOutput('🛡️ Zero-Trust authentication & stateless token verified')
      }
    }, 600)
  }

  return (
    <SpotlightCard className="p-6 md:p-8 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-zinc-800/60 pb-4">
        <div>
          <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest bg-purple-950/40 border border-purple-500/20 px-2.5 py-1 rounded-md">
            Architecture Sandbox
          </span>
          <h3 className="text-lg font-bold text-zinc-100 mt-2">Nexa Modular Core Engine</h3>
        </div>

        <div className="flex bg-zinc-950 p-1 rounded-lg border border-zinc-800">
          {(['latency', 'scale', 'security'] as ActionKey[]).map((action) => (
            <button
              key={action}
              onClick={() => {
                setActiveAction(action)
                setOutput(null)
              }}
              className={`px-3 py-1.5 text-xs font-mono rounded-md transition-colors ${
                activeAction === action
                  ? 'bg-purple-600 text-white font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {action.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="font-mono text-xs bg-zinc-950 p-4 rounded-xl border border-zinc-800/80 min-h-30 flex flex-col justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-zinc-600">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
            <span className="ml-2 text-zinc-400">~/nexa-labs --test {activeAction}</span>
          </div>

          <p className="text-zinc-300">
            &gt; Initializing micro-service protocol test...
          </p>

          {isRunning && (
            <p className="text-purple-400 animate-pulse">&gt; Executing micro-task on global network...</p>
          )}

          {output && (
            <p className="text-emerald-400 font-semibold bg-emerald-950/30 p-2.5 rounded border border-emerald-500/20">
              {output}
            </p>
          )}
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="px-4 py-2 bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-bold font-mono rounded-lg transition-all disabled:opacity-50 cursor-pointer"
          >
            {isRunning ? 'Testing...' : 'Run Test'}
          </button>
        </div>
      </div>
    </SpotlightCard>
  )
}