'use client'

import { useState } from 'react'
import SpotlightCard from './SpotlightCard'

type ToolKey = 'siteaudit' | 'quoteflow' | 'invoicechaser'

export default function InteractiveDemo() {
  const [activeTool, setActiveTool] = useState<ToolKey>('siteaudit')
  const [isRunning, setIsRunning] = useState(false)
  const [output, setOutput] = useState<string | null>(null)

  const handleRun = () => {
    setIsRunning(true)
    setOutput(null)

    setTimeout(() => {
      setIsRunning(false)
      if (activeTool === 'siteaudit') {
        setOutput('🔍 Lighthouse: 99/100 | OG Tags: Verified | WCAG 2.1: Compliant | 0 Broken Links')
      } else if (activeTool === 'quoteflow') {
        setOutput('📄 Proposal #QF-8092 Generated | e-Signature: Active | Stripe Deposit Link: Ready')
      } else {
        setOutput('⚡ Escalation Triggered: Invoice #INV-1049 | Reminded via API | Late Fee +2.5% Applied')
      }
    }, 700)
  }

  return (
    <SpotlightCard className="p-6 md:p-8 rounded-2xl border border-zinc-800/80 bg-zinc-900/50 backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-zinc-800/60 pb-4">
        <div>
          <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">
            Live Architecture Sandbox
          </span>
          <h3 className="text-xl font-bold text-zinc-100">Test Nexa Micro-Tools</h3>
        </div>

        <div className="flex bg-zinc-950 p-1 rounded-lg border border-zinc-800">
          {(['siteaudit', 'quoteflow', 'invoicechaser'] as ToolKey[]).map((tool) => (
            <button
              key={tool}
              onClick={() => {
                setActiveTool(tool)
                setOutput(null)
              }}
              className={`px-3 py-1.5 text-xs font-mono rounded-md transition-colors ${
                activeTool === tool
                  ? 'bg-purple-600 text-white font-semibold shadow-[0_0_10px_rgba(168,85,247,0.4)]'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {tool === 'siteaudit' ? 'SiteAudit' : tool === 'quoteflow' ? 'QuoteFlow' : 'InvoiceChaser'}
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
            <span className="ml-2 text-zinc-400">~/nexa-cli --exec {activeTool}</span>
          </div>

          <p className="text-zinc-300">
            &gt; Executing {activeTool} edge micro-service...
          </p>

          {isRunning && (
            <p className="text-purple-400 animate-pulse">&gt; Processing payload on global edge nodes...</p>
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
            {isRunning ? 'Running Diagnostics...' : 'Run Simulation'}
          </button>
        </div>
      </div>
    </SpotlightCard>
  )
}