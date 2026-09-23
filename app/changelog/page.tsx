import type { Metadata } from 'next'
import { PortableText } from '@portabletext/react'
import { ptComponents } from '@/components/PortableTextComponents'
import { getChangelog } from '@/data/changelog'

export const metadata: Metadata = {
  title: 'Changelog',
  description:
    'New updates, improvements, and architectural changes from the Nexa Labs engineering team.',
  openGraph: {
    title: 'Changelog | Nexa Labs',
    description:
      'New updates, improvements, and architectural changes from the Nexa Labs engineering team.',
  },
  twitter: {
    title: 'Changelog | Nexa Labs',
    description:
      'New updates, improvements, and architectural changes from the Nexa Labs engineering team.',
  },
}

export const revalidate = 60

export default async function ChangelogPage() {
  const logs = await getChangelog()

  return (
    <div className="max-w-4xl mx-auto px-6 py-20 min-h-screen">
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
          Changelog
        </h1>
        <p className="text-gray-400">
          New updates, improvements, and architectural changes from the Nexa Labs engineering team.
        </p>
      </div>

      {logs.length === 0 ? (
        <p className="text-gray-500 font-mono text-sm">No updates published yet.</p>
      ) : (
        <div className="relative border-l border-white/10 pl-8 md:pl-10 space-y-16 ml-2 md:ml-4">
          {logs.map((log) => (
            <div key={log._id} className="relative">
              <div className="absolute -left-10.25 md:-left-12.25 top-1 w-4 h-4 bg-black border-2 border-purple-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
              
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="text-sm font-mono text-gray-400">
                  {log.releaseDate}
                </span>
                {log.version && (
                  <span className="text-xs font-mono bg-white/5 border border-white/10 text-gray-300 px-2 py-0.5 rounded-md">
                    {log.version}
                  </span>
                )}
                <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${
                  log.type === 'Feature' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                  log.type === 'Fix' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                  log.type === 'Improvement' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                  'bg-blue-500/10 text-blue-400 border-blue-500/20'
                }`}>
                  {log.type}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-white mb-4">{log.title}</h2>
              <div className="text-gray-300 leading-relaxed max-w-3xl">
                {log.content && <PortableText value={log.content} components={ptComponents} />}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}