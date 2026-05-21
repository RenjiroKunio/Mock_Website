'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import PageHeader from '@/components/PageHeader'
import Notification from '@/components/Notification'
import { attractions } from '@/lib/data'

type Category = 'All' | 'Culture' | 'Landmark' | 'Food' | 'Nature' | 'Shopping'
type BudgetStyle = 'All' | 'Budget' | 'Mid-range' | 'Premium'

const mockPins = [
  { id: 1, top: '30%', left: '40%', label: 'Louvre', emoji: '🏛️' },
  { id: 2, top: '45%', left: '55%', label: 'Eiffel', emoji: '🗼' },
  { id: 3, top: '60%', left: '35%', label: 'Market', emoji: '🍢' },
  { id: 4, top: '25%', left: '65%', label: 'Beach', emoji: '🌅' },
  { id: 5, top: '50%', left: '25%', label: 'Tour', emoji: '🎭' },
  { id: 6, top: '70%', left: '60%', label: 'Night Mkt', emoji: '🌃' },
]

export default function DestinationsPage() {
  const [category, setCategory] = useState<Category>('All')
  const [budgetStyle, setBudgetStyle] = useState<BudgetStyle>('All')
  const [itinerary, setItinerary] = useState<number[]>([])
  const [notification, setNotification] = useState<string | null>(null)
  const [selectedPin, setSelectedPin] = useState<number | null>(null)

  const filtered = attractions.filter((a) => {
    const catOk = category === 'All' || a.category === category
    const budgetOk = budgetStyle === 'All' || a.budgetStyle === budgetStyle
    return catOk && budgetOk
  })

  function addToItinerary(id: number, name: string) {
    if (!itinerary.includes(id)) {
      setItinerary([...itinerary, id])
      setNotification(`${name} added to itinerary!`)
    }
  }

  return (
    <DashboardLayout userName="Renjiro" userRole="Trip Organizer">
      <PageHeader
        title="Destinations & Attractions"
        subtitle="Explore local attractions, filter by budget, and plan your itinerary"
        action={
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors">
            🗺️ View Deals Nearby
          </button>
        }
      />

      {/* Filters */}
      <div className="px-8 mb-6">
        <div className="flex flex-wrap gap-3">
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-medium text-gray-500 self-center mr-1">Category:</span>
            {(['All', 'Culture', 'Landmark', 'Food', 'Nature', 'Shopping'] as Category[]).map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`text-xs font-medium px-3 py-1.5 rounded-xl transition-colors ${
                  category === c ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-blue-300'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mt-1">
            <span className="text-xs font-medium text-gray-500 self-center mr-1">Budget:</span>
            {(['All', 'Budget', 'Mid-range', 'Premium'] as BudgetStyle[]).map((b) => (
              <button
                key={b}
                onClick={() => setBudgetStyle(b)}
                className={`text-xs font-medium px-3 py-1.5 rounded-xl transition-colors ${
                  budgetStyle === b ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-blue-300'
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-8 pb-8 grid lg:grid-cols-5 gap-6">
        {/* Mock Map */}
        <div className="lg:col-span-3">
          <div className="relative bg-gradient-to-br from-green-100 via-blue-50 to-green-200 rounded-2xl border border-gray-200 shadow-sm overflow-hidden" style={{ minHeight: '420px' }}>
            {/* Map texture */}
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 39px, #93c5fd 39px, #93c5fd 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, #93c5fd 39px, #93c5fd 40px)'
            }} />

            {/* Map label */}
            <div className="absolute top-4 left-4 bg-white/80 backdrop-blur rounded-xl px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm">
              🗺️ Bali, Indonesia — Interactive Map
            </div>

            {/* Scale indicator */}
            <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur rounded-xl px-3 py-1.5 text-xs text-gray-500 shadow-sm">
              Scale: 1km
            </div>

            {/* Pins */}
            {mockPins.map((pin) => (
              <button
                key={pin.id}
                onClick={() => setSelectedPin(selectedPin === pin.id ? null : pin.id)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
                style={{ top: pin.top, left: pin.left }}
              >
                <div className={`flex flex-col items-center gap-1 transition-transform hover:scale-110 ${selectedPin === pin.id ? 'scale-125' : ''}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-md border-2 ${
                    selectedPin === pin.id ? 'bg-blue-600 border-white' : 'bg-white border-blue-300'
                  }`}>
                    {pin.emoji}
                  </div>
                  <div className={`text-xs font-semibold px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap ${
                    selectedPin === pin.id ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
                  }`}>
                    {pin.label}
                  </div>
                </div>
              </button>
            ))}

            {/* Roads simulation */}
            <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
              <path d="M 0 200 Q 200 150 400 200 T 800 200" stroke="#94a3b8" strokeWidth="3" fill="none" />
              <path d="M 200 0 Q 250 200 200 400" stroke="#94a3b8" strokeWidth="2" fill="none" />
              <path d="M 0 300 Q 300 280 600 320" stroke="#94a3b8" strokeWidth="2" fill="none" />
            </svg>
          </div>

          {/* Itinerary summary */}
          {itinerary.length > 0 && (
            <div className="mt-4 bg-blue-50 border border-blue-100 rounded-2xl p-4">
              <p className="text-sm font-semibold text-blue-800 mb-2">📅 My Itinerary ({itinerary.length} places)</p>
              <div className="flex flex-wrap gap-2">
                {itinerary.map((id) => {
                  const a = attractions.find((x) => x.id === id)
                  return a ? (
                    <span key={id} className="text-xs bg-white border border-blue-200 text-blue-700 px-2 py-1 rounded-xl font-medium">
                      {a.emoji} {a.name}
                    </span>
                  ) : null
                })}
              </div>
            </div>
          )}
        </div>

        {/* Attraction Cards */}
        <div className="lg:col-span-2 space-y-3 max-h-[580px] overflow-y-auto pr-1">
          <p className="text-xs font-medium text-gray-500 sticky top-0 bg-gray-50 py-1">
            {filtered.length} attractions found
          </p>
          {filtered.map((a) => (
            <div key={a.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{a.emoji}</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{a.name}</p>
                    <p className="text-xs text-gray-500">{a.category} · {a.distance}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-gray-900">{a.priceRange}</p>
                  <p className="text-xs text-yellow-500">⭐ {a.rating}</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mb-3">{a.description}</p>
              <div className="flex items-center justify-between">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  a.budgetStyle === 'Budget' ? 'bg-green-100 text-green-700' :
                  a.budgetStyle === 'Mid-range' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-purple-100 text-purple-700'
                }`}>
                  {a.budgetStyle}
                </span>
                <button
                  onClick={() => addToItinerary(a.id, a.name)}
                  disabled={itinerary.includes(a.id)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition-colors ${
                    itinerary.includes(a.id)
                      ? 'bg-green-100 text-green-700 cursor-default'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {itinerary.includes(a.id) ? '✓ Added' : '+ Add to Itinerary'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {notification && (
        <Notification message={notification} visible={!!notification} onHide={() => setNotification(null)} />
      )}
    </DashboardLayout>
  )
}
