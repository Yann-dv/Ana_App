'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  Heart
} from 'lucide-react'

const navigation = {
  programs: [
    { name: 'Yoga', href: '/programs/yoga' },
    { name: 'Pilates', href: '/programs/pilates' },
    { name: 'HIIT', href: '/programs/hiit' },
    { name: 'Strength Training', href: '/programs/strength' },
    { name: 'Meditation', href: '/programs/meditation' },
    { name: 'Dance Fitness', href: '/programs/dance' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Instructors', href: '/instructors' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press', href: '/press' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ],
  support: [
    { name: 'Help Center', href: '/help' },
    { name: 'Getting Started', href: '/getting-started' },
    { name: 'Technical Support', href: '/support' },
    { name: 'Community Guidelines', href: '/guidelines' },
    { name: 'Safety', href: '/safety' },
    { name: 'Accessibility', href: '/accessibility' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Refund Policy', href: '/refunds' },
    { name: 'GDPR', href: '/gdpr' },
  ],
}

const socialLinks = [
  {
    name: 'Facebook',
    href: 'https://facebook.com/anafitness',
    icon: Facebook,
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/anafitness',
    icon: Twitter,
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/anafitness',
    icon: Instagram,
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/anafitness',
    icon: Youtube,
  },
]

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">A</span>
                  </div>
                  <span className="font-display font-bold text-2xl">Ana Fitness</span>
                </Link>

                <p className="text-gray-300 mb-6 leading-relaxed">
                  Transform your body and mind with our comprehensive fitness platform. 
                  Join millions of users worldwide in achieving their health and wellness goals.
                </p>

                {/* Contact Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-300">
                    <Mail className="w-5 h-5 mr-3 text-primary-400" />
                    <span>support@anafitness.com</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Phone className="w-5 h-5 mr-3 text-primary-400" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <MapPin className="w-5 h-5 mr-3 text-primary-400" />
                    <span>San Francisco, CA</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex space-x-4">
                  {socialLinks.map((social) => {
                    const Icon = social.icon
                    return (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors"
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    )
                  })}
                </div>
              </motion.div>
            </div>

            {/* Navigation Sections */}
            <div className="lg:col-span-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Programs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="font-semibold text-lg mb-4">Programs</h3>
                <ul className="space-y-3">
                  {navigation.programs.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-gray-300 hover:text-white transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Company */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="font-semibold text-lg mb-4">Company</h3>
                <ul className="space-y-3">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-gray-300 hover:text-white transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Support */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h3 className="font-semibold text-lg mb-4">Support</h3>
                <ul className="space-y-3">
                  {navigation.support.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-gray-300 hover:text-white transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Legal */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <h3 className="font-semibold text-lg mb-4">Legal</h3>
                <ul className="space-y-3">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-gray-300 hover:text-white transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 py-12"
        >
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-display font-bold mb-4">
              Stay Updated with Ana Fitness
            </h3>
            <p className="text-gray-300 mb-6">
              Get the latest workout tips, nutrition advice, and exclusive offers delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button className="btn-primary px-6 py-3 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 py-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Ana Fitness. All rights reserved.
            </p>
            <div className="flex items-center mt-4 md:mt-0">
              <span className="text-gray-400 text-sm mr-2">Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span className="text-gray-400 text-sm ml-2">for your wellness journey</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}