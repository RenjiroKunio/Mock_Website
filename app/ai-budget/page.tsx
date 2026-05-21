'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import PageHeader from '@/components/PageHeader'

type TravelStyle = 'Budget' | 'Balanced' | 'Comfortable'

const styleRatios: Record<TravelStyle, { accommodation: number; food: number; transport: number; attractions: number; buffer: number }> = {
  Budget:      { accommodation: 0.30, food: 0.25, transport: 0.15, attractions: 0.10, buffer: 0.05 },
  Balanced:    { accommodation: 0.35, food: 0.25, transport: 0.18, attractions: 0.12, buffer: 0.05 },
  Comfortable: { accommodation: 0.40, food: 0.28, transport: 0.17, attractions: 0.13, buffer: 0.07 },
}

type Result = {
  accommodation: number
  food: number
  transport: number
  attractions: number
  buffer: number
  total: number
  remaining: number
  dailyBudget: number
  perPerson: number
}

export default function AIBudgetPage() {
  const [destination, setDestination] = useState('')
  const [budget, setBudget] = useState('')
  const [travelers, setTravelers] = useState('2')
  const [duration, setDuration] = useState('7')
  const [style, setStyle] = useState<TravelStyle>('Balanced')
  const [bufferToggle, setBufferToggle] = useState(false)
  const [result, setResult] = useState<Result | null>(null)

  function calculate() {
    const total = parseFloat(budget)
    const days = parseInt(duration)
    const people = parseInt(travelers)
    if (!total || !days || !people) return

    const ratios = styleRatios[style]
    const bufferExtra = bufferToggle ? 0.05 : 0
    const bufferRate = ratios.buffer + bufferExtra
    const usableRatio = 1 - bufferRate

    const accommodation = Math.round(total * ratios.accommodation * usableRatio)
    const food = Math.round(total * ratios.food * usableRatio)
    const transport = Math.round(total * ratios.transport * usableRatio)
    const attractions = Math.round(total * ratios.attractions * usableRatio)
    const buffer = Math.round(total * bufferRate)
    const spent = accommodation + food + transport + attractions + buffer
    const remaining = Math.round(total - spent)
    const dailyBudget = Math.round(total / days)
    const perPerson = Math.round(total / people)

    setResult({ accommodation, food, transport, attractions, buffer, total, remaining, dailyBudget, perPerson })
  }

  return (
    <DashboardLayout userName="Renjiro" userRole="Budget Planner">
      <PageHeader
        title="AI Budget Calculator"
        subtitle="Get a smart cost breakdown based on your preferences — prototype estimate"
      />

      <div className="px-8 pb-8">
        <div className="bg-blue-50 border border-blue-100 rounded-2xl px-5 py-3 mb-6 flex items-center gap-2 text-sm text-blue-700">
          <span>🤖</span>
          <span className="font-medium">Prototype Mode</span>
          <span className="text-blue-500">— Uses deterministic calculations. AI API integration coming soon.</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Form */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-5">Trip Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Destination</label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="e.g. Bali, Indonesia"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Total Budget ($)</label>
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="2000"
                    min="0"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Travelers</label>
                  <input
                    type="number"
                    value={travelers}
                    onChange={(e) => setTravelers(e.target.value)}
                    min="1"
                    max="20"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Duration (days)</label>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  min="1"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Travel Style</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Budget', 'Balanced', 'Comfortable'] as TravelStyle[]).map((s) => (
                    <button
                      key={s}
                      onClick={() => setStyle(s)}
                      className={`py-2 rounded-xl text-sm font-medium border transition-colors ${
                        style === s ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      {s === 'Budget' ? '🎒' : s === 'Balanced' ? '⚖️' : '🌟'} {s}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div>
                  <p className="text-sm font-medium text-gray-700">Hidden-fee buffer (+5%)</p>
                  <p className="text-xs text-gray-500">Adds extra buffer for unexpected costs</p>
                </div>
                <button
                  onClick={() => setBufferToggle(!bufferToggle)}
                  className={`w-11 h-6 rounded-full transition-colors relative ${bufferToggle ? 'bg-blue-600' : 'bg-gray-200'}`}
                >
                  <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${bufferToggle ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </button>
              </div>
              <button
                onClick={calculate}
                disabled={!budget || !destination}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
              >
                🤖 Calculate Budget
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            {!result ? (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
                <div className="text-5xl mb-4">🤖</div>
                <h3 className="text-base font-semibold text-gray-800 mb-2">Ready to Estimate</h3>
                <p className="text-sm text-gray-500">Fill in your trip details and click Calculate Budget to get your personalized cost breakdown.</p>
              </div>
            ) : (
              <>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base font-semibold text-gray-900">Budget Breakdown</h2>
                    <span className="text-xs bg-blue-50 text-blue-600 font-medium px-2 py-1 rounded-full">
                      Prototype estimate
                    </span>
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: 'Accommodation', value: result.accommodation, emoji: '🏨', description: 'Hotels & stays' },
                      { label: 'Food & Dining', value: result.food, emoji: '🍽️', description: 'Meals & restaurants' },
                      { label: 'Transport', value: result.transport, emoji: '🚌', description: 'Flights, taxis, transit' },
                      { label: 'Attractions', value: result.attractions, emoji: '🎡', description: 'Activities & sightseeing' },
                      { label: 'Emergency Buffer', value: result.buffer, emoji: '🛡️', description: 'Hidden fees & backup' },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{item.emoji}</span>
                          <div>
                            <p className="text-sm font-medium text-gray-800">{item.label}</p>
                            <p className="text-xs text-gray-500">{item.description}</p>
                          </div>
                        </div>
                        <p className="text-sm font-bold text-gray-900">${item.value.toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Remaining', value: `$${result.remaining}`, emoji: '💰', color: 'text-green-600' },
                    { label: 'Daily Budget', value: `$${result.dailyBudget}`, emoji: '📅', color: 'text-blue-600' },
                    { label: 'Per Person', value: `$${result.perPerson}`, emoji: '👤', color: 'text-gray-900' },
                  ].map((s) => (
                    <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
                      <p className="text-xl mb-1">{s.emoji}</p>
                      <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
                      <p className="text-xs text-gray-500">{s.label}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
                  <p className="text-xs font-semibold text-blue-800 mb-1">💡 Recommendation</p>
                  <p className="text-sm text-blue-700">
                    For a <strong>{style}</strong> trip to <strong>{destination || 'your destination'}</strong> with{' '}
                    <strong>{travelers} traveler{parseInt(travelers) > 1 ? 's' : ''}</strong> over{' '}
                    <strong>{duration} days</strong>, your daily budget of <strong>${result.dailyBudget}</strong> keeps you
                    {style === 'Budget' ? ' lean and on track.' : style === 'Balanced' ? ' comfortable without overspending.' : ' in premium comfort.'}
                    {bufferToggle ? ' Your hidden-fee buffer is enabled.' : ' Consider enabling the hidden-fee buffer for safety.'}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
