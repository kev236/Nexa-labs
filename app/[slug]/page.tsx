import type { ComponentProps } from 'react'
import type { Metadata } from 'next'
import { client } from '@/lib/sanity'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { ptComponents } from '@/components/PortableTextComponents'

type LegalPageDoc = {
  title: string
  lastUpdated?: string
  content?: ComponentProps<typeof PortableText>['value']
}

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const pages = await client.fetch<{ slug: string }[]>(`*[_type == "legal"]{ "slug": slug.current }`)
  return pages.map((page) => ({ slug: page.slug }))
}

// Was missing entirely — every legal page (Privacy Policy, Terms &
// Conditions, Cookie Policy) rendered with the root layout's generic
// homepage title/description as its <title>/meta description, both in
// the browser tab and in search results. Real title, no invented copy.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = await client.fetch<Pick<LegalPageDoc, 'title'> | null>(
    `*[_type == "legal" && slug.current == $slug][0]{ title }`,
    { slug }
  )
  if (!page) return { title: 'Not Found' }
  return { title: page.title, robots: { index: true, follow: true } }
}

export default async function LegalPage({ params }: Props) {
  const { slug } = await params
  const page = await client.fetch<LegalPageDoc | null>(
    `*[_type == "legal" && slug.current == $slug][0]{ title, lastUpdated, content }`,
    { slug }
  )

  if (!page) notFound()

  return (
    <main className="max-w-3xl mx-auto px-6 py-20 text-gray-300">
      <h1 className="text-4xl font-bold text-white mb-2">{page.title}</h1>
      {page.lastUpdated && (
        <p className="text-xs text-gray-500 mb-8">Laatst bijgewerkt: {page.lastUpdated}</p>
      )}
      <div className="prose prose-invert max-w-none">
        {page.content ? (
          <PortableText value={page.content} components={ptComponents} />
        ) : (
          <p className="text-gray-500 italic">Deze pagina heeft nog geen inhoud.</p>
        )}
      </div>
    </main>
  )
}