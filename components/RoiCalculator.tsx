'use client'

import { useState } from 'react'
import SpotlightCard from './SpotlightCard'

export default function RoiCalculator() {
  const [monthlyClients, setMonthlyClients] = useState<number>(15)

  const hoursSaved = Math.round(monthlyClients * 2.5)
  const moneySaved = Math.round(hoursSaved * 75)

  return (
    <SpotlightCard className="p-6 md:p-8 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-xl">
      <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
        <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">
          Efficiency Estimator
        </span>
        <h3 className="text-2xl font-bold text-zinc-100">
          Calculate Your Saved Engineering & Admin Hours
        </h3>
        <p className="text-xs text-zinc-400">
          Automate proposals with QuoteFlow & recover overdue payments automatically with InvoiceChaser.
        </p>
      </div>

      <div className="max-w-xl mx-auto space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2 font-mono text-xs">
            <span className="text-zinc-400">Active Proposals & Invoices / Month:</span>
            <span className="text-purple-300 font-bold text-sm">{monthlyClients} documents</span>
          </div>
          <input
            type="range"
            min={5}
            max={80}
            value={monthlyClients}
            onChange={(e) => setMonthlyClients(Number(e.target.value))}
            className="w-full accent-purple-500 bg-zinc-800 h-2 rounded-lg cursor-pointer"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-800/60 text-center font-mono">
          <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800">
            <div className="text-2xl md:text-3xl font-extrabold text-purple-300">
              ~{hoursSaved} hrs
            </div>
            <div className="text-[11px] text-zinc-400 mt-1 uppercase">Time Saved / Month</div>
          </div>
          <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800">
            <div className="text-2xl md:text-3xl font-extrabold text-emerald-400">
              €{moneySaved.toLocaleString()}
            </div>
            <div className="text-[11px] text-zinc-400 mt-1 uppercase">Est. Value Saved</div>
          </div>
        </div>
      </div>
    </SpotlightCard>
  )
}