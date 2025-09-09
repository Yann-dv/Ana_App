'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Play, 
  Clock, 
  Calendar, 
  Trophy, 
  Target, 
  TrendingUp, 
  Star,
  Filter,
  Search,
  Heart,
  Users,
  Flame,
  Crown
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useSubscription } from '@/contexts/SubscriptionContext'
import { useVideo } from '@/contexts/VideoContext'
import { useProgress } from '@/contexts/ProgressContext'
import Link from 'next/link'
import { Program, Video, LiveClass } from '@/types/program'

// Mock data for demonstration
const mockPrograms: Program[] = [
  {
    id: '1',
    title: 'Morning Yoga Flow',
    description: 'Start your day with energizing yoga sequences',
    category: 'yoga',
    level: 'beginner',
    duration: 30,
    instructor: {
      id: '1',
      name: 'Sarah Johnson',
      bio: 'Certified yoga instructor with 10+ years experience',
      avatar: '/instructors/sarah.jpg',
      specialties: ['Yoga', 'Meditation'],
      experience: 10,
      rating: 4.9,
      totalStudents: 2500
    },
    thumbnail: '/programs/yoga-flow.jpg',
    videos: [],
    tags: ['yoga', 'morning', 'flexibility'],
    rating: 4.8,
     reviewCount: 245,
     requiredSubscription: 'free'
  },
  {
    id: '2',
    title: 'HIIT Cardio Blast',
    description: 'High-intensity interval training for maximum results',
    category: 'cardio',
    level: 'intermediate',
    duration: 25,
    instructor: {
      id: '2',
      name: 'Mike Chen',
      bio: 'Personal trainer and fitness coach',
      avatar: '/instructors/mike.jpg',
      specialties: ['HIIT', 'Strength Training'],
      experience: 8,
      rating: 4.8,
      totalStudents: 1800
    },
    thumbnail: '/programs/hiit-cardio.jpg',
    videos: [],
    tags: ['hiit', 'cardio', 'fat-burn'],
    rating: 4.7,
     reviewCount: 189,
     requiredSubscription: 'standard'
  },
  {
    id: '3',
    title: 'Pilates Core Strength',
    description: 'Build core strength and stability with pilates',
    category: 'pilates',
    level: 'intermediate',
    duration: 35,
    instructor: {
      id: '3',
      name: 'Emma Wilson',
      bio: 'Certified pilates instructor',
      avatar: '/instructors/emma.jpg',
      specialties: ['Pilates', 'Core Training'],
      experience: 6,
      rating: 4.7,
      totalStudents: 1200
    },
    thumbnail: '/programs/pilates-core.jpg',
    videos: [],
    tags: ['pilates', 'core', 'strength'],
    rating: 4.9,
     reviewCount: 156,
     requiredSubscription: 'premium'
  }
]

