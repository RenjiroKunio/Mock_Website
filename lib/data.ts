export type Member = {
  name: string
  initials: string
  role?: string
  paid?: number
  balance?: number
  status?: 'creditor' | 'debtor' | 'settled'
}

export type Expense = {
  id: number
  title: string
  category: 'Food' | 'Accommodation' | 'Transport' | 'Entertainment' | 'Other'
  amount: number
  paidBy: string
  date: string
  trip: string
}

export type Trip = {
  id: number
  name: string
  dates: string
  pool: number
  spent: number
  members: number
  status: 'Active' | 'Completed' | 'Planning'
  emoji: string
}

export type Settlement = {
  id: number
  from: string
  to: string
  amount: number
  status: 'pending' | 'completed'
  date: string
}

export type Deal = {
  id: number
  title: string
  category: string
  price: number
  originalPrice: number
  hiddenFees: 'None' | 'Included' | 'Check required'
  emoji: string
  description: string
}

export type Attraction = {
  id: number
  name: string
  category: string
  priceRange: string
  rating: number
  distance: string
  emoji: string
  description: string
  budgetStyle: 'Budget' | 'Mid-range' | 'Premium'
}

export type Activity = {
  id: number
  day: number
  time: string
  title: string
  estimatedCost: number
  participants: string[]
  location: string
  emoji: string
}

// --- Trips ---
export const trips: Trip[] = [
  {
    id: 1,
    name: 'Bali Adventure',
    dates: 'July 10 – July 17',
    pool: 2000,
    spent: 1300,
    members: 5,
    status: 'Active',
    emoji: '🌴',
  },
  {
    id: 2,
    name: 'Japan Spring Tour',
    dates: 'March 2 – March 12',
    pool: 5500,
    spent: 1925,
    members: 8,
    status: 'Active',
    emoji: '🌸',
  },
  {
    id: 3,
    name: 'Bangkok Budget Run',
    dates: 'August 5 – August 10',
    pool: 1200,
    spent: 0,
    members: 4,
    status: 'Planning',
    emoji: '🏯',
  },
]

// --- Members ---
export const members: Member[] = [
  { name: 'Alex', initials: 'AL', paid: 500, balance: 125, status: 'creditor' },
  { name: 'Sarah', initials: 'SA', paid: 350, balance: -35, status: 'debtor' },
  { name: 'John', initials: 'JO', paid: 400, balance: 80, status: 'creditor' },
  { name: 'Mia', initials: 'MI', paid: 250, balance: -20, status: 'debtor' },
  { name: 'Renjiro', initials: 'RE', paid: 300, balance: 0, status: 'settled' },
]

// --- Expenses ---
export const expenses: Expense[] = [
  { id: 1, title: 'Hotel Booking', category: 'Accommodation', amount: 680, paidBy: 'Alex', date: '2024-07-10', trip: 'Bali Adventure' },
  { id: 2, title: 'Airport Taxi', category: 'Transport', amount: 45, paidBy: 'Sarah', date: '2024-07-10', trip: 'Bali Adventure' },
  { id: 3, title: 'Beach Restaurant', category: 'Food', amount: 120, paidBy: 'John', date: '2024-07-11', trip: 'Bali Adventure' },
  { id: 4, title: 'Temple Entry Fees', category: 'Entertainment', amount: 30, paidBy: 'Mia', date: '2024-07-12', trip: 'Bali Adventure' },
  { id: 5, title: 'Scooter Rental', category: 'Transport', amount: 80, paidBy: 'Alex', date: '2024-07-13', trip: 'Bali Adventure' },
  { id: 6, title: 'Warung Dinner', category: 'Food', amount: 65, paidBy: 'Sarah', date: '2024-07-14', trip: 'Bali Adventure' },
  { id: 7, title: 'Spa Day', category: 'Entertainment', amount: 150, paidBy: 'Renjiro', date: '2024-07-15', trip: 'Bali Adventure' },
  { id: 8, title: 'Grocery Run', category: 'Food', amount: 40, paidBy: 'John', date: '2024-07-16', trip: 'Bali Adventure' },
]

// --- Settlements ---
export const settlements: Settlement[] = [
  { id: 1, from: 'Sarah', to: 'Alex', amount: 35, status: 'pending', date: '2024-07-15' },
  { id: 2, from: 'Mia', to: 'John', amount: 20, status: 'pending', date: '2024-07-15' },
  { id: 3, from: 'Sarah', to: 'Alex', amount: 20, status: 'completed', date: '2024-07-12' },
  { id: 4, from: 'Mia', to: 'Alex', amount: 15, status: 'completed', date: '2024-07-10' },
  { id: 5, from: 'John', to: 'Renjiro', amount: 50, status: 'completed', date: '2024-07-09' },
]

// --- Deals ---
export const deals: Deal[] = [
  {
    id: 1,
    title: 'Budget Hotel Deal',
    category: 'Accommodation',
    price: 28,
    originalPrice: 55,
    hiddenFees: 'None',
    emoji: '🏨',
    description: 'Cozy guesthouse in the city center. Breakfast included, free Wi-Fi.',
  },
  {
    id: 2,
    title: 'Local Tour Discount',
    category: 'Activities',
    price: 12,
    originalPrice: 25,
    hiddenFees: 'Included',
    emoji: '🗺️',
    description: 'Guided walking tour of historical sites. All entrance fees included.',
  },
  {
    id: 3,
    title: 'Student Transport Pass',
    category: 'Transport',
    price: 15,
    originalPrice: 30,
    hiddenFees: 'None',
    emoji: '🚌',
    description: '3-day unlimited bus and metro pass. Valid for students with ID.',
  },
  {
    id: 4,
    title: 'Food Bundle Deal',
    category: 'Food',
    price: 18,
    originalPrice: 32,
    hiddenFees: 'Included',
    emoji: '🍜',
    description: '5-meal voucher pack at local partner restaurants. No service charge.',
  },
  {
    id: 5,
    title: 'Adventure Activity Pack',
    category: 'Activities',
    price: 35,
    originalPrice: 70,
    hiddenFees: 'Check required',
    emoji: '🏄',
    description: 'Snorkeling, kayaking, and cliff jump combo. Insurance may apply.',
  },
  {
    id: 6,
    title: 'Airport Shuttle',
    category: 'Transport',
    price: 8,
    originalPrice: 20,
    hiddenFees: 'None',
    emoji: '✈️',
    description: 'Shared shuttle from airport to city center. Fixed price, no surge.',
  },
]

