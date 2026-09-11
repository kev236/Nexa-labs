'use client'

import { motion } from 'framer-motion'

export default function HeroVisual() {
  return (
    <div className="relative w-full h-85 md:h-100 flex items-center justify-center overflow-hidden rounded-2xl border border-gray-800/80 bg-gray-950/40 backdrop-blur-sm">
      <div className="absolute w-72 h-72 bg-purple-600/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Floating Product Node 1 */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-10 left-6 md:left-14 bg-gray-900/90 border border-gray-800 p-4 rounded-xl shadow-2xl backdrop-blur-md w-48 text-xs space-y-2 z-10"
      >
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse" />
          <span className="text-gray-300 font-medium">QuoteFlow</span>
        </div>
        <div className="h-1.5 bg-gray-800 rounded w-full" />
        <div className="h-1.5 bg-gray-800/80 rounded w-3/4" />
      </motion.div>

      {/* Floating Product Node 2 */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-10 right-6 md:right-14 bg-gray-900/90 border border-gray-800 p-4 rounded-xl shadow-2xl backdrop-blur-md w-52 text-xs space-y-2 z-10"
      >
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-purple-400" />
          <span className="text-gray-300 font-medium">InvoiceChaser</span>
        </div>
        <div className="h-1.5 bg-purple-950/60 border border-purple-800/40 rounded w-full" />
        <div className="h-1.5 bg-gray-800 rounded w-2/3" />
      </motion.div>

      {/* Center Engine Node */}
      <motion.div
        animate={{ scale: [0.98, 1.02, 0.98] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="bg-gray-900/95 border border-purple-500/30 p-6 rounded-2xl shadow-purple-950/20 shadow-2xl backdrop-blur-xl w-64 md:w-72 text-center space-y-3 z-20"
      >
        <div className="w-10 h-10 mx-auto rounded-lg bg-purple-900/30 border border-purple-500/40 flex items-center justify-center text-purple-400 font-semibold text-sm">
          NL
        </div>
        <h4 className="text-white text-sm font-semibold">Nexa Labs Core</h4>
        <p className="text-gray-400 text-xs">Modular software ecosystem.</p>
        <div className="flex justify-center gap-1.5 pt-1">
          <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
          <div className="w-1.5 h-1.5 rounded-full bg-purple-400/60" />
          <div className="w-1.5 h-1.5 rounded-full bg-purple-300/30" />
        </div>
      </motion.div>
    </div>
  )
}