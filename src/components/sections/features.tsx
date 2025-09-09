'use client'

import { motion } from 'framer-motion'
import { 
  Play, 
  Users, 
  Calendar, 
  Trophy, 
  Smartphone, 
  Heart,
  Target,
  Clock,
  Star
} from 'lucide-react'

const features = [
  {
    icon: Play,
    title: 'Thousands of Workouts',
    description: 'Access our extensive library of yoga, pilates, HIIT, strength training, and meditation sessions.',
    color: 'from-primary-500 to-primary-600'
  },
  {
    icon: Users,
    title: 'Expert Instructors',
    description: 'Learn from certified professionals with years of experience in fitness and wellness.',
    color: 'from-secondary-500 to-secondary-600'
  },
  {
    icon: Calendar,
    title: 'Live Classes',
    description: 'Join real-time sessions with instructors and connect with our global fitness community.',
    color: 'from-accent-500 to-accent-600'
  },
  {
    icon: Target,
    title: 'Personalized Programs',
    description: 'Get custom workout plans tailored to your fitness level, goals, and available time.',
    color: 'from-green-500 to-green-600'
  },
  {
    icon: Smartphone,
    title: 'Train Anywhere',
    description: 'Download workouts for offline access and train at home, gym, or while traveling.',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: Trophy,
    title: 'Progress Tracking',
    description: 'Monitor your achievements, streaks, and improvements with detailed analytics.',
    color: 'from-purple-500 to-purple-600'
  }
]

const stats = [
  { label: 'Active Users', value: '1M+', icon: Users },
  { label: 'Workouts Available', value: '5,000+', icon: Play },
  { label: 'Countries', value: '150+', icon: Heart },
  { label: 'Average Rating', value: '4.9', icon: Star }
]

export function Features() {
  return (
    <section className="py-20 bg-white">
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
            Everything You Need to
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent"> Succeed</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive platform provides all the tools, guidance, and motivation 
            you need to achieve your fitness goals and maintain a healthy lifestyle.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-3xl p-8 lg:p-12"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 mb-4">
              Trusted by Millions Worldwide
            </h3>
            <p className="text-lg text-gray-600">
              Join our global community of fitness enthusiasts achieving their goals every day.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <Icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <div className="text-3xl font-display font-bold text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}