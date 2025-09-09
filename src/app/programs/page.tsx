'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Clock, 
  Users, 
  Star, 
  Filter, 
  Search, 
  Heart,
  Lock,
  Crown,
  Zap,
  Target,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useAuth } from '@/contexts/AuthContext';
import { useVideo } from '@/contexts/VideoContext';
import Link from 'next/link';
import BackButton from '@/components/ui/BackButton';

interface Program {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: number; // in minutes
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: 'Yoga' | 'Pilates' | 'HIIT' | 'Strength' | 'Cardio' | 'Meditation';
  thumbnail: string;
  rating: number;
  totalRatings: number;
  isPremium: boolean;
  isNew: boolean;
  tags: string[];
  videoCount: number;
  equipment: string[];
}

const mockPrograms: Program[] = [
  {
    id: '1',
    title: 'Morning Yoga Flow',
    description: 'Start your day with energizing yoga sequences designed to awaken your body and mind.',
    instructor: 'Sarah Johnson',
    duration: 30,
    difficulty: 'Beginner',
    category: 'Yoga',
    thumbnail: '/api/placeholder/400/250',
    rating: 4.8,
    totalRatings: 1247,
    isPremium: false,
    isNew: false,
    tags: ['Morning', 'Flexibility', 'Mindfulness'],
    videoCount: 8,
    equipment: ['Yoga Mat']
  },
  {
    id: '2',
    title: 'HIIT Burn Challenge',
    description: 'High-intensity interval training to maximize calorie burn and build endurance.',
    instructor: 'Mike Chen',
    duration: 45,
    difficulty: 'Advanced',
    category: 'HIIT',
    thumbnail: '/api/placeholder/400/250',
    rating: 4.9,
    totalRatings: 892,
    isPremium: true,
    isNew: true,
    tags: ['Fat Burn', 'Cardio', 'Intense'],
    videoCount: 12,
    equipment: ['Dumbbells', 'Resistance Bands']
  },
  {
    id: '3',
    title: 'Pilates Core Strength',
    description: 'Build a strong, stable core with targeted Pilates exercises.',
    instructor: 'Emma Rodriguez',
    duration: 25,
    difficulty: 'Intermediate',
    category: 'Pilates',
    thumbnail: '/api/placeholder/400/250',
    rating: 4.7,
    totalRatings: 654,
    isPremium: true,
    isNew: false,
    tags: ['Core', 'Stability', 'Posture'],
    videoCount: 6,
    equipment: ['Pilates Ball']
  },
  {
    id: '4',
    title: 'Beginner Strength Training',
    description: 'Learn proper form and build foundational strength with this comprehensive program.',
    instructor: 'David Kim',
    duration: 40,
    difficulty: 'Beginner',
    category: 'Strength',
    thumbnail: '/api/placeholder/400/250',
    rating: 4.6,
    totalRatings: 1089,
    isPremium: false,
    isNew: false,
    tags: ['Strength', 'Form', 'Foundation'],
    videoCount: 10,
    equipment: ['Dumbbells', 'Bench']
  },
  {
    id: '5',
    title: 'Mindful Meditation',
    description: 'Reduce stress and improve focus with guided meditation sessions.',
    instructor: 'Lisa Park',
    duration: 15,
    difficulty: 'Beginner',
    category: 'Meditation',
    thumbnail: '/api/placeholder/400/250',
    rating: 4.9,
    totalRatings: 2156,
    isPremium: true,
    isNew: true,
    tags: ['Mindfulness', 'Stress Relief', 'Focus'],
    videoCount: 5,
    equipment: []
  },
  {
    id: '6',
    title: 'Cardio Dance Party',
    description: 'Fun, high-energy dance workouts that make cardio feel like a celebration.',
    instructor: 'Maria Santos',
    duration: 35,
    difficulty: 'Intermediate',
    category: 'Cardio',
    thumbnail: '/api/placeholder/400/250',
    rating: 4.8,
    totalRatings: 743,
    isPremium: false,
    isNew: false,
    tags: ['Dance', 'Fun', 'Energy'],
    videoCount: 9,
    equipment: []
  }
];

