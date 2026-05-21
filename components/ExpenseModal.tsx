'use client'

import { useState, FormEvent } from 'react'
import type { Expense } from '@/lib/data'

type ExpenseModalProps = {
  isOpen: boolean
  onClose: () => void
  onAdd: (expense: Omit<Expense, 'id' | 'paidBy' | 'date' | 'trip'>) => void
}

const categories = ['Food', 'Transport', 'Accommodation', 'Entertainment', 'Other'] as const

export default function ExpenseModal({ isOpen, onClose, onAdd }: ExpenseModalProps) {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<typeof categories[number]>('Food')
  const [amount, setAmount] = useState('')

  if (!isOpen) return null

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!title.trim() || !amount) return
    onAdd({ title: title.trim(), category, amount: parseFloat(amount) })
    setTitle('')
    setCategory('Food')
    setAmount('')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-gray-900">Add Expense</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expense Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Hotel Booking"
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as typeof categories[number])}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount ($)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="100"
              min="0"
              step="0.01"
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm"
          >
            Add Expense
          </button>
        </form>
      </div>
    </div>
  )
}
