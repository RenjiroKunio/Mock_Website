import DashboardLayout from '@/components/DashboardLayout'
import PageHeader from '@/components/PageHeader'
import StatCard from '@/components/StatCard'
import { analyticsStats, members } from '@/lib/data'

const insights = [
  { emoji: '✅', text: 'You are currently under budget by 18%.' },
  { emoji: '📈', text: 'Food expenses increased 15% this week.' },
  { emoji: '🏨', text: 'Accommodation is your highest spending category.' },
]

export default function AnalyticsPage() {
  const { totalBudget, totalSpent, remaining, avgPerMember, categories } = analyticsStats

  return (
    <DashboardLayout userName="Renjiro" userRole="Analytics Overview">
      <PageHeader
        title="Financial Analytics"
        subtitle="Visualize your group travel spending and budgeting insights"
        action={
          <button className="border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-sm font-semibold px-4 py-2 rounded-xl transition-colors">
            📥 Download Report
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-8 mb-8">
        <StatCard title="Total Budget" value={`$${totalBudget.toLocaleString()}`} emoji="💰" badge="All trips" badgeColor="blue" />
        <StatCard title="Total Spent" value={`$${totalSpent.toLocaleString()}`} emoji="💳" badge="58.8% used" badgeColor="yellow" />
        <StatCard title="Remaining" value={`$${remaining.toLocaleString()}`} emoji="📊" badge="On track" badgeColor="green" />
        <StatCard title="Avg Per Member" value={`$${avgPerMember}`} emoji="👥" badge="Per traveler" badgeColor="gray" />
      </div>

      <div className="px-8 pb-8 grid lg:grid-cols-2 gap-6">
        {/* Spending Breakdown */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-1">Spending Breakdown</h2>
          <p className="text-xs text-gray-500 mb-5">Expense distribution by category</p>
          <div className="space-y-4">
            {categories.map((cat) => (
              <div key={cat.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{cat.emoji}</span>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{cat.name}</p>
                      <p className="text-xs text-gray-500">{cat.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">${cat.amount.toLocaleString()}</p>
                    <p className="text-xs text-gray-400">{cat.percentage}%</p>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Smart Insights */}
        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-1">Smart Insights</h2>
            <p className="text-xs text-gray-500 mb-4">Budget observations</p>
            <div className="space-y-3">
              {insights.map((insight, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                  <span className="text-lg">{insight.emoji}</span>
                  <p className="text-sm text-blue-800">{insight.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Trip Summary */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-1">Trip Summary</h2>
            <p className="text-xs text-gray-500 mb-4">Overall performance</p>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Budget Utilization</span>
                <span className="font-semibold text-gray-900">58.8%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div className="bg-blue-600 h-3 rounded-full" style={{ width: '58.8%' }} />
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>$0</span>
                <span>${totalBudget.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Member Contributions */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-1">Member Contributions</h2>
            <p className="text-xs text-gray-500 mb-4">Spending and contribution comparison</p>
            <div className="space-y-2">
              {members.map((m) => (
                <div key={m.name} className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-700 shrink-0">
                    {m.initials}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-medium text-gray-700">{m.name}</span>
                      <span className="text-gray-500">${m.paid}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div
                        className="bg-blue-400 h-1.5 rounded-full"
                        style={{ width: `${Math.round(((m.paid ?? 0) / 1500) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
