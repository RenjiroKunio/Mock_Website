type StatCardProps = {
  title: string
  value: string
  badge?: string
  badgeColor?: 'green' | 'blue' | 'yellow' | 'gray'
  emoji: string
}

const badgeColors = {
  green: 'bg-green-100 text-green-700',
  blue: 'bg-blue-100 text-blue-700',
  yellow: 'bg-yellow-100 text-yellow-700',
  gray: 'bg-gray-100 text-gray-600',
}

export default function StatCard({ title, value, badge, badgeColor = 'green', emoji }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-gray-500">{title}</span>
        <span className="text-xl">{emoji}</span>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      {badge && (
        <span className={`inline-block mt-2 text-xs font-medium px-2 py-0.5 rounded-full ${badgeColors[badgeColor]}`}>
          {badge}
        </span>
      )}
    </div>
  )
}
