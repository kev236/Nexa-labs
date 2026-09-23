import Link from 'next/link'
import type { Metadata } from 'next'
import FadeIn from '@/components/FadeIn'
import ApiAccessRequestForm from '@/components/ApiAccessRequestForm'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Clip Scoring API — Nexa Labs',
  description:
    "Score a short-form clip's virality and copyright risk before spending time editing it. One API call, real reasoning.",
}

/**
 * A static route at the same segment `[slug]` would otherwise catch —
 * Next.js matches this exact path first, so the generic product template
 * (with its unverified "Sub-15ms Edge" stat tiles) never renders it. The
 * API itself is served by Nexa AI's own backend, not this site — this
 * page is the storefront: it captures the lead, the owner issues the key
 * manually from Nexa AI's admin dashboard once contact is made.
 */
const EXAMPLE_REQUEST = `curl https://<your-api-domain>/api/v1/score-clip \\
  -H "Authorization: Bearer nexa_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "sourceDescription": "Streamer reacts live to finding out they won the lottery",
    "sourceUrl": "https://twitch.tv/..."
  }'`

const EXAMPLE_RESPONSE = `{
  "title": "He Just Found Out LIVE",
  "viralityScore": 87,
  "copyrightRisk": "medium",
  "copyrightNotes": "Streamer's own footage, likely fine with credit
    and a fair-use reaction framing — confirm license terms.",
  "captions": [
    { "platform": "tiktok", "caption": "wait for his reaction",
      "hashtags": ["fyp", "viral", "reaction"] }
  ],
  "recommendation": "REPOST",
  "reasoning": "Clear hook, genuine surprise, strong payoff in
    under 3 seconds — high retention potential.",
  "confidence": 0.82
}`

const FEATURES = [
  'Virality score (0–100) for a short-form clip, from a description and optional source URL',
  'Copyright-risk read with real reasoning, not a keyword flag',
  'Draft captions and hashtags per platform (YouTube, TikTok, Instagram)',
  'Plain-English repost/skip recommendation with a confidence score',
]

export default function ClipScoringApiPage() {
  return (
    <div className="pt-32 pb-24 px-6 max-w-5xl mx-auto w-full min-h-screen space-y-16">
      <FadeIn direction="up">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-purple-400 transition-colors mb-8"
        >
          <ArrowLeft size={14} /> Back to Ecosystem
        </Link>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono tracking-widest uppercase px-3 py-1 rounded-full bg-purple-950/50 border border-purple-500/30 text-purple-300">
                Developer Tools
              </span>
              <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-0.5 rounded bg-emerald-950/40 border border-emerald-500/20 text-emerald-400">
                Beta
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-100 tracking-tight">
              Clip Scoring API
            </h1>

            <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
              Know if a clip is worth editing before you edit it. One API call scores a short-form
              clip on virality potential and copyright risk, and drafts a caption for YouTube,
              TikTok, and Instagram — the same evaluation a real repost business runs on every clip
              it considers, before spending an hour cutting something nobody watches.
            </p>

            <div className="pt-6 border-t border-zinc-800/80 space-y-3">
              <h3 className="text-xs font-mono text-purple-400 uppercase tracking-widest">
                What you get back
              </h3>
              <div className="grid gap-2.5">
                {FEATURES.map((feature) => (
                  <div key={feature} className="flex items-start gap-3 text-xs font-mono text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-800/80 space-y-3">
              <h3 className="text-xs font-mono text-purple-400 uppercase tracking-widest">
                Request / response
              </h3>
              <div className="grid gap-4">
                <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/60 overflow-x-auto">
                  <p className="text-[10px] font-mono text-zinc-500 uppercase mb-2">Request</p>
                  <pre className="text-xs font-mono text-zinc-300 whitespace-pre">{EXAMPLE_REQUEST}</pre>
                </div>
                <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/60 overflow-x-auto">
                  <p className="text-[10px] font-mono text-zinc-500 uppercase mb-2">Response</p>
                  <pre className="text-xs font-mono text-zinc-300 whitespace-pre">{EXAMPLE_RESPONSE}</pre>
                </div>
              </div>
              <p className="text-[11px] text-zinc-500 font-mono">
                The real base URL is sent with your key when access is set up — the endpoint above
                is a placeholder, not a live host.
              </p>
            </div>

            <div className="pt-6 border-t border-zinc-800/80 space-y-3">
              <h3 className="text-xs font-mono text-purple-400 uppercase tracking-widest">
                How it works
              </h3>
              <ol className="grid gap-2 text-xs font-mono text-zinc-300 list-decimal list-inside">
                <li>Request access below — tell us what you&apos;d use it for.</li>
                <li>We reply by email and set up billing directly, no card form on this site.</li>
                <li>You get an API key — one header, one endpoint, real answers.</li>
              </ol>
            </div>
          </div>

          <div className="lg:col-span-5">
            <ApiAccessRequestForm />
          </div>
        </div>
      </FadeIn>
    </div>
  )
}
