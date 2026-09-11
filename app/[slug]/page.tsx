import { client } from '@/lib/sanity'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const pages = await client.fetch(`*[_type == "legal"]{ "slug": slug.current }`)
  return pages.map((page: { slug: string }) => ({ slug: page.slug }))
}

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = await client.fetch(
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
        {/* Render Sanity block content here or standard paragraphs */}
      </div>
    </main>
  )
}