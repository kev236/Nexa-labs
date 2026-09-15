import Image from 'next/image'
import { Star } from 'lucide-react'
import { client, urlFor } from '@/lib/sanity'
import type { SanityImageSource } from '@sanity/image-url'
import FadeIn from '@/components/FadeIn'
import SpotlightCard from '@/components/SpotlightCard'

type Testimonial = {
  _id: string
  quote: string
  authorName: string
  authorRole?: string
  company?: string
  avatar?: SanityImageSource
  rating?: number
}

async function getTestimonials(): Promise<Testimonial[]> {
  return client.fetch<Testimonial[]>(
    `*[_type == "testimonial"] | order(_createdAt desc) { _id, quote, authorName, authorRole, company, avatar, rating }`
  )
}

// Real customer quotes only — never a placeholder testimonial. Until at
// least one is published in Sanity (Trust & Social Proof → Testimonials),
// this section renders nothing rather than showing an empty "what our
// customers say" block or a fabricated one.
export default async function Testimonials() {
  const testimonials = await getTestimonials().catch(() => [])
  if (testimonials.length === 0) return null

  return (
    <section className="py-20 px-6 bg-zinc-950/60 border-y border-zinc-900">
      <div className="max-w-6xl mx-auto space-y-12">
        <FadeIn direction="up">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-purple-400 uppercase border border-purple-500/30 bg-purple-950/40 px-3 py-1 rounded-full inline-block">
              Trusted by early users
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-100">What people are saying.</h2>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <FadeIn key={t._id} delay={i * 0.1} direction="up">
              <SpotlightCard className="h-full flex flex-col gap-4 p-6 rounded-2xl border border-zinc-800/80 bg-zinc-900/30">
                {t.rating && (
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < t.rating! ? 'fill-purple-400 text-purple-400' : 'text-zinc-700'}
                      />
                    ))}
                  </div>
                )}
                <p className="text-sm text-zinc-300 leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3 pt-2 border-t border-zinc-800/60">
                  {t.avatar && (
                    <Image
                      src={urlFor(t.avatar).width(72).height(72).url()}
                      alt={t.authorName}
                      width={36}
                      height={36}
                      className="rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="text-sm font-semibold text-zinc-100">{t.authorName}</p>
                    {(t.authorRole || t.company) && (
                      <p className="text-xs text-zinc-500">
                        {[t.authorRole, t.company].filter(Boolean).join(', ')}
                      </p>
                    )}
                  </div>
                </div>
              </SpotlightCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
