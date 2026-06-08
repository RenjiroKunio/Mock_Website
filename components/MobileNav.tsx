'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navItems = [
  { label: 'Dashboard', href: '/dashboard', emoji: '📊' },
  { label: 'Trips', href: '/trip', emoji: '✈️' },
  { label: 'Itinerary', href: '/itinerary', emoji: '📅' },
  { label: 'Destinations', href: '/destinations', emoji: '🗺️' },
  { label: 'AI Budget', href: '/ai-budget', emoji: '🤖' },
  { label: 'Deals', href: '/deals', emoji: '🏷️' },
  { label: 'Expenses', href: '/expenses', emoji: '💳' },
  { label: 'Settlement', href: '/settlement', emoji: '⚖️' },
  { label: 'Analytics', href: '/analytics', emoji: '📈' },
  { label: 'Settings', href: '/settings', emoji: '⚙️' },
]

type MobileNavProps = {
  userName?: string
  userRole?: string
}

export default function MobileNav({ userName = 'Renjiro', userRole = 'Premium User' }: MobileNavProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-40 p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
      >
        <span className="text-xl">{isOpen ? '✕' : '☰'}</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-30" onClick={() => setIsOpen(false)} />
      )}

      <nav
        className={`fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-100 z-40 transform transition-transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <span className="text-xl font-bold text-gray-900">NAVARA</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-700 font-semibold'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span className="text-base">{item.emoji}</span>
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* User card */}
          <div className="px-4 py-4 border-t border-gray-100">
            <div className="flex items-center gap-3 px-3 py-3 bg-gray-50 rounded-2xl">
              <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center shrink-0">
                <span className="text-white text-sm font-semibold">
                  {userName.slice(0, 2).toUpperCase()}
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{userName}</p>
                <p className="text-xs text-gray-500 truncate">{userRole}</p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
