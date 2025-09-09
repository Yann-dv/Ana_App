export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  subscription: SubscriptionTier
  createdAt: string
  progress?: UserProgress
}

export interface UserProgress {
  totalWorkouts: number
  totalMinutes: number
  currentStreak: number
  longestStreak: number
  favoritePrograms: string[]
  completedPrograms: string[]
  achievements: Achievement[]
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt: string
}

export type SubscriptionTier = 'free' | 'standard' | 'premium'

export interface SubscriptionPlan {
  id: SubscriptionTier
  name: string
  price: number
  interval: 'month' | 'year'
  features: string[]
  popular?: boolean
}

export interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  updateSubscription: (subscription: SubscriptionTier) => void
}