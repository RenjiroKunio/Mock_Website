'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function LandingNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">N</span>
          </div>
          <span className="text-lg font-bold text-gray-900">NAVARA</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Features</a>
          <a href="#how-it-works" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">How It Works</a>
          <a href="#why-navara" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">About</a>
          <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Dashboard</Link>
          <Link
            href="/dashboard"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-50"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-3">
          <a href="#features" className="block text-sm text-gray-600">Features</a>
          <a href="#how-it-works" className="block text-sm text-gray-600">How It Works</a>
          <a href="#why-navara" className="block text-sm text-gray-600">About</a>
          <Link href="/dashboard" className="block text-sm text-gray-600">Dashboard</Link>
          <Link href="/dashboard" className="block bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-xl text-center">
            Get Started
          </Link>
        </div>
      )}
    </nav>
  )
}
