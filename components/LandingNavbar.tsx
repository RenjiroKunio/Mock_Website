'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function LandingNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">N</span>
          </div>
          <span className="text-base sm:text-lg font-bold text-gray-900">NAVARA</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <a href="#features" className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 transition-colors">Features</a>
          <a href="#how-it-works" className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 transition-colors">How It Works</a>
          <a href="#why-navara" className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 transition-colors">About</a>
          <Link href="/dashboard" className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 transition-colors">Dashboard</Link>
          <Link
            href="/dashboard"
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold px-3 sm:px-4 py-2 rounded-xl transition-colors"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-50 shrink-0"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 sm:px-6 py-3 space-y-2">
          <a href="#features" onClick={() => setMobileOpen(false)} className="block text-xs sm:text-sm text-gray-600 py-2">Features</a>
          <a href="#how-it-works" onClick={() => setMobileOpen(false)} className="block text-xs sm:text-sm text-gray-600 py-2">How It Works</a>
          <a href="#why-navara" onClick={() => setMobileOpen(false)} className="block text-xs sm:text-sm text-gray-600 py-2">About</a>
          <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="block text-xs sm:text-sm text-gray-600 py-2">Dashboard</Link>
          <Link href="/dashboard" className="block bg-blue-600 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl text-center">
            Get Started
          </Link>
        </div>
      )}
    </nav>
  )
}
