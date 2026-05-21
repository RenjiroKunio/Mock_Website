'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import PageHeader from '@/components/PageHeader'
import StatCard from '@/components/StatCard'
import Notification from '@/components/Notification'
import { deals } from '@/lib/data'

const hiddenFeeColors: Record<string, string> = {
  None: 'bg-green-100 text-green-700',
  Included: 'bg-blue-100 text-blue-700',
  'Check required': 'bg-yellow-100 text-yellow-700',
}

const categories = ['All', 'Accommodation', 'Activities', 'Transport', 'Food'] as const
type Category = typeof categories[number]

export default function DealsPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All')
  const [addedDeals, setAddedDeals] = useState<number[]>([])
  const [notification, setNotification] = useState<string | null>(null)

  const filtered = deals.filter((d) => selectedCategory === 'All' || d.category === selectedCategory)

  function handleAdd(id: number, title: string) {
    if (!addedDeals.includes(id)) {
      setAddedDeals([...addedDeals, id])
      setNotification(`"${title}" added to your plan!`)
    }
  }

  const totalSavings = deals.reduce((sum, d) => sum + (d.originalPrice - d.price), 0)
  const dealsWithNoFees = deals.filter((d) => d.hiddenFees === 'None').length

  return (
    <DashboardLayout userName="Renjiro" userRole="Trip Organizer">
      <PageHeader
        title="Travel Deals"
        subtitle="Affordable partner deals with clear pricing and no surprise fees"
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-8 mb-6">
        <StatCard title="Active Deals" value={`${deals.length}`} emoji="🏷️" badge="This week" badgeColor="blue" />
        <StatCard title="Avg Savings" value={`$${Math.round(totalSavings / deals.length)}`} emoji="💰" badge="Per deal" badgeColor="green" />
        <StatCard title="No Hidden Fees" value={`${dealsWithNoFees}`} emoji="✅" badge="Transparent" badgeColor="green" />
        <StatCard title="Added to Plan" value={`${addedDeals.length}`} emoji="📋" badge="Selected" badgeColor="gray" />
      </div>

      {/* Filter */}
      <div className="px-8 mb-6 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setSelectedCategory(c)}
            className={`text-xs font-medium px-3 py-1.5 rounded-xl transition-colors ${
              selectedCategory === c ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-blue-300'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Deal Cards */}
      <div className="px-8 pb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((deal) => {
            const savings = deal.originalPrice - deal.price
            const savingsPct = Math.round((savings / deal.originalPrice) * 100)
            const isAdded = addedDeals.includes(deal.id)

            return (
              <div key={deal.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-blue-50 rounded-2xl flex items-center justify-center text-2xl shrink-0">
                      {deal.emoji}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">{deal.title}</h3>
                      <p className="text-xs text-gray-500">{deal.category}</p>
                    </div>
                  </div>
                  <div className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full shrink-0">
                    -{savingsPct}%
                  </div>
                </div>

                <p className="text-xs text-gray-500 mb-4 leading-relaxed flex-1">{deal.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Price</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400 line-through">${deal.originalPrice}</span>
                      <span className="font-bold text-gray-900">${deal.price}</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">You save</span>
                    <span className="font-semibold text-green-600">${savings}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Hidden fees</span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${hiddenFeeColors[deal.hiddenFees]}`}>
                      {deal.hiddenFees === 'None' ? '✅ None' : deal.hiddenFees === 'Included' ? '✓ Included' : '⚠️ Check required'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleAdd(deal.id, deal.title)}
                  disabled={isAdded}
                  className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isAdded
                      ? 'bg-green-100 text-green-700 cursor-default'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {isAdded ? '✓ Added to Plan' : '+ Add to Plan'}
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {notification && (
        <Notification message={notification} visible={!!notification} onHide={() => setNotification(null)} />
      )}
    </DashboardLayout>
  )
}
