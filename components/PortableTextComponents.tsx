import { PortableTextComponents } from '@portabletext/react'

// Every page that renders this (blog posts, changelog entries, legal
// pages) already has its own real <h1> — the page title, rendered by
// the page template above where this content starts. Sanity's "H1"
// block style used to map straight to an <h1> tag, so any editor who
// picked that style in the CMS produced a second <h1> on the page — a
// real heading-structure bug (WCAG 1.3.1 / one <h1> per page), not just
// a style choice. Shifted down one level (H1 style -> <h2> tag, etc.)
// so CMS content nests under the page's real h1 instead of competing
// with it; same visual sizes as before, just correct tags.
export const ptComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h2 className="text-3xl font-extrabold text-zinc-100 mt-10 mb-4">{children}</h2>
    ),
    h2: ({ children }) => (
      <h3 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">{children}</h3>
    ),
    h3: ({ children }) => (
      <h4 className="text-xl font-bold text-purple-300 mt-6 mb-3">{children}</h4>
    ),
    h4: ({ children }) => (
      <h5 className="text-lg font-semibold text-zinc-200 mt-4 mb-2">{children}</h5>
    ),
    normal: ({ children }) => (
      <p className="text-zinc-300 leading-relaxed mb-4 text-sm md:text-base">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-purple-500/80 pl-4 my-6 italic text-zinc-400 bg-zinc-900/40 py-3 pr-4 rounded-r-lg text-sm">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 mb-4 text-zinc-300 text-sm">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 mb-4 text-zinc-300 text-sm">{children}</ol>
    ),
  },
  marks: {
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-purple-400 hover:text-purple-300 underline transition-colors"
      >
        {children}
      </a>
    ),
  },
}