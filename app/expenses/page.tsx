'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import PageHeader from '@/components/PageHeader'
import StatCard from '@/components/StatCard'
import ExpenseModal from '@/components/ExpenseModal'
import Notification from '@/components/Notification'
import { expenses as initialExpenses } from '@/lib/data'
import type { Expense } from '@/lib/data'

const categoryColors: Record<string, string> = {
  Accommodation: 'bg-purple-100 text-purple-700',
  Food: 'bg-orange-100 text-orange-700',
  Transport: 'bg-blue-100 text-blue-700',
  Entertainment: 'bg-green-100 text-green-700',
  Other: 'bg-gray-100 text-gray-600',
}

const activityFeed = [
  { emoji: '🏨', text: 'Alex added Hotel Booking', time: '2 hours ago' },
  { emoji: '💸', text: 'Sarah settled $20 payment', time: '5 hours ago' },
  { emoji: '🍜', text: 'New food expense added', time: 'Yesterday' },
]

export default function ExpensesPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [notification, setNotification] = useState(false)
  const [expenses, setExpenses] = useState(initialExpenses)

  function handleAddExpense(data: Omit<Expense, 'id' | 'paidBy' | 'date' | 'trip'>) {
    setExpenses([
      { ...data, id: expenses.length + 1, paidBy: 'Renjiro', date: new Date().toISOString().split('T')[0], trip: 'Bali Adventure' },
      ...expenses,
    ])
    setNotification(true)
  }

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0)
  const foodTotal = expenses.filter((e) => e.category === 'Food').reduce((sum, e) => sum + e.amount, 0)
  const accomTotal = expenses.filter((e) => e.category === 'Accommodation').reduce((sum, e) => sum + e.amount, 0)
  const transportTotal = expenses.filter((e) => e.category === 'Transport').reduce((sum, e) => sum + e.amount, 0)

  return (
    <DashboardLayout userName="Renjiro" userRole="Trip Organizer">
      <PageHeader
        title="Expense Management"
        subtitle="Track and organize all group spending activities"
        action={
          <button
            onClick={() => setModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
          >
            + Add Expense
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-8 mb-8">
        <StatCard title="Total Expenses" value={`$${totalExpenses.toLocaleString()}`} emoji="💳" badge="All trips" badgeColor="blue" />
        <StatCard title="Food Spending" value={`$${foodTotal.toLocaleString()}`} emoji="🍽️" badge="Restaurants" badgeColor="yellow" />
        <StatCard title="Accommodation" value={`$${accomTotal.toLocaleString()}`} emoji="🏨" badge="Hotels & stays" badgeColor="blue" />
        <StatCard title="Transport" value={`$${transportTotal.toLocaleString()}`} emoji="🚌" badge="Transfers" badgeColor="gray" />
      </div>

      <div className="px-8 pb-8 grid lg:grid-cols-3 gap-6">
        {/* Expense History */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <div>
              <h2 className="text-base font-semibold text-gray-900">Expense History</h2>
              <p className="text-xs text-gray-500">All recorded trip expenses</p>
            </div>
            <button
              onClick={() => setModalOpen(true)}
              className="text-xs font-medium bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1.5 rounded-xl transition-colors"
            >
              + Add
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">Expense</th>
                  <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">Category</th>
                  <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">Paid By</th>
                  <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">Date</th>
                  <th className="text-right text-xs font-medium text-gray-500 px-5 py-3">Amount</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((e) => (
                  <tr key={e.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 font-medium text-gray-900">{e.title}</td>
                    <td className="px-5 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[e.category] ?? categoryColors.Other}`}>
                        {e.category}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-gray-600">{e.paidBy}</td>
                    <td className="px-5 py-3 text-gray-500">{e.date}</td>
                    <td className="px-5 py-3 text-right font-semibold text-gray-900">${e.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Categories */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-base font-semibold text-gray-900 mb-1">Categories</h2>
            <p className="text-xs text-gray-500 mb-4">Expense distribution</p>
            <div className="space-y-3">
              {[
                { label: 'Accommodation', value: accomTotal, total: totalExpenses, emoji: '🏨' },
                { label: 'Food', value: foodTotal, total: totalExpenses, emoji: '🍜' },
                { label: 'Transport', value: transportTotal, total: totalExpenses, emoji: '🚌' },
              ].map((cat) => (
                <div key={cat.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600">{cat.emoji} {cat.label}</span>
                    <span className="font-medium text-gray-900">${cat.value}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div
                      className="bg-blue-600 h-1.5 rounded-full"
                      style={{ width: `${Math.round((cat.value / cat.total) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-base font-semibold text-gray-900 mb-1">Activity Feed</h2>
            <p className="text-xs text-gray-500 mb-4">Latest actions</p>
            <div className="space-y-3">
              {activityFeed.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-lg mt-0.5">{item.emoji}</span>
                  <div>
                    <p className="text-sm text-gray-800">{item.text}</p>
                    <p className="text-xs text-gray-400">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ExpenseModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onAdd={handleAddExpense} />
      <Notification message="Expense Added Successfully!" visible={notification} onHide={() => setNotification(false)} />
    </DashboardLayout>
  )
}
