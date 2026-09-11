'use client'

import { useState } from 'react'
import SpotlightCard from './SpotlightCard'

type ToolKey = 'speed' | 'seo' | 'tokens'

export default function InteractiveDemo() {
  const [activeTool, setActiveTool] = useState<ToolKey>('speed')
  const [isRunning, setIsRunning] = useState(false)
  const [output, setOutput] = useState<string | null>(null)

  const handleRun = () => {
    setIsRunning(true)
    setOutput(null)

    setTimeout(() => {
      setIsRunning(false)
      if (activeTool === 'speed') {
        setOutput('⚡ Latency: 18ms | Edge Cache: HIT | Status: 200 OK (Optimized)')
      } else if (activeTool === 'seo') {
        setOutput('🔍 Metadata: Valid | OG Tags: Detected | Score: 98/100')
      } else {
        setOutput('🧮 Prompt Tokens: 142 | Output Tokens: 38 | Est. Cost: $0.0002')
      }
    }, 800)
  }

  return (
    <SpotlightCard className="p-6 md:p-8 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-white/10 pb-4">
        <div>
          <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">
            Interactive Sandbox
          </span>
          <h3 className="text-xl font-bold text-white">Try Nexa Labs Architecture</h3>
        </div>

        <div className="flex bg-white/5 p-1 rounded-lg border border-white/10">
          {(['speed', 'seo', 'tokens'] as ToolKey[]).map((tool) => (
            <button
              key={tool}
              onClick={() => {
                setActiveTool(tool)
                setOutput(null)
              }}
              className={`px-3 py-1.5 text-xs font-mono rounded-md transition-colors ${
                activeTool === tool
                  ? 'bg-purple-600 text-white font-semibold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tool === 'speed' ? 'Latency Checker' : tool === 'seo' ? 'SEO Audit' : 'Token Estimator'}
            </button>
          ))}
        </div>
      </div>

      <div className="font-mono text-xs bg-zinc-950 p-4 rounded-xl border border-white/5 min-h-30 flex flex-col justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-500">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
            <span className="ml-2 text-gray-400">~/nexa-cli --run {activeTool}</span>
          </div>

          <p className="text-gray-300">
            &gt; Executing {activeTool} diagnostic on global Edge nodes...
          </p>

          {isRunning && (
            <p className="text-purple-400 animate-pulse">&gt; Processing payload...</p>
          )}

          {output && (
            <p className="text-emerald-400 font-semibold bg-emerald-950/30 p-2 rounded border border-emerald-500/20">
              {output}
            </p>
          )}
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="px-4 py-2 bg-white text-black hover:bg-gray-200 text-xs font-bold font-mono rounded-lg transition-all disabled:opacity-50"
          >
            {isRunning ? 'Running...' : 'Execute Test'}
          </button>
        </div>
      </div>
    </SpotlightCard>
  )
}