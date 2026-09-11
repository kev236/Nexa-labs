'use client'

import { useState } from 'react'

interface InteractiveDemoProps {
  slug: string
  productName: string
}

export default function InteractiveDemo({ slug, productName }: InteractiveDemoProps) {
  // SiteAudit Demo State
  const [urlInput, setUrlInput] = useState('')
  const [auditStatus, setAuditStatus] = useState<'idle' | 'scanning' | 'complete'>('idle')
  const [scanProgress, setScanProgress] = useState(0)

  // QuoteFlow Demo State
  const [projectType, setProjectType] = useState('SaaS MVP')
  const [featuresCount, setFeaturesCount] = useState(3)
  const [estimatedPrice, setEstimatedPrice] = useState(3500)

  // Handle SiteAudit Scan Simulation
  const handleStartAudit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!urlInput) return

    setAuditStatus('scanning')
    setScanProgress(15)

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval)
          setAuditStatus('complete')
          return 100
        }
        return prev + 20
      })
    }, 400)
  }

  // Handle QuoteFlow Slider Change
  const handleFeatureChange = (val: number) => {
    setFeaturesCount(val)
    setEstimatedPrice(1500 + val * 650)
  }

  return (
    <div className="border border-purple-500/20 bg-black/40 backdrop-blur-xl rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse" />
          <h3 className="text-sm font-mono text-purple-300 uppercase tracking-wider">
            Interactive Live Sandbox — {productName}
          </h3>
        </div>
        <span className="text-[11px] font-mono text-gray-500 bg-white/5 px-2.5 py-1 rounded-md">
          SIMULATOR
        </span>
      </div>

      {/* DEMO 1: SITEAUDIT (SEO / PERFORMANCE SCANNER) */}
      {slug === 'siteaudit' && (
        <div className="space-y-6">
          {auditStatus === 'idle' && (
            <form onSubmit={handleStartAudit} className="space-y-4">
              <label className="block text-xs font-mono text-gray-400">
                ENTER YOUR WEBSITE URL TO RUN A REAL-TIME PREVIEW SCAN:
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="url"
                  required
                  placeholder="https://yourwebsite.com"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="grow bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                />
                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-500 text-white font-medium px-6 py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] text-sm whitespace-nowrap"
                >
                  Run Instant Audit
                </button>
              </div>
            </form>
          )}

          {auditStatus === 'scanning' && (
            <div className="space-y-4 py-4">
              <div className="flex justify-between text-xs font-mono text-gray-400">
                <span>Analyzing DOM tree, LCP, CLS & OpenGraph metadata...</span>
                <span>{scanProgress}%</span>
              </div>
              <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden border border-white/10">
                <div
                  className="bg-purple-500 h-full transition-all duration-300"
                  style={{ width: `${scanProgress}%` }}
                />
              </div>
            </div>
          )}

          {auditStatus === 'complete' && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                  <div className="text-2xl font-bold text-emerald-400">94/100</div>
                  <div className="text-[11px] font-mono text-gray-400 mt-1">SEO Health</div>
                </div>
                <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                  <div className="text-2xl font-bold text-yellow-400">78/100</div>
                  <div className="text-[11px] font-mono text-gray-400 mt-1">Performance</div>
                </div>
                <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl">
                  <div className="text-2xl font-bold text-purple-400">3 Issues</div>
                  <div className="text-[11px] font-mono text-gray-400 mt-1">Found</div>
                </div>
              </div>

              <div className="p-4 bg-purple-950/30 border border-purple-500/30 rounded-xl flex items-center justify-between gap-4">
                <div className="text-xs text-gray-300">
                  <span className="font-semibold text-white">Full report generated!</span> Get automated weekly audits for <span className="text-purple-300 font-mono">{urlInput}</span>.
                </div>
                <button
                  onClick={() => {
                    document.getElementById('waitlist-section')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="bg-white text-black font-semibold text-xs px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap"
                >
                  Unlock Full Report
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* DEMO 2: QUOTEFLOW (AUTOMATED PROPOSAL CALCULATOR) */}
      {slug === 'quoteflow' && (
        <div className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-mono text-gray-400">PROJECT SCOPE</label>
              <select
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
              >
                <option value="SaaS MVP" className="bg-gray-900">SaaS Web Application</option>
                <option value="Mobile App" className="bg-gray-900">Mobile Native App</option>
                <option value="AI Workflow" className="bg-gray-900">AI Automation Tool</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-gray-400">
                MODULES / INTEGRATIONS ({featuresCount})
              </label>
              <input
                type="range"
                min="1"
                max="8"
                value={featuresCount}
                onChange={(e) => handleFeatureChange(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer mt-3"
              />
            </div>
          </div>

          <div className="p-4 bg-white/3 border border-white/10 rounded-xl flex items-center justify-between">
            <div>
              <div className="text-xs font-mono text-gray-400">ESTIMATED PROPOSAL VALUE</div>
              <div className="text-2xl font-bold text-white mt-0.5">€{estimatedPrice.toLocaleString()}</div>
            </div>
            <button
              onClick={() => {
                document.getElementById('waitlist-section')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs px-5 py-2.5 rounded-xl transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)]"
            >
              Generate Live Quote PDF
            </button>
          </div>
        </div>
      )}

      {/* DEMO 3: GENERIC FALLBACK FOR OTHER PRODUCTS */}
      {slug !== 'siteaudit' && slug !== 'quoteflow' && (
        <div className="p-6 bg-white/3 border border-white/5 rounded-xl text-center space-y-4">
          <p className="text-sm text-gray-400">
            Interactive sandbox for <strong>{productName}</strong> is currently compiling in our preview environment.
          </p>
          <button
            onClick={() => {
              document.getElementById('waitlist-section')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="inline-block text-xs font-mono text-purple-400 hover:text-purple-300 underline"
          >
            Get early beta access to test this product →
          </button>
        </div>
      )}
    </div>
  )
}