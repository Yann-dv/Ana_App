'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Play, Clock, Users, Star, ArrowRight } from 'lucide-react'

const programs = [
  {
    id: 'yoga-flow',
    title: 'Yoga Flow',
    description: 'Find your inner peace with gentle flows and mindful movements',
    category: 'Yoga',
    duration: '20-60 min',
    level: 'All Levels',
    instructor: 'Sarah Chen',
    rating: 4.9,
    students: '125K',
    image: 'from-green-400 to-teal-500',
    icon: '🧘‍♀️'
  },
  {
    id: 'pilates-core',
    title: 'Pilates Core',
    description: 'Strengthen your core and improve posture with targeted exercises',
    category: 'Pilates',
    duration: '15-45 min',
    level: 'Beginner',
    instructor: 'Maria Rodriguez',
    rating: 4.8,
    students: '89K',
    image: 'from-purple-400 to-pink-500',
    icon: '💪'
  },
  {
    id: 'hiit-cardio',
    title: 'HIIT Cardio',
    description: 'High-intensity workouts to boost metabolism and burn calories',
    category: 'HIIT',
    duration: '10-30 min',
    level: 'Intermediate',
    instructor: 'Jake Thompson',
    rating: 4.7,
    students: '156K',
    image: 'from-red-400 to-orange-500',
    icon: '🔥'
  },
  {
    id: 'strength-training',
    title: 'Strength Training',
    description: 'Build lean muscle and increase strength with guided workouts',
    category: 'Strength',
    duration: '30-60 min',
    level: 'Advanced',
    instructor: 'Alex Johnson',
    rating: 4.9,
    students: '98K',
    image: 'from-blue-400 to-indigo-500',
    icon: '🏋️‍♂️'
  },
  {
    id: 'meditation',
    title: 'Mindful Meditation',
    description: 'Reduce stress and improve mental clarity with guided sessions',
    category: 'Meditation',
    duration: '5-30 min',
    level: 'All Levels',
    instructor: 'Emma Wilson',
    rating: 4.8,
    students: '203K',
    image: 'from-indigo-400 to-purple-500',
    icon: '🧠'
  },
  {
    id: 'dance-fitness',
    title: 'Dance Fitness',
    description: 'Fun, energetic dance workouts that make fitness feel like a party',
    category: 'Dance',
    duration: '20-45 min',
    level: 'All Levels',
    instructor: 'Carlos Martinez',
    rating: 4.9,
    students: '167K',
    image: 'from-yellow-400 to-red-500',
    icon: '💃'
  }
]

export function Programs() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-6">
            Discover Your Perfect
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent"> Workout</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            From gentle yoga flows to high-intensity training, find programs designed 
            for every fitness level and goal.
          </p>
          <Link
            href="/programs"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold group"
          >
            View All Programs
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                {/* Program Image */}
                <div className={`h-48 bg-gradient-to-br ${program.image} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl mb-4">{program.icon}</div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                      {program.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
                      <Play className="w-5 h-5 text-gray-900 ml-0.5" />
                    </button>
                  </div>
                </div>

                {/* Program Content */}
                <div className="p-6">
                  <h3 className="text-xl font-display font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {program.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {program.description}
                  </p>

                  {/* Program Meta */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {program.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {program.students}
                    </div>
                  </div>

                  {/* Instructor & Rating */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{program.instructor}</p>
                      <p className="text-xs text-gray-500">{program.level}</p>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-900 ml-1">{program.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-3xl p-8 lg:p-12 text-white">
            <h3 className="text-2xl sm:text-3xl font-display font-bold mb-4">
              Ready to Start Your Fitness Journey?
            </h3>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Join millions of users who have transformed their lives with our expert-led programs. 
              Start your free trial today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="bg-white text-primary-600 hover:bg-gray-50 px-8 py-4 rounded-lg font-semibold transition-colors"
              >
                Start Free Trial
              </Link>
              <Link
                href="/programs"
                className="border border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-lg font-semibold transition-colors"
              >
                Browse Programs
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}