const ProgramsPage: React.FC = () => {
  const { user } = useAuth();
  const { currentPlan, checkAccess } = useSubscription();
  const { getProgramProgress } = useVideo();
  const [programs, setPrograms] = useState<Program[]>(mockPrograms);
  const [filteredPrograms, setFilteredPrograms] = useState<Program[]>(mockPrograms);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['All', 'Yoga', 'Pilates', 'HIIT', 'Strength', 'Cardio', 'Meditation'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  useEffect(() => {
    let filtered = programs;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(program =>
        program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        program.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        program.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(program => program.category === selectedCategory);
    }

    // Filter by difficulty
    if (selectedDifficulty !== 'All') {
      filtered = filtered.filter(program => program.difficulty === selectedDifficulty);
    }

    // Filter by subscription access
    if (currentPlan?.id === 'free') {
      filtered = filtered.filter(program => !program.isPremium);
    }

    setFilteredPrograms(filtered);
  }, [searchQuery, selectedCategory, selectedDifficulty, programs, currentPlan]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Yoga': return <Target className="w-4 h-4" />;
      case 'Pilates': return <Zap className="w-4 h-4" />;
      case 'HIIT': return <TrendingUp className="w-4 h-4" />;
      case 'Strength': return <Crown className="w-4 h-4" />;
      case 'Cardio': return <Heart className="w-4 h-4" />;
      case 'Meditation': return <Star className="w-4 h-4" />;
      default: return <Play className="w-4 h-4" />;
    }
  };

  const canAccessProgram = (program: Program) => {
    if (!program.isPremium) return true;
    return checkAccess('premiumContent');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <BackButton href="/dashboard" label="Back to Dashboard" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Workout Programs</h1>
          <p className="text-gray-600">
            Discover expertly crafted fitness programs designed to help you reach your goals
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search programs, instructors, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-gray-200"
            >
              <div className="grid md:grid-cols-2 gap-4">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Difficulty Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {difficulties.map(difficulty => (
                      <option key={difficulty} value={difficulty}>{difficulty}</option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrograms.map((program, index) => {
            const hasAccess = canAccessProgram(program);
            
            return (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 ${!hasAccess ? 'opacity-75' : ''}`}
              >
                {/* Thumbnail */}
                <div className="relative">
                  <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                    <Play className="w-16 h-16 text-white opacity-80" />
                  </div>
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    {program.isNew && (
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                        New
                      </span>
                    )}
                    {program.isPremium && (
                      <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-medium flex items-center">
                        <Crown className="w-3 h-3 mr-1" />
                        Premium
                      </span>
                    )}
                  </div>

                  {/* Access Overlay */}
                  {!hasAccess && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <div className="text-center text-white">
                        <Lock className="w-8 h-8 mx-auto mb-2" />
                        <p className="text-sm font-medium">Premium Required</p>
                      </div>
                    </div>
                  )}

                  {/* Duration */}
                  <div className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {program.duration}min
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getDifficultyColor(program.difficulty)}`}>
                      {program.difficulty}
                    </span>
                    <div className="flex items-center text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">
                        {program.rating} ({program.totalRatings})
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{program.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{program.description}</p>

                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Users className="w-4 h-4 mr-1" />
                    <span className="mr-4">{program.instructor}</span>
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{program.videoCount} videos</span>
                  </div>

                  {/* Progress Bar */}
                  {hasAccess && (() => {
                    const progress = getProgramProgress(program.id);
                    return (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Progress</span>
                          <span>{Math.round(progress.percentage)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {program.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Button */}
                  {hasAccess ? (
                    <Link
                      href={`/programs/${program.id}`}
                      className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Start Program
                    </Link>
                  ) : (
                    <Link
                      href="/subscription"
                      className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-2 px-4 rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-colors flex items-center justify-center"
                    >
                      <Crown className="w-4 h-4 mr-2" />
                      Upgrade to Access
                    </Link>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredPrograms.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No programs found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or filters to find more programs.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedDifficulty('All');
              }}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProgramsPage;