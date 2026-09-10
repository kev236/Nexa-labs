import { getProductBySlug, getProducts } from '@/data/products'
import { urlFor } from '@/lib/sanity'
import WaitlistForm from '@/components/WaitlistForm'
import Image from 'next/image'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const products = await getProducts()
  return products.map((product) => ({ slug: product.slug }))
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const isComingSoon = product.status === 'coming-soon' || product.status === 'beta'

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          {product.image && (
            <div className="relative h-80 w-full rounded-2xl overflow-hidden border border-gray-800">
              <Image
                src={urlFor(product.image).url()}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>

        <div>
          <span className="text-xs uppercase tracking-wider text-purple-400 font-semibold">
            {product.status || 'Live'}
          </span>
          <h1 className="text-4xl font-bold mt-2 text-white">{product.name}</h1>
          <p className="text-gray-400 mt-4">{product.description}</p>

          <div className="mt-6">
            <span className="text-3xl font-extrabold text-white">
              {product.price ? `€${product.price}` : 'Op aanvraag'}
            </span>
          </div>

          {product.features && product.features.length > 0 && (
            <ul className="mt-6 space-y-2">
              {product.features.map((feature, idx) => (
                <li key={idx} className="flex items-center text-gray-300 text-sm">
                  <span className="mr-2 text-purple-500">✓</span> {feature}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-8">
            {isComingSoon ? (
              <div>
                <p className="text-sm text-gray-400 font-medium mb-2">
                  Dit product is momenteel in ontwikkeling. Schrijf je in voor vroege toegang:
                </p>
                <WaitlistForm productName={product.name} />
              </div>
            ) : (
              <a
                href={`/contact?product=${encodeURIComponent(product.name)}`}
                className="inline-block w-full text-center bg-purple-600 hover:bg-purple-500 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Aanvragen / Bestellen
              </a>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}