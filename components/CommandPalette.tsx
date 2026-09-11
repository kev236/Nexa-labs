'use client'

import React, { useEffect, useState } from 'react'
import { Command } from 'cmdk'
import { useRouter } from 'next/navigation'

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const router = RouterHook()

  function RouterHook() {
    return useRouter()
  }

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  if (!open) return null

  const runCommand = (command: () => void) => {
    setOpen(false)
    command()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <Command className="w-full max-w-xl bg-gray-950 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <div className="border-b border-white/10 px-4 py-3 flex items-center gap-2">
          <Command.Input
            placeholder="Typ een commando of zoek een pagina..."
            className="w-full bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none"
          />
          <kbd className="text-[10px] font-mono bg-white/10 text-gray-400 px-2 py-0.5 rounded">ESC</kbd>
        </div>

        <Command.List className="p-2 max-h-80 overflow-y-auto space-y-1 text-sm text-gray-300">
          <Command.Empty className="p-4 text-xs text-gray-500 text-center">Geen resultaten gevonden.</Command.Empty>

          <Command.Group heading="Pagina's" className="text-[10px] font-mono text-purple-400 uppercase px-2 py-1">
            <Command.Item
              onSelect={() => runCommand(() => router.push('/'))}
              className="p-2.5 rounded-lg hover:bg-purple-900/30 hover:text-white cursor-pointer flex justify-between"
            >
              <span>Home</span>
              <span className="text-xs text-gray-500">/</span>
            </Command.Item>
            <Command.Item
              onSelect={() => runCommand(() => router.push('/products'))}
              className="p-2.5 rounded-lg hover:bg-purple-900/30 hover:text-white cursor-pointer flex justify-between"
            >
              <span>Producten</span>
              <span className="text-xs text-gray-500">/products</span>
            </Command.Item>
            <Command.Item
              onSelect={() => runCommand(() => router.push('/about'))}
              className="p-2.5 rounded-lg hover:bg-purple-900/30 hover:text-white cursor-pointer flex justify-between"
            >
              <span>Over Nexa Labs</span>
              <span className="text-xs text-gray-500">/about</span>
            </Command.Item>
            <Command.Item
              onSelect={() => runCommand(() => router.push('/contact'))}
              className="p-2.5 rounded-lg hover:bg-purple-900/30 hover:text-white cursor-pointer flex justify-between"
            >
              <span>Contact</span>
              <span className="text-xs text-gray-500">/contact</span>
            </Command.Item>
          </Command.Group>

          <Command.Group heading="Producten" className="text-[10px] font-mono text-purple-400 uppercase px-2 py-1 mt-2">
            <Command.Item
              onSelect={() => runCommand(() => router.push('/products/siteaudit'))}
              className="p-2.5 rounded-lg hover:bg-purple-900/30 hover:text-white cursor-pointer flex justify-between"
            >
              <span>SiteAudit</span>
              <span className="text-xs text-gray-500">SEO Audit Tool</span>
            </Command.Item>
            <Command.Item
              onSelect={() => runCommand(() => router.push('/products/quoteflow'))}
              className="p-2.5 rounded-lg hover:bg-purple-900/30 hover:text-white cursor-pointer flex justify-between"
            >
              <span>QuoteFlow</span>
              <span className="text-xs text-gray-500">Offerte Automatisering</span>
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  )
}