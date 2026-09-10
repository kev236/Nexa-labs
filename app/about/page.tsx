import FadeIn from "@/components/FadeIn";

export const metadata = {
  title: "About | Nexa Labs",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20 min-h-screen">
      <FadeIn>
        <h1 className="text-4xl md:text-5xl font-bold mb-12">About Nexa Labs</h1>
        
        <div className="space-y-12 text-lg text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Our Mission</h2>
            <p>
              Software has become too complicated. At Nexa Labs, our mission is to reverse this trend. 
              We build simple, focused tools that solve real-world problems without the steep learning curves or unnecessary bloat.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">How We Work</h2>
            <p className="mb-4">
              We operate as a premium software studio. Instead of trying to build one massive platform that does everything poorly, we build a portfolio of distinct, independent products that do one thing exceptionally well.
            </p>
            <p>
              When a feature doesn't serve the core purpose of a product, we don't build it. This ruthless prioritization keeps our software fast, reliable, and intuitive.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">The Vision</h2>
            <p>
              We are assembling a connected ecosystem of SaaS products, developer utilities, and AI tools. Each product stands alone, but together they represent a new standard for how business software should feel.
            </p>
          </section>
        </div>
      </FadeIn>
    </div>
  );
}