'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Play, Star, Users, ArrowRight } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-secondary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-accent-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6"
            >
              <Star className="w-4 h-4 mr-2 fill-current" />
              Join 1M+ fitness enthusiasts
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-6 leading-tight"
            >
              Transform Your
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent"> Body & Mind</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              Access thousands of yoga, pilates, and fitness classes from world-class instructors. 
              Train anywhere, anytime with personalized programs designed for your goals.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-wrap justify-center lg:justify-start gap-6 mb-8"
            >
              <div className="flex items-center text-gray-600">
                <Users className="w-5 h-5 mr-2 text-primary-500" />
                <span className="font-semibold text-gray-900">1M+</span>
                <span className="ml-1">Active Users</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Play className="w-5 h-5 mr-2 text-primary-500" />
                <span className="font-semibold text-gray-900">5000+</span>
                <span className="ml-1">Workouts</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Star className="w-5 h-5 mr-2 text-primary-500 fill-current" />
                <span className="font-semibold text-gray-900">4.9</span>
                <span className="ml-1">Rating</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link
                href="/register"
                className="btn-primary text-lg px-8 py-4 group"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/programs"
                className="btn-outline text-lg px-8 py-4 group"
              >
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Link>
            </motion.div>
          </motion.div>

          {/* Hero Image/Video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              {/* Placeholder for hero video/image */}
              <div className="aspect-[4/3] bg-gradient-to-br from-primary-400 via-secondary-400 to-accent-400 flex items-center justify-center">
                <div className="text-center text-white">
                  <Play className="w-20 h-20 mx-auto mb-4 opacity-80" />
                  <p className="text-lg font-medium">Watch Our Story</p>
                  <p className="text-sm opacity-80">2:30 min</p>
                </div>
              </div>
              
              {/* Floating Cards */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="absolute -left-4 top-1/4 bg-white rounded-xl p-4 shadow-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Workout Complete!</p>
                    <p className="text-sm text-gray-600">45 min • 320 calories</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="absolute -right-4 bottom-1/4 bg-white rounded-xl p-4 shadow-lg"
              >
                <div className="text-center">
                  <p className="font-semibold text-gray-900">7-Day Streak!</p>
                  <div className="flex space-x-1 mt-2">
                    {[...Array(7)].map((_, i) => (
                      <div key={i} className="w-3 h-3 bg-primary-500 rounded-full"></div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}