import Sidebar from './Sidebar'

type DashboardLayoutProps = {
  children: React.ReactNode
  userName?: string
  userRole?: string
}

export default function DashboardLayout({ children, userName, userRole }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userName={userName} userRole={userRole} />
      <main className="flex-1 min-w-0 overflow-auto">
        {children}
      </main>
    </div>
  )
}
