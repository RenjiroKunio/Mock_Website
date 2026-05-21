import Link from 'next/link'

export default function LandingFooter() {
  return (
    <footer className="bg-white border-t border-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">N</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">NAVARA</p>
            <p className="text-xs text-gray-500">Collaborative travel budgeting platform designed for smarter group adventures.</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <Link href="#" className="text-xs text-gray-500 hover:text-gray-700 transition-colors">Privacy</Link>
          <Link href="#" className="text-xs text-gray-500 hover:text-gray-700 transition-colors">Terms</Link>
          <Link href="#" className="text-xs text-gray-500 hover:text-gray-700 transition-colors">Contact</Link>
        </div>
        <p className="text-xs text-gray-400">© 2024 NAVARA. All rights reserved.</p>
      </div>
    </footer>
  )
}
