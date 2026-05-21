'use client'

import { useEffect } from 'react'

type NotificationProps = {
  message: string
  visible: boolean
  onHide: () => void
  type?: 'success' | 'error' | 'info'
}

export default function Notification({ message, visible, onHide, type = 'success' }: NotificationProps) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onHide, 3000)
      return () => clearTimeout(timer)
    }
  }, [visible, onHide])

  if (!visible) return null

  const colors = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    info: 'bg-blue-600',
  }

  return (
    <div className={`fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl text-white text-sm font-medium shadow-lg ${colors[type]} animate-in slide-in-from-top-2 duration-300`}>
      {type === 'success' && <span>✅</span>}
      {type === 'error' && <span>❌</span>}
      {type === 'info' && <span>ℹ️</span>}
      {message}
    </div>
  )
}
