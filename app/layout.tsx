import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BackgroundGlow from '@/components/BackgroundGlow'
import CommandPalette from '@/components/CommandPalette'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata = {
  title: 'Nexa Labs — Autonomous Micro-Software Ecosystem',
  description: 'We build focused, hyper-efficient tools designed to eliminate friction.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl">
      <body className="relative min-h-screen flex flex-col justify-between">
        <BackgroundGlow />
        <CommandPalette />
        <Navbar />
        <main className="grow">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}