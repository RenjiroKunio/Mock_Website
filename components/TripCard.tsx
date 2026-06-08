import Link from 'next/link'
import type { Trip } from '@/lib/data'

const statusColors = {
  Active: 'bg-green-100 text-green-700',
  Completed: 'bg-gray-100 text-gray-600',
  Planning: 'bg-yellow-100 text-yellow-700',
}

export default function TripCard({ trip }: { trip: Trip }) {
  const progress = Math.round((trip.spent / trip.pool) * 100)

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <span className="text-xl sm:text-2xl flex-shrink-0">{trip.emoji}</span>
          <div className="min-w-0">
            <h3 className="font-semibold text-sm sm:text-base text-gray-900 truncate">{trip.name}</h3>
            <p className="text-xs text-gray-500">{trip.dates}</p>
          </div>
        </div>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0 ${statusColors[trip.status]}`}>
          {trip.status}
        </span>
      </div>

      {/* Progress bar */}
      <div className="mb-3">
        <div className="flex justify-between text-xs text-gray-500 mb-1 gap-2">
          <span className="truncate">Spent: ${trip.spent.toLocaleString()}</span>
          <span className="text-right flex-shrink-0">Pool: ${trip.pool.toLocaleString()}</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-2">
        <span className="text-xs text-gray-500">👥 {trip.members} members</span>
        <Link
          href="/trip"
          className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors flex-shrink-0"
        >
          View Trip →
        </Link>
      </div>
    </div>
  )
}
