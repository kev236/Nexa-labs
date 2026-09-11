import { PortableTextComponents } from '@portabletext/react'

export const ptComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-3xl font-extrabold text-zinc-100 mt-10 mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold text-purple-300 mt-6 mb-3">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-semibold text-zinc-200 mt-4 mb-2">{children}</h4>
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