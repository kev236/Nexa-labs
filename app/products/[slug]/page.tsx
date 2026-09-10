import { products } from "@/data/products";
import { notFound } from "next/navigation";
import FadeIn from "@/components/FadeIn";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const Icon = product.icon;

  return (
    <div className="max-w-4xl mx-auto px-6 py-20 min-h-screen">
      <FadeIn>
        <Link href="/products" className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-12 transition-colors">
          <ArrowLeft size={16} className="mr-2" /> Back to Products
        </Link>
        
        <div className="flex items-center gap-6 mb-8">
          <div className="h-16 w-16 bg-accent/10 text-accent rounded-2xl flex items-center justify-center">
            <Icon size={32} />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold">{product.name}</h1>
            <span className="inline-block mt-2 text-sm font-semibold px-3 py-1 bg-surface text-gray-300 rounded-full border border-surfaceBorder">
              Status: {product.status}
            </span>
          </div>
        </div>

        <p className="text-2xl text-gray-300 mb-12">
          {product.description}
        </p>

        <div className="bg-surface border border-surfaceBorder rounded-2xl p-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            We are currently building and refining this product. Check back soon for early access.
          </p>
          <button disabled className="px-6 py-3 bg-white/10 text-gray-400 rounded-md font-semibold cursor-not-allowed">
            Join Waitlist (Coming Soon)
          </button>
        </div>
      </FadeIn>
    </div>
  );
}