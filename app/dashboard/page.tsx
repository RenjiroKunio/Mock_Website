'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import PageHeader from '@/components/PageHeader'
import StatCard from '@/components/StatCard'
import TripCard from '@/components/TripCard'
import ExpenseModal from '@/components/ExpenseModal'
import Notification from '@/components/Notification'
import { trips, expenses as initialExpenses, dashboardStats } from '@/lib/data'
import type { Expense } from '@/lib/data'

export default function DashboardPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [notification, setNotification] = useState(false)
  const [expenses, setExpenses] = useState(initialExpenses)

  function handleAddExpense(data: Omit<Expense, 'id' | 'paidBy' | 'date' | 'trip'>) {
    const newExpense: Expense = {
      ...data,
      id: expenses.length + 1,
      paidBy: 'Renjiro',
      date: new Date().toISOString().split('T')[0],
      trip: 'Bali Adventure',
    }
    setExpenses([newExpense, ...expenses])
    setNotification(true)
  }

  return (
    <DashboardLayout userName="Renjiro" userRole="Premium User">
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back! Here's your travel budget overview."
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
        <StatCard title="Total Pool" value={`$${dashboardStats.totalPool.toLocaleString()}`} badge={dashboardStats.poolChange} emoji="💰" badgeColor="green" />
        <StatCard title="Total Expenses" value={`$${dashboardStats.totalExpenses.toLocaleString()}`} badge={dashboardStats.expensesChange} emoji="💳" badgeColor="blue" />
        <StatCard title="Remaining Budget" value={`$${dashboardStats.remaining.toLocaleString()}`} badge={dashboardStats.remainingStatus} emoji="📊" badgeColor="green" />
        <StatCard title="Group Members" value={`${dashboardStats.groupMembers}`} badge="Active travelers" emoji="👥" badgeColor="gray" />
      </div>

      {/* Recent Trips */}
      <div className="px-8 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-semibold text-gray-900">Recent Trips</h2>
            <p className="text-xs text-gray-500">Manage your active group travels</p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            + Create Trip
          </button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trips.slice(0, 3).map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      </div>

      {/* Recent Expenses */}
      <div className="px-8 pb-8">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <div>
              <h2 className="text-base font-semibold text-gray-900">Recent Expenses</h2>
              <p className="text-xs text-gray-500">Latest group spending activity</p>
            </div>
            <button
              onClick={() => setModalOpen(true)}
              className="text-xs font-medium bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1.5 rounded-xl transition-colors"
            >
              + Add Expense
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">Expense</th>
                  <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">Category</th>
                  <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">Paid By</th>
                  <th className="text-right text-xs font-medium text-gray-500 px-5 py-3">Amount</th>
                </tr>
              </thead>
              <tbody>
                {expenses.slice(0, 6).map((expense) => (
                  <tr key={expense.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 font-medium text-gray-900">{expense.title}</td>
                    <td className="px-5 py-3">
                      <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">{expense.category}</span>
                    </td>
                    <td className="px-5 py-3 text-gray-600">{expense.paidBy}</td>
                    <td className="px-5 py-3 text-right font-semibold text-gray-900">${expense.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ExpenseModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onAdd={handleAddExpense} />
      <Notification message="Expense Added Successfully!" visible={notification} onHide={() => setNotification(false)} />
    </DashboardLayout>
  )
}
