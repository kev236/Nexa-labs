import type { ComponentProps } from 'react'
import { client } from '@/lib/sanity'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { ptComponents } from '@/components/PortableTextComponents'

type LegalPageDoc = {
  title: string
  lastUpdated?: string
  content?: ComponentProps<typeof PortableText>['value']
}

export async function generateStaticParams() {
  const pages = await client.fetch<{ slug: string }[]>(`*[_type == "legal"]{ "slug": slug.current }`)
  return pages.map((page) => ({ slug: page.slug }))
}

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
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