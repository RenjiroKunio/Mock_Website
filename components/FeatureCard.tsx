type FeatureCardProps = {
  emoji: string
  title: string
  description: string
}

export default function FeatureCard({ emoji, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 text-2xl">
        {emoji}
      </div>
      <h3 className="text-base font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
    </div>
  )
}
