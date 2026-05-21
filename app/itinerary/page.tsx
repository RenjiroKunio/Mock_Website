'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import PageHeader from '@/components/PageHeader'
import Notification from '@/components/Notification'
import { itineraryActivities } from '@/lib/data'
import type { Activity } from '@/lib/data'

const allMembers = ['Alex', 'Sarah', 'John', 'Mia', 'Renjiro']
const dayLabels: Record<number, string> = { 1: 'Day 1 — July 10', 2: 'Day 2 — July 11', 3: 'Day 3 — July 12' }

export default function ItineraryPage() {
  const [activities, setActivities] = useState(itineraryActivities)
  const [modalOpen, setModalOpen] = useState(false)
  const [notification, setNotification] = useState<string | null>(null)
  const [form, setForm] = useState({ day: 1, time: '09:00', title: '', cost: '', participants: [] as string[], location: '', emoji: '📍' })

  const days = Array.from(new Set(activities.map((a) => a.day))).sort((a, b) => a - b)

  function handleAdd() {
    if (!form.title) return
    const newAct: Activity = {
      id: activities.length + 1,
      day: form.day,
      time: form.time,
      title: form.title,
      estimatedCost: parseFloat(form.cost) || 0,
      participants: form.participants.length ? form.participants : allMembers,
      location: form.location || 'TBD',
      emoji: form.emoji,
    }
    setActivities([...activities, newAct].sort((a, b) => a.day - b.day || a.time.localeCompare(b.time)))
    setNotification(`Activity "${newAct.title}" added!`)
    setModalOpen(false)
    setForm({ day: 1, time: '09:00', title: '', cost: '', participants: [], location: '', emoji: '📍' })
  }

  return (
    <DashboardLayout userName="Renjiro" userRole="Trip Organizer">
      <PageHeader
        title="Itinerary Planner"
        subtitle="Coordinate activities and align schedules with your group"
        action={
          <div className="flex gap-2">
            <button
              onClick={() => setModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
            >
              + Add Activity
            </button>
            <button className="border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-sm font-semibold px-4 py-2 rounded-xl transition-colors">
              ⚡ Resolve Conflict
            </button>
          </div>
        }
      />

      <div className="px-8 pb-8">
        {/* Trip meta */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl px-5 py-3 mb-6 flex flex-wrap items-center gap-6 text-sm">
          <span className="text-blue-700 font-medium">🌴 Bali Adventure</span>
          <span className="text-blue-600">📅 July 10–17, 2024</span>
          <span className="text-blue-600">👥 5 Members</span>
          <span className="text-blue-600">
            💰 Total Activity Cost: ${activities.reduce((s, a) => s + a.estimatedCost, 0).toLocaleString()}
          </span>
        </div>

        {/* Day-by-day */}
        <div className="space-y-8">
          {days.map((day) => {
            const dayActivities = activities.filter((a) => a.day === day).sort((a, b) => a.time.localeCompare(b.time))
            return (
              <div key={day}>
                <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {day}
                  </span>
                  {dayLabels[day] ?? `Day ${day}`}
                </h2>
                <div className="space-y-3">
                  {dayActivities.map((activity) => {
                    const missing = allMembers.filter((m) => !activity.participants.includes(m))
                    const hasConflict = missing.length > 0 && missing.length < allMembers.length
                    return (
                      <div
                        key={activity.id}
                        className={`bg-white rounded-2xl border shadow-sm p-5 flex flex-col sm:flex-row gap-4 ${
                          hasConflict ? 'border-yellow-200' : 'border-gray-100'
                        }`}
                      >
                        {/* Time */}
                        <div className="sm:w-16 shrink-0">
                          <p className="text-xs font-bold text-gray-400">{activity.time}</p>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-semibold text-gray-900">
                                {activity.emoji} {activity.title}
                              </p>
                              <p className="text-xs text-gray-500 mt-0.5">📍 {activity.location}</p>
                            </div>
                            <span className="text-sm font-semibold text-gray-900 shrink-0">
                              ${activity.estimatedCost}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-2 mt-3">
                            {activity.participants.map((p) => (
                              <span key={p} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                                {p}
                              </span>
                            ))}
                            {hasConflict && (
                              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-medium">
                                ⚠️ {missing.join(', ')} unavailable
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Add Activity Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-gray-900">Add Activity</h2>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-xl leading-none">✕</button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Day</label>
                  <select
                    value={form.day}
                    onChange={(e) => setForm({ ...form, day: parseInt(e.target.value) })}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    {[1, 2, 3, 4, 5, 6, 7].map((d) => <option key={d} value={d}>Day {d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Time</label>
                  <input
                    type="time"
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Activity Name</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Sunrise Hike"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Est. Cost ($)</label>
                  <input
                    type="number"
                    value={form.cost}
                    onChange={(e) => setForm({ ...form, cost: e.target.value })}
                    placeholder="50"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder="Mount Batur"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <button
                onClick={handleAdd}
                disabled={!form.title}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm"
              >
                Add Activity
              </button>
            </div>
          </div>
        </div>
      )}

      {notification && (
        <Notification message={notification} visible={!!notification} onHide={() => setNotification(null)} />
      )}
    </DashboardLayout>
  )
}
