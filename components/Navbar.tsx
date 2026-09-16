'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Logo } from './Logo'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close the mobile menu on navigation. Adjusted during render (React's
  // documented pattern for "reset state when a prop changes") rather than
  // in an effect, which would call setState synchronously in the effect
  // body and trigger an extra cascading render.
  const [prevPathname, setPrevPathname] = useState(pathname)
  if (pathname !== prevPathname) {
    setPrevPathname(pathname)
    setMobileMenuOpen(false)
  }

  const navLinks = [
    { name: 'Products', href: '/#products' },
    { name: 'Catalog', href: '/products' },
    { name: 'Blog', href: '/blog' },
    { name: 'Changelog', href: '/changelog' },
    { name: 'About', href: '/#story' },
    { name: 'Contact', href: '/#contact' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Logo
            markSize={32}
            wordmarkClassName="font-bold tracking-wider text-sm text-zinc-100 group-hover:text-purple-300 transition-colors"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="hover:text-zinc-100 transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/products"
            className="px-4 py-2 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 transition-all text-xs font-mono"
          >
            Explore Products
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-zinc-400 hover:text-zinc-100 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-zinc-950 border-b border-zinc-800 p-6 flex flex-col gap-5 shadow-2xl">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-zinc-300 text-base font-medium"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/products"
            className="w-full text-center px-4 py-3 rounded-lg bg-purple-600 text-white font-medium text-sm"
          >
            Explore Products
          </Link>
        </div>
      )}
    </header>
  )
}