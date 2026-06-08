type PageHeaderProps = {
  title: string
  subtitle?: string
  action?: React.ReactNode
  showUser?: boolean
}

export default function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between px-4 sm:px-6 md:px-8 pt-6 sm:pt-8 pb-4 gap-4 sm:gap-0">
      <div className="min-w-0">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{title}</h1>
        {subtitle && <p className="text-xs sm:text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {action && <div className="flex-shrink-0">{action}</div>}
        <button className="relative w-9 sm:w-10 h-9 sm:h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center hover:bg-gray-50 transition-colors flex-shrink-0">
          <span className="text-lg">🔔</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <div className="w-9 sm:w-10 h-9 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center ring-2 ring-blue-200 flex-shrink-0">
          <span className="text-white text-xs sm:text-sm font-semibold">RE</span>
        </div>
      </div>
    </div>
  )
}
