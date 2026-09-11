import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nexalabs.tech'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Nexa Labs — Small software. Big impact.',
    template: '%s | Nexa Labs',
  },
  description:
    'Nexa Labs builds simple software products that solve real-world problems.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    title: 'Nexa Labs — Small software. Big impact.',
    description:
      'Nexa Labs builds simple software products that solve real-world problems.',
    siteName: 'Nexa Labs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nexa Labs — Small software. Big impact.',
    description:
      'Nexa Labs builds simple software products that solve real-world problems.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable} data-scroll-behavior="smooth">
      <body className="bg-zinc-950 text-zinc-100 min-h-screen font-sans antialiased selection:bg-purple-500/20 selection:text-purple-200 flex flex-col">
        <Navbar />
        <main className="grow">{children}</main>
        <Footer />

        {/* Vercel Analytics & Speed Insights */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}