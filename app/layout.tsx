import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Navbar from '@/components/Navbar'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nexalabs.tech'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Nexa Labs | Premium Micro-Software Ecosystem',
    template: '%s | Nexa Labs',
  },
  description:
    'Autonomous, high-performance micro-software tools engineered for efficiency and clean digital workflows.',
  keywords: [
    'SaaS',
    'Micro-Software',
    'Next.js',
    'Sanity CMS',
    'Nexa Labs',
    'Productivity Tools',
  ],
  authors: [{ name: 'Nexa Labs' }],
  creator: 'Nexa Labs',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    title: 'Nexa Labs | Premium Micro-Software Ecosystem',
    description:
      'Autonomous, high-performance micro-software tools engineered for efficiency and clean digital workflows.',
    siteName: 'Nexa Labs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nexa Labs | Premium Micro-Software Ecosystem',
    description:
      'Autonomous, high-performance micro-software tools engineered for efficiency and clean digital workflows.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable} data-scroll-behavior="smooth">
      <body className="bg-zinc-950 text-zinc-100 min-h-screen font-sans antialiased selection:bg-purple-500/20 selection:text-purple-200">
        <div className="fixed inset-0 ambient-glow pointer-events-none z-0" />
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="grow">{children}</main>
        </div>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}