import Link from 'next/link'
import LandingNavbar from '@/components/LandingNavbar'
import LandingFooter from '@/components/LandingFooter'
import FeatureCard from '@/components/FeatureCard'

const features = [
  { emoji: '💰', title: 'Budget Pooling', description: 'Combine contributions from every traveler into a shared trip wallet with full transparency.' },
  { emoji: '⚖️', title: 'Smart Settlement', description: 'Automatically calculate who owes who with fair payment balancing in one tap.' },
  { emoji: '📈', title: 'Expense Analytics', description: 'Visualize spending trends and track your group budget in real time with clear charts.' },
  { emoji: '✈️', title: 'Trip Management', description: 'Organize destinations, travelers, schedules, and activities all in one place.' },
  { emoji: '🗺️', title: 'Tourist Attraction Map', description: 'Explore local attractions by price, distance, and category to plan the perfect itinerary.' },
  { emoji: '🤖', title: 'AI Budget Calculator', description: 'Enter your budget and preferences — get a smart cost breakdown for accommodation, food, and more.' },
  { emoji: '📅', title: 'Itinerary Coordination', description: 'Align schedules with friends, assign activities, and avoid conflicts before you travel.' },
  { emoji: '🏷️', title: 'Transparent Deals', description: 'Browse partner deals with clear pricing, no hidden fees, and direct savings estimates.' },
]

const steps = [
  { step: '01', emoji: '🏕️', title: 'Create a Trip', description: 'Start a travel group and invite your friends or teammates.' },
  { step: '02', emoji: '💳', title: 'Add Expenses', description: 'Track spending, split costs fairly, and monitor contributions.' },
  { step: '03', emoji: '✅', title: 'Settle Instantly', description: 'View balances and settle payments without confusion.' },
]

const whyPoints = [
  { emoji: '🔗', title: 'One Platform', description: 'Plan, book, schedule, budget, and settle — all without switching apps.' },
  { emoji: '🚫', title: 'No Confusion', description: 'Stop comparing ten different websites. NAVARA surfaces the best options in one view.' },
  { emoji: '💡', title: 'No Hidden Costs', description: 'Every price you see includes what you actually pay. No surprises.' },
  { emoji: '🎓', title: 'Built for Students', description: 'Designed from the ground up for budget travelers and student groups.' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <LandingNavbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4 sm:mb-5">
              🌍 Smart Group Travel Platform
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4 sm:mb-5">
              Travel Together <br />
              <span className="text-blue-600">Without Financial Stress</span>
            </h1>
            <p className="text-gray-500 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
              NAVARA helps groups manage shared travel expenses, split payments fairly, track budgets in real time, and settle balances seamlessly.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              <Link
                href="/dashboard"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 sm:py-3 rounded-xl transition-colors text-xs sm:text-sm text-center"
              >
                Launch Dashboard
              </Link>
              <a
                href="#features"
                className="bg-white border border-gray-200 hover:border-blue-300 text-gray-700 font-semibold px-6 py-2.5 sm:py-3 rounded-xl transition-colors text-xs sm:text-sm text-center"
              >
                Explore Features
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-6 sm:gap-8 mt-8 sm:mt-10">
              <div>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">10K+</p>
                <p className="text-xs text-gray-500">Group Trips Managed</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">$2M+</p>
                <p className="text-xs text-gray-500">Expenses Tracked</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">98%</p>
                <p className="text-xs text-gray-500">Satisfaction Rate</p>
              </div>
            </div>
          </div>

          {/* Hero mock card */}
          <div className="flex justify-center">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 sm:p-6 w-full max-w-sm">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-xs font-medium text-gray-500">Active Trip</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">🌴 Bali Adventure</h3>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Total Group Pool</span>
                  <span className="font-semibold text-gray-900">$4,820</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Spent</span>
                  <span className="font-semibold text-gray-900">$2,145</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Remaining</span>
                  <span className="font-semibold text-green-600">$2,675</span>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }} />
              </div>
              <div className="border-t border-gray-100 pt-3">
                <p className="text-xs font-medium text-gray-500 mb-2">Group Members</p>
                <div className="space-y-1">
                  {[{ name: 'Alex', paid: 500 }, { name: 'Sarah', paid: 350 }].map((m) => (
                    <div key={m.name} className="flex justify-between text-xs">
                      <span className="text-gray-700">{m.name}</span>
                      <span className="text-gray-500">Paid ${m.paid}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-3 bg-green-50 text-green-700 text-xs font-medium text-center py-1.5 rounded-xl">
                ✅ Under Budget
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 sm:py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">Everything Your Group Needs</h2>
            <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto">
              NAVARA simplifies collaborative travel budgeting with powerful financial management tools.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {features.map((f) => (
              <FeatureCard key={f.title} emoji={f.emoji} title={f.title} description={f.description} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 sm:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">How NAVARA Works</h2>
            <p className="text-gray-500 text-sm sm:text-base">Simple steps to stress-free group travel budgeting</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {steps.map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl">
                  {s.emoji}
                </div>
                <div className="text-xs font-bold text-blue-600 mb-2">Step {s.step}</div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why NAVARA */}
      <section id="why-navara" className="py-16 sm:py-20 px-4 sm:px-6 bg-blue-600">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-3">Why NAVARA?</h2>
            <p className="text-blue-100 text-sm sm:text-base max-w-xl mx-auto">
              One platform for planning, booking, scheduling, budgeting, and settlement.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {whyPoints.map((p) => (
              <div key={p.title} className="bg-white/10 backdrop-blur rounded-2xl p-5 text-white">
                <div className="text-2xl mb-3">{p.emoji}</div>
                <h3 className="font-semibold mb-1">{p.title}</h3>
                <p className="text-sm text-blue-100">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-white text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">Ready to Simplify Group Travel?</h2>
          <p className="text-gray-500 text-sm sm:text-base mb-6 sm:mb-8">Start managing shared travel expenses smarter with NAVARA.</p>
          <Link
            href="/dashboard"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-xl transition-colors text-xs sm:text-sm"
          >
            Start Your First Trip
          </Link>
        </div>
      </section>

      <LandingFooter />
    </div>
  )
}
