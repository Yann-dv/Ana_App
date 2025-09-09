'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Sophie Martin',
    role: 'Marketing Manager',
    location: 'Paris, France',
    avatar: 'SM',
    rating: 5,
    text: "Ana Fitness has completely transformed my relationship with exercise. The variety of classes keeps me motivated, and I love being able to work out from home. I've lost 15 pounds and feel stronger than ever!",
    program: 'Yoga Flow & HIIT Combo',
    duration: '6 months'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Software Developer',
    location: 'San Francisco, USA',
    avatar: 'MC',
    rating: 5,
    text: "As someone who sits at a desk all day, Ana Fitness has been a game-changer. The short, effective workouts fit perfectly into my schedule. The instructors are amazing and the progress tracking keeps me accountable.",
    program: 'Strength Training',
    duration: '4 months'
  },
  {
    id: 3,
    name: 'Emma Thompson',
    role: 'New Mom',
    location: 'London, UK',
    avatar: 'ET',
    rating: 5,
    text: "After having my baby, I needed something flexible that I could do at home. The prenatal and postnatal programs were exactly what I needed. I'm back to feeling like myself again!",
    program: 'Postnatal Recovery',
    duration: '8 months'
  },
  {
    id: 4,
    name: 'Carlos Rodriguez',
    role: 'Personal Trainer',
    location: 'Madrid, Spain',
    avatar: 'CR',
    rating: 5,
    text: "Even as a fitness professional, I use Ana Fitness for my own workouts. The quality of instruction is top-notch, and I often recommend it to my clients for supplemental training.",
    program: 'Advanced HIIT',
    duration: '1 year'
  },
  {
    id: 5,
    name: 'Priya Patel',
    role: 'Yoga Enthusiast',
    location: 'Mumbai, India',
    avatar: 'PP',
    rating: 5,
    text: "The meditation and yoga classes have helped me manage stress and find balance in my busy life. The instructors create such a peaceful atmosphere, even through the screen.",
    program: 'Mindful Yoga',
    duration: '10 months'
  },
  {
    id: 6,
    name: 'David Kim',
    role: 'College Student',
    location: 'Seoul, South Korea',
    avatar: 'DK',
    rating: 5,
    text: "The student pricing made it affordable for me to access world-class fitness content. I've built muscle, improved my endurance, and made fitness a sustainable part of my routine.",
    program: 'Strength & Cardio Mix',
    duration: '7 months'
  }
]

const achievements = [
  { metric: '2M+', label: 'Workouts Completed' },
  { metric: '500K+', label: 'Pounds Lost' },
  { metric: '1M+', label: 'Hours Meditated' },
  { metric: '95%', label: 'User Satisfaction' }
]

export function Testimonials() {
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
            Real Stories from
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent"> Real People</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of people who have transformed their lives with Ana Fitness. 
            Here's what our community has to say about their journey.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-gray-50 rounded-2xl p-6 hover:bg-white hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1 border border-transparent hover:border-gray-200">
                {/* Quote Icon */}
                <div className="flex justify-between items-start mb-4">
                  <Quote className="w-8 h-8 text-primary-400" />
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>

                {/* User Info */}
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-xs text-gray-500">{testimonial.location}</p>
                  </div>
                </div>

                {/* Program Info */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Program:</span>
                    <span className="font-medium text-gray-900">{testimonial.program}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium text-gray-900">{testimonial.duration}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-3xl p-8 lg:p-12 text-white"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-display font-bold mb-4">
              Our Community's Achievements
            </h3>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Together, we've accomplished incredible milestones. Be part of our success story.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl lg:text-4xl font-display font-bold mb-2">
                  {achievement.metric}
                </div>
                <div className="text-sm lg:text-base opacity-90">
                  {achievement.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}