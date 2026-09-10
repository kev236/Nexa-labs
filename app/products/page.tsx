import { getProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import FadeIn from "@/components/FadeIn";

export const metadata = {
  title: "Products | Nexa Labs",
  description: "Explore the growing ecosystem of software products by Nexa Labs.",
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 min-h-screen">
      <FadeIn>
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h1>
          <p className="text-xl text-gray-400 max-w-2xl">
            Focused tools designed to solve specific problems effortlessly.
          </p>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <FadeIn key={product.id} delay={index * 0.1}>
            <ProductCard product={product} />
          </FadeIn>
        ))}
      </div>
    </div>
  );
}