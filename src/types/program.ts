export interface Program {
  id: string
  title: string
  description: string
  category: ProgramCategory
  level: DifficultyLevel
  duration: number // in minutes
  instructor: Instructor
  thumbnail: string
  videos: Video[]
  tags: string[]
  rating: number
  reviewCount: number
  isLive?: boolean
  liveDate?: string
  requiredSubscription: SubscriptionTier
  equipment?: Equipment[]
}

export interface Video {
  id: string
  title: string
  description: string
  duration: number // in minutes
  videoUrl: string
  thumbnail: string
  order: number
  isCompleted?: boolean
  watchTime?: number
}

export interface Instructor {
  id: string
  name: string
  bio: string
  avatar: string
  specialties: string[]
  experience: number // years
  rating: number
  totalStudents: number
}

export type ProgramCategory = 
  | 'yoga'
  | 'pilates'
  | 'cardio'
  | 'strength'
  | 'hiit'
  | 'meditation'
  | 'stretching'
  | 'dance'
  | 'prenatal'

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced'

export type SubscriptionTier = 'free' | 'standard' | 'premium'

export interface Equipment {
  id: string
  name: string
  required: boolean
  alternatives?: string[]
}

export interface WorkoutSession {
  id: string
  programId: string
  videoId: string
  userId: string
  startedAt: string
  completedAt?: string
  duration: number // actual workout time in minutes
  caloriesBurned?: number
  rating?: number
  notes?: string
}

export interface LiveClass {
  id: string
  title: string
  description: string
  instructor: Instructor
  category: ProgramCategory
  level: DifficultyLevel
  scheduledAt: string
  duration: number
  maxParticipants?: number
  currentParticipants: number
  streamUrl?: string
  isLive: boolean
  requiredSubscription: SubscriptionTier
}