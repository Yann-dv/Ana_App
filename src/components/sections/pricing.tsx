'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Check, Crown, Star, Zap } from 'lucide-react'

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    interval: 'forever',
    description: 'Perfect for getting started with basic workouts',
    icon: Star,
    color: 'from-gray-400 to-gray-500',
    features: [
      '5 free workouts per month',
      'Basic yoga and meditation',
      'Community access',
      'Progress tracking',
      'Mobile app access'
    ],
    limitations: [
      'Limited workout library',
      'No live classes',
      'No offline downloads',
      'Basic support only'
    ],
    cta: 'Get Started Free',
    popular: false
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 19.99,
    interval: 'month',
    description: 'Everything you need for a complete fitness routine',
    icon: Zap,
    color: 'from-primary-500 to-primary-600',
    features: [
      'Unlimited workout access',
      'All yoga, pilates & HIIT classes',
      'Live classes (5 per month)',
      'Offline downloads',
      'Personalized programs',
      'Progress analytics',
      'Email support',
      'HD video quality'
    ],
    limitations: [],
    cta: 'Start Standard Plan',
    popular: true
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 29.99,
    interval: 'month',
    description: 'The ultimate fitness experience with exclusive content',
    icon: Crown,
    color: 'from-secondary-500 to-accent-500',
    features: [
      'Everything in Standard',
      'Unlimited live classes',
      'Exclusive premium content',
      '1-on-1 virtual coaching sessions',
      'Custom meal plans',
      'Advanced analytics',
      'Priority support',
      '4K video quality',
      'Early access to new content',
      'Exclusive community access'
    ],
    limitations: [],
    cta: 'Go Premium',
    popular: false
  }
]

const faqs = [
  {
    question: 'Can I cancel my subscription anytime?',
    answer: 'Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period.'
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes! We offer a 7-day free trial for both Standard and Premium plans. No credit card required to start.'
  },
  {
    question: 'Can I switch between plans?',
    answer: 'Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect immediately.'
  },
  {
    question: 'Do you offer student discounts?',
    answer: 'Yes, we offer a 50% discount for students with a valid student ID. Contact support to apply for the discount.'
  }
]

export function Pricing() {
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
            Choose Your
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent"> Fitness Plan</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Start your transformation today with a plan that fits your goals and budget. 
            All plans include our mobile app and progress tracking.
          </p>
          <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            7-day free trial • No credit card required
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => {
            const Icon = plan.icon
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative bg-white rounded-3xl shadow-sm border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  plan.popular 
                    ? 'border-primary-500 ring-4 ring-primary-100' 
                    : 'border-gray-200 hover:border-primary-300'
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-primary-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="p-8">
                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <div className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {plan.description}
                    </p>
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-display font-bold text-gray-900">
                        ${plan.price}
                      </span>
                      <span className="text-gray-600 ml-2">/{plan.interval}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Link
                    href={plan.id === 'free' ? '/register' : `/register?plan=${plan.id}`}
                    className={`w-full btn text-center block ${
                      plan.popular 
                        ? 'btn-primary' 
                        : 'btn-outline'
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 text-center mb-12">
            Frequently Asked Questions
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <h4 className="font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-3xl p-8 lg:p-12 text-white">
            <h3 className="text-2xl sm:text-3xl font-display font-bold mb-4">
              Still Have Questions?
            </h3>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Our support team is here to help you choose the perfect plan for your fitness journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-primary-600 hover:bg-gray-50 px-8 py-4 rounded-lg font-semibold transition-colors"
              >
                Contact Support
              </Link>
              <Link
                href="/register"
                className="border border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-lg font-semibold transition-colors"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}