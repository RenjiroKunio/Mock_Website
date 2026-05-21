'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import PageHeader from '@/components/PageHeader'
import StatCard from '@/components/StatCard'
import ExpenseModal from '@/components/ExpenseModal'
import Notification from '@/components/Notification'
import { members, expenses as initialExpenses, settlements } from '@/lib/data'
import type { Expense } from '@/lib/data'

export default function TripPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [notification, setNotification] = useState(false)
  const [expenses, setExpenses] = useState(initialExpenses)
  const [settleNotif, setSettleNotif] = useState<string | null>(null)

  function handleAddExpense(data: Omit<Expense, 'id' | 'paidBy' | 'date' | 'trip'>) {
    setExpenses([
      { ...data, id: expenses.length + 1, paidBy: 'Renjiro', date: new Date().toISOString().split('T')[0], trip: 'Bali Adventure' },
      ...expenses,
    ])
    setNotification(true)
  }

  return (
    <DashboardLayout userName="Renjiro" userRole="Trip Organizer">
      <PageHeader
        title="Bali Adventure Trip"
        subtitle="July 10 – July 17 · 5 Members · Active Trip"
        action={
          <div className="flex gap-2">
            <button
              onClick={() => setModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
            >
              + Add Expense
            </button>
            <button className="border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-sm font-semibold px-4 py-2 rounded-xl transition-colors">
              Invite Member
            </button>
          </div>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 px-8 mb-8">
        <StatCard title="Total Pool" value="$2,000" emoji="💰" badge="5 contributors" badgeColor="green" />
        <StatCard title="Total Spent" value="$1,300" emoji="💳" badge="65% of pool" badgeColor="blue" />
        <StatCard title="Remaining" value="$700" emoji="📊" badge="Under budget" badgeColor="green" />
      </div>

      <div className="px-8 pb-8 grid lg:grid-cols-3 gap-6">
        {/* Group Members */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-base font-semibold text-gray-900 mb-1">Group Members</h2>
          <p className="text-xs text-gray-500 mb-4">Contribution overview</p>
          <div className="space-y-3">
            {members.map((m) => (
              <div key={m.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-xs font-semibold text-blue-700">
                    {m.initials}
                  </div>
                  <span className="text-sm font-medium text-gray-800">{m.name}</span>
                </div>
                <span className="text-sm text-gray-600">Paid ${m.paid}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Expenses */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-base font-semibold text-gray-900 mb-1">Recent Expenses</h2>
          <p className="text-xs text-gray-500 mb-4">Shared spending history</p>
          <div className="space-y-3">
            {expenses.slice(0, 6).map((e) => (
              <div key={e.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-800">{e.title}</p>
                  <p className="text-xs text-gray-500">{e.paidBy} · {e.category}</p>
                </div>
                <span className="text-sm font-semibold text-gray-900">${e.amount}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Settlement Summary */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-base font-semibold text-gray-900 mb-1">Settlement Summary</h2>
          <p className="text-xs text-gray-500 mb-4">Current balances between members</p>
          <div className="space-y-3">
            {settlements.filter((s) => s.status === 'pending').map((s) => (
              <div key={s.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {s.from} owes {s.to}
                  </p>
                  <p className="text-xs text-red-500">${s.amount} pending</p>
                </div>
                <button
                  onClick={() => setSettleNotif(`${s.from} settled $${s.amount}`)}
                  className="text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-xl transition-colors"
                >
                  Settle
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ExpenseModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onAdd={handleAddExpense} />
      <Notification message="Expense Added Successfully!" visible={notification} onHide={() => setNotification(false)} />
      {settleNotif && (
        <Notification message={`${settleNotif}!`} visible={!!settleNotif} onHide={() => setSettleNotif(null)} type="info" />
      )}
    </DashboardLayout>
  )
}
