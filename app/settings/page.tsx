import DashboardLayout from '@/components/DashboardLayout'
import PageHeader from '@/components/PageHeader'

const sections = [
  {
    title: 'Profile',
    items: [
      { label: 'Display Name', value: 'Renjiro', type: 'text' },
      { label: 'Email', value: 'renjiro@example.com', type: 'email' },
      { label: 'Role', value: 'Premium User', type: 'text' },
    ],
  },
  {
    title: 'Preferences',
    items: [
      { label: 'Default Currency', value: 'USD ($)', type: 'select' },
      { label: 'Language', value: 'English', type: 'select' },
      { label: 'Budget Alerts', value: 'Enabled', type: 'toggle' },
    ],
  },
  {
    title: 'Notifications',
    items: [
      { label: 'Settlement Reminders', value: 'On', type: 'toggle' },
      { label: 'New Expense Alerts', value: 'On', type: 'toggle' },
      { label: 'Weekly Budget Summary', value: 'Off', type: 'toggle' },
    ],
  },
]

export default function SettingsPage() {
  return (
    <DashboardLayout userName="Renjiro" userRole="Premium User">
      <PageHeader
        title="Settings"
        subtitle="Manage your account preferences and notification settings"
      />
      <div className="px-8 pb-8 max-w-2xl space-y-6">
        {sections.map((section) => (
          <div key={section.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-4">{section.title}</h2>
            <div className="space-y-4">
              {section.items.map((item) => (
                <div key={item.label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <label className="text-sm font-medium text-gray-700">{item.label}</label>
                  {item.type === 'toggle' ? (
                    <div className={`w-10 h-5 rounded-full relative cursor-pointer ${item.value === 'On' || item.value === 'Enabled' ? 'bg-blue-600' : 'bg-gray-200'}`}>
                      <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${item.value === 'On' || item.value === 'Enabled' ? 'translate-x-5' : 'translate-x-0.5'}`} />
                    </div>
                  ) : (
                    <span className="text-sm text-gray-500">{item.value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="bg-red-50 border border-red-100 rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-red-800 mb-1">Danger Zone</h2>
          <p className="text-xs text-red-600 mb-3">These actions are permanent and cannot be undone.</p>
          <button className="text-xs font-semibold text-red-600 border border-red-200 hover:bg-red-100 px-4 py-2 rounded-xl transition-colors">
            Delete Account
          </button>
        </div>
      </div>
    </DashboardLayout>
  )
}
