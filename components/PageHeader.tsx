type PageHeaderProps = {
  title: string
  subtitle?: string
  action?: React.ReactNode
  showUser?: boolean
}

export default function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between px-8 pt-8 pb-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3 shrink-0 ml-4">
        {action}
        {/* Notification + Avatar */}
        <button className="relative w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center hover:bg-gray-50 transition-colors">
          <span className="text-lg">🔔</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center ring-2 ring-blue-200">
          <span className="text-white text-sm font-semibold">RE</span>
        </div>
      </div>
    </div>
  )
}