// --- Attractions ---
export const attractions: Attraction[] = [
  {
    id: 1,
    name: 'Louvre Museum',
    category: 'Culture',
    priceRange: '$18',
    rating: 4.8,
    distance: '0.5 km',
    emoji: '🏛️',
    description: 'World-famous art museum. Book tickets in advance to skip queues.',
    budgetStyle: 'Budget',
  },
  {
    id: 2,
    name: 'Eiffel Tower',
    category: 'Landmark',
    priceRange: '$28',
    rating: 4.9,
    distance: '1.2 km',
    emoji: '🗼',
    description: 'Iconic iron lattice tower. Summit access with guided tour available.',
    budgetStyle: 'Mid-range',
  },
  {
    id: 3,
    name: 'Local Street Food Market',
    category: 'Food',
    priceRange: '$5–$15',
    rating: 4.6,
    distance: '0.3 km',
    emoji: '🍢',
    description: 'Authentic local street food. Best option for budget travelers.',
    budgetStyle: 'Budget',
  },
  {
    id: 4,
    name: 'Sunrise Beach Walk',
    category: 'Nature',
    priceRange: 'Free',
    rating: 4.7,
    distance: '2.0 km',
    emoji: '🌅',
    description: 'Stunning morning beach walk. No cost, just bring sunscreen.',
    budgetStyle: 'Budget',
  },
  {
    id: 5,
    name: 'Guided Cultural Tour',
    category: 'Culture',
    priceRange: '$12',
    rating: 4.5,
    distance: '0.8 km',
    emoji: '🎭',
    description: 'Small group walking tour of old town with local guide.',
    budgetStyle: 'Budget',
  },
  {
    id: 6,
    name: 'Rooftop Night Market',
    category: 'Shopping',
    priceRange: '$10–$30',
    rating: 4.4,
    distance: '1.5 km',
    emoji: '🌃',
    description: 'Trendy rooftop market with local crafts, food, and live music.',
    budgetStyle: 'Mid-range',
  },
]

// --- Itinerary Activities ---
export const itineraryActivities: Activity[] = [
  { id: 1, day: 1, time: '08:00', title: 'Airport Arrival & Check-in', estimatedCost: 45, participants: ['Alex', 'Sarah', 'John', 'Mia', 'Renjiro'], location: 'Hotel Dewata', emoji: '✈️' },
  { id: 2, day: 1, time: '12:00', title: 'Lunch at Warung Local', estimatedCost: 65, participants: ['Alex', 'Sarah', 'John', 'Mia', 'Renjiro'], location: 'Central Market', emoji: '🍜' },
  { id: 3, day: 1, time: '15:00', title: 'Tanah Lot Temple Visit', estimatedCost: 30, participants: ['Alex', 'Sarah', 'Mia'], location: 'Tanah Lot', emoji: '🛕' },
  { id: 4, day: 2, time: '07:00', title: 'Mount Batur Sunrise Hike', estimatedCost: 80, participants: ['Alex', 'John', 'Renjiro'], location: 'Mount Batur', emoji: '🏔️' },
  { id: 5, day: 2, time: '13:00', title: 'Tegallalang Rice Terraces', estimatedCost: 15, participants: ['Alex', 'Sarah', 'John', 'Mia', 'Renjiro'], location: 'Tegallalang', emoji: '🌾' },
  { id: 6, day: 2, time: '19:00', title: 'Sunset Dinner at Jimbaran', estimatedCost: 120, participants: ['Alex', 'Sarah', 'John', 'Mia', 'Renjiro'], location: 'Jimbaran Bay', emoji: '🌅' },
  { id: 7, day: 3, time: '09:00', title: 'Snorkeling at Blue Lagoon', estimatedCost: 150, participants: ['Alex', 'John', 'Mia'], location: 'Blue Lagoon Beach', emoji: '🤿' },
  { id: 8, day: 3, time: '14:00', title: 'Ubud Art Market', estimatedCost: 50, participants: ['Sarah', 'Mia'], location: 'Ubud', emoji: '🎨' },
]

// --- Dashboard Stats ---
export const dashboardStats = {
  totalPool: 4820,
  totalExpenses: 2145,
  remaining: 2675,
  groupMembers: 8,
  poolChange: '+12% this month',
  expensesChange: '+8% this week',
  remainingStatus: 'On track',
}

// --- Analytics Stats ---
export const analyticsStats = {
  totalBudget: 8200,
  totalSpent: 4820,
  remaining: 3380,
  avgPerMember: 602,
  categories: [
    { name: 'Accommodation', amount: 2050, percentage: 43, emoji: '🏨', description: 'Hotels and lodging' },
    { name: 'Food', amount: 1140, percentage: 24, emoji: '🍽️', description: 'Restaurants and meals' },
    { name: 'Transport', amount: 860, percentage: 18, emoji: '🚌', description: 'Trains, taxis, and flights' },
    { name: 'Attractions', amount: 770, percentage: 15, emoji: '🎡', description: 'Activities and attractions' },
  ],
}
