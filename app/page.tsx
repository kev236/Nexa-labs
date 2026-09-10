import Link from "next/link";
import { getProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import FadeIn from "@/components/FadeIn";

export default async function Home() {
  const products = await getProducts();

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-6">
        {/* Abstract Background Animation */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-[20%] left-[20%] w-72 h-72 bg-accent rounded-full mix-blend-screen filter blur-[100px] animate-pulse" />
          <div className="absolute bottom-[20%] right-[20%] w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-[120px] animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <FadeIn>
            <span className="text-accent text-sm font-bold tracking-widest uppercase mb-6 block">Nexa Labs</span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-8 leading-tight">
              Small software.<br className="hidden md:block" /> Big impact.
            </h1>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              We build focused software products that make complicated things simple.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/products" className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-md font-semibold hover:bg-gray-200 transition-colors">
                Explore Products
              </Link>
              <Link href="/about" className="w-full sm:w-auto px-8 py-4 bg-surface border border-surfaceBorder text-white rounded-md font-semibold hover:bg-surfaceBorder transition-colors">
                About Nexa Labs
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-24 px-6 bg-surface/30">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Software built to solve real problems.</h2>
            <p className="text-gray-400 text-lg max-w-2xl mb-16">
              We create focused tools that are simple to understand, easy to use, and built to deliver results.
            </p>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.slice(0, 3).map((product, index) => (
              <FadeIn key={product.id} delay={index * 0.1}>
                <ProductCard product={product} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <FadeIn>
          <h2 className="text-3xl md:text-5xl font-bold mb-20 text-center">We build. We test. We improve.</h2>
        </FadeIn>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-px bg-surfaceBorder z-0" />
          
          {[
            { step: "01", title: "Build", desc: "We turn simple ideas into useful software." },
            { step: "02", title: "Test", desc: "We put our products in the hands of real users." },
            { step: "03", title: "Improve", desc: "We continuously improve the products that people love." }
          ].map((item, i) => (
            <FadeIn key={item.step} delay={i * 0.2} className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-surface border border-surfaceBorder flex items-center justify-center text-2xl font-bold text-accent mb-8">
                {item.step}
              </div>
              <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* About Overview */}
      <section className="py-24 px-6 bg-surface/50 border-y border-surfaceBorder">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Software without the unnecessary complexity.</h2>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              Nexa Labs creates focused software products designed around one simple idea: solve a problem, remove the friction, and make the result better.
            </p>
            <p className="text-lg text-gray-300 mb-10 leading-relaxed">
              We operate a growing portfolio of independent software products, AI tools, and developer utilities.
            </p>
            <Link href="/about" className="text-accent font-semibold hover:text-white transition-colors">
              Learn more about Nexa Labs &rarr;
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Vision / CTA Section */}
      <section className="py-32 px-6 relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">One problem at a time.</h2>
            <p className="text-xl text-gray-400 mb-12">
              We're building a growing ecosystem of small software products — each designed to solve a specific problem exceptionally well.
            </p>
            <h3 className="text-2xl font-semibold mb-6 mt-20">Find software that works for you.</h3>
            <p className="text-gray-400 mb-8">Explore the growing collection of products from Nexa Labs.</p>
            <Link href="/products" className="inline-block px-8 py-4 bg-accent text-white rounded-md font-semibold hover:bg-accent-dark transition-colors shadow-[0_0_30px_rgba(139,92,246,0.3)]">
              Explore Products
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}