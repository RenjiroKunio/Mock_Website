'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import PageHeader from '@/components/PageHeader'
import StatCard from '@/components/StatCard'
import Notification from '@/components/Notification'
import { settlements as initialSettlements, members } from '@/lib/data'

const activityFeed = [
  { emoji: '✅', text: 'Sarah settled $20 with Alex', time: '1 hour ago' },
  { emoji: '💳', text: 'Alex received payment', time: '3 hours ago' },
  { emoji: '🔔', text: 'Reminder sent to Mia', time: 'Yesterday' },
]

export default function SettlementPage() {
  const [settlements, setSettlements] = useState(initialSettlements)
  const [notification, setNotification] = useState<string | null>(null)

  function handleSettle(id: number, from: string, to: string, amount: number) {
    setSettlements(settlements.map((s) => s.id === id ? { ...s, status: 'completed' as const } : s))
    setNotification(`${from} settled $${amount} with ${to}`)
  }

  function handleRemind(from: string) {
    setNotification(`Reminder sent to ${from}`)
  }

  const pending = settlements.filter((s) => s.status === 'pending')
  const completed = settlements.filter((s) => s.status === 'completed')

  return (
    <DashboardLayout userName="Renjiro" userRole="Finance Overview">
      <PageHeader
        title="Settlement Center"
        subtitle="Manage balances, debts, and group payment settlements"
        action={
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors">
            + New Settlement
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-8 mb-8">
        <StatCard title="Total Owed" value="$425" emoji="⚖️" badge={`${pending.length} pending`} badgeColor="yellow" />
        <StatCard title="Pending Payments" value={`${pending.length}`} emoji="⏳" badge="Needs action" badgeColor="yellow" />
        <StatCard title="Completed" value={`${completed.length}`} emoji="✅" badge="Settlements" badgeColor="green" />
        <StatCard title="Group Balance" value="+$1,250" emoji="💰" badge="Net positive" badgeColor="green" />
      </div>

      <div className="px-8 pb-8 grid lg:grid-cols-3 gap-6">
        {/* Outstanding Balances */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-base font-semibold text-gray-900 mb-1">Outstanding Balances</h2>
            <p className="text-xs text-gray-500 mb-4">Current member debts and settlements</p>
            <div className="space-y-3">
              {settlements.map((s) => (
                <div key={s.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {s.from} → {s.to}
                    </p>
                    <p className={`text-xs font-medium mt-0.5 ${s.status === 'completed' ? 'text-green-600' : 'text-red-500'}`}>
                      ${s.amount} · {s.status === 'completed' ? 'Settled' : 'Pending'}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {s.status === 'pending' ? (
                      <>
                        <button
                          onClick={() => handleSettle(s.id, s.from, s.to, s.amount)}
                          className="text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-xl transition-colors"
                        >
                          Settle
                        </button>
                        <button
                          onClick={() => handleRemind(s.from)}
                          className="text-xs font-semibold border border-gray-200 text-gray-600 hover:bg-gray-100 px-3 py-1.5 rounded-xl transition-colors"
                        >
                          Remind
                        </button>
                      </>
                    ) : (
                      <span className="text-xs font-medium text-green-600 bg-green-50 px-3 py-1.5 rounded-xl">Settled ✓</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Member Balances */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-base font-semibold text-gray-900 mb-1">Member Balances</h2>
            <p className="text-xs text-gray-500 mb-4">Individual financial standings</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {members.map((m) => (
                <div key={m.name} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                  <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-700 shrink-0">
                    {m.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{m.name}</p>
                    <p className={`text-xs font-medium ${
                      m.status === 'creditor' ? 'text-green-600' : m.status === 'debtor' ? 'text-red-500' : 'text-gray-500'
                    }`}>
                      {m.status === 'creditor' ? `+$${m.balance}` : m.status === 'debtor' ? `$${m.balance}` : 'Settled'}
                      {' · '}
                      {m.status === 'creditor' ? 'Creditor' : m.status === 'debtor' ? 'Debtor' : 'Balanced'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Settlement Activity */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 h-fit">
          <h2 className="text-base font-semibold text-gray-900 mb-1">Settlement Activity</h2>
          <p className="text-xs text-gray-500 mb-4">Latest payment actions</p>
          <div className="space-y-4">
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

      {notification && (
        <Notification message={`${notification}!`} visible={!!notification} onHide={() => setNotification(null)} type="success" />
      )}
    </DashboardLayout>
  )
}
