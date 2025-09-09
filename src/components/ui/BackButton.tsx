'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'

interface BackButtonProps {
  href?: string
  label?: string
  className?: string
}

export function BackButton({ href, label = 'Back', className = '' }: BackButtonProps) {
  const router = useRouter()

  const handleClick = () => {
    if (href) {
      router.push(href)
    } else {
      router.back()
    }
  }

  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className={`inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg shadow-sm transition-all duration-200 ${className}`}
    >
      <ArrowLeft className="w-4 h-4 mr-2" />
      {label}
    </motion.button>
  )
}

export default BackButton