const mockLiveClasses: LiveClass[] = [
  {
    id: '1',
    title: 'Live Yoga Session',
    instructor: {
      id: '1',
      name: 'Sarah Johnson',
      bio: 'Certified yoga instructor',
      avatar: '/instructors/sarah.jpg',
      specialties: ['Yoga'],
      experience: 10,
      rating: 4.9,
      totalStudents: 2500
    },
    scheduledAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
    duration: 60,
    maxParticipants: 50,
    currentParticipants: 23,
    category: 'yoga',
    level: 'beginner',
    requiredSubscription: 'standard',
    streamUrl: 'https://stream.example.com/live1',
    isLive: true,
    description: 'Join us for a relaxing yoga session'
  },
  {
    id: '2',
    title: 'HIIT Challenge',
    instructor: {
      id: '2',
      name: 'Mike Chen',
      bio: 'Personal trainer',
      avatar: '/instructors/mike.jpg',
      specialties: ['HIIT'],
      experience: 8,
      rating: 4.8,
      totalStudents: 1800
    },
    scheduledAt: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(), // 4 hours from now
    duration: 30,
    maxParticipants: 30,
    currentParticipants: 18,
    category: 'cardio',
    level: 'advanced',
    requiredSubscription: 'premium',
    streamUrl: 'https://stream.example.com/live2',
    isLive: false,
    description: 'High-intensity workout challenge'
  }
]

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const { currentPlan, checkAccess, getRemainingUsage } = useSubscription();
  const { getTotalWatchTime, getCompletedVideosCount } = useVideo();
  const { userProgress, unlockedAchievements, getTodayActivity } = useProgress();
  const [activeTab, setActiveTab] = useState<'programs' | 'live' | 'progress'>('programs')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [filteredPrograms, setFilteredPrograms] = useState(mockPrograms)

  useEffect(() => {
    let filtered = mockPrograms

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(program => program.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(program => 
        program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        program.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        program.instructor.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredPrograms(filtered)
  }, [searchQuery, selectedCategory])

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  const categories = [
    { id: 'all', name: 'All Programs', icon: Target },
    { id: 'yoga', name: 'Yoga', icon: Heart },
    { id: 'pilates', name: 'Pilates', icon: Users },
    { id: 'cardio', name: 'Cardio', icon: Flame },
    { id: 'strength', name: 'Strength', icon: Trophy }
  ]

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    })
  }

  const getSubscriptionBadge = (tier: string) => {
    const badges = {
      free: { text: 'FREE', color: 'bg-green-100 text-green-800' },
      standard: { text: 'STANDARD', color: 'bg-blue-100 text-blue-800' },
      premium: { text: 'PREMIUM', color: 'bg-purple-100 text-purple-800' }
    }
    return badges[tier as keyof typeof badges] || badges.free
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4 sm:py-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center sm:text-left"
            >
              <h1 className="text-2xl sm:text-3xl font-display font-bold text-gray-900">
                Welcome back, {user?.name}! 👋
              </h1>
              <p className="text-gray-600 mt-2 text-sm sm:text-base">
                Ready to continue your fitness journey?
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8"
        >
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-primary-100 rounded-lg">
                <Target className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Videos Completed</p>
                <p className="text-2xl font-bold text-gray-900">{userProgress?.totalVideosCompleted || getCompletedVideosCount()}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-secondary-100 rounded-lg">
                <Clock className="h-6 w-6 text-secondary-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Watch Time</p>
                <p className="text-2xl font-bold text-gray-900">
                  {userProgress ? 
                    `${Math.floor(userProgress.totalWatchTime / 3600)}h ${Math.floor((userProgress.totalWatchTime % 3600) / 60)}m` :
                    `${Math.floor(getTotalWatchTime() / 3600)}h ${Math.floor((getTotalWatchTime() % 3600) / 60)}m`
                  }
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Trophy className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Current Level</p>
                <p className="text-2xl font-bold text-gray-900">{userProgress?.level || 1}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 shadow-sm text-white">
            <div className="flex items-center">
              <div className="p-2 bg-white/20 rounded-lg">
                <Crown className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-white/90">{currentPlan?.name} Plan</p>
                <p className="text-2xl font-bold text-white">
                  {getRemainingUsage('programs') === 'unlimited' ? '∞' : getRemainingUsage('programs')}
                </p>
                <p className="text-xs text-white/80">Programs remaining</p>
              </div>
            </div>
            <Link 
              href="/subscription/manage"
              className="mt-3 inline-block text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition-colors"
            >
              Manage Plan
            </Link>
          </div>
        </motion.div>

        {/* Header Navigation */}
        <div className="bg-white shadow-sm border-b mb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-4 sm:space-x-8 overflow-x-auto scrollbar-hide">
              <Link href="/dashboard" className="text-blue-600 border-b-2 border-blue-600 pb-2 whitespace-nowrap">
                Dashboard
              </Link>
              <Link href="/programs" className="text-gray-600 hover:text-gray-900 pb-2 whitespace-nowrap">
                Programs
              </Link>
              <Link href="/progress" className="text-gray-600 hover:text-gray-900 pb-2 whitespace-nowrap">
                Progress
              </Link>
              <Link href="/subscription" className="text-gray-600 hover:text-gray-900 pb-2 whitespace-nowrap">
                Subscription
              </Link>
            </nav>
          </div>
        </div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm mb-8"
        >
          <div className="border-b border-gray-200">
            <nav className="flex space-x-4 sm:space-x-8 px-4 sm:px-6 overflow-x-auto scrollbar-hide">
              {[
                { id: 'programs', name: 'Programs', icon: Play },
                { id: 'live', name: 'Live Classes', icon: Calendar },
                { id: 'progress', name: 'Progress', icon: TrendingUp }
              ].map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="hidden sm:inline">{tab.name}</span>
                    <span className="sm:hidden">{tab.name.split(' ')[0]}</span>
                  </button>
                )
              })}
            </nav>
          </div>
        </motion.div>

        {/* Content based on active tab */}
        {activeTab === 'programs' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Search and Filters */}
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search programs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                  />
                </div>
                <div className="flex items-center space-x-2 sm:min-w-0">
                  <Filter className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm min-w-0 flex-1 sm:flex-initial"
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Programs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredPrograms.map((program, index) => {
                const badge = getSubscriptionBadge(program.requiredSubscription)
                return (
                  <motion.div
                    key={program.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <div className="relative">
                      <div className="aspect-video bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                        <Play className="h-12 w-12 text-primary-600" />
                      </div>
                      <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${badge.color}`}>
                        {badge.text}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-semibold text-lg text-gray-900 mb-2">
                        {program.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {program.description}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{program.duration}min</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span>{program.rating}</span>
                          </div>
                        </div>
                        <span className="capitalize px-2 py-1 bg-gray-100 rounded-full text-xs">
                          {program.level}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium text-gray-600">
                              {program.instructor.name.charAt(0)}
                            </span>
                          </div>
                          <span className="text-sm text-gray-600">
                            {program.instructor.name}
                          </span>
                        </div>
                        <button className="btn-primary text-sm px-4 py-2">
                          Start
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}

        {activeTab === 'live' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {mockLiveClasses.map((liveClass, index) => {
              const badge = getSubscriptionBadge(liveClass.requiredSubscription)
              return (
                <div key={liveClass.id} className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">
                        {liveClass.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {liveClass.description}
                      </p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${badge.color}`}>
                      {badge.text}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {formatTime(new Date(liveClass.scheduledAt))}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {liveClass.duration}min
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {liveClass.currentParticipants}/{liveClass.maxParticipants}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600 capitalize">
                        {liveClass.level}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-600">
                          {liveClass.instructor.name.charAt(0)}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600">
                        {liveClass.instructor.name}
                      </span>
                    </div>
                    <button className="btn-primary">
                      Join Live
                    </button>
                  </div>
                </div>
              )
            })}
          </motion.div>
        )}

        {activeTab === 'progress' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Your Progress
            </h3>
            <div className="text-center py-12">
              <TrendingUp className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">
                Progress tracking coming soon! Keep working out to see your stats.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;