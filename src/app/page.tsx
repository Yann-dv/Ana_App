'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Play, Star, Users, Award, ArrowRight, Menu, X } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Hero } from '@/components/sections/hero'
import { Features } from '@/components/sections/features'
import { Programs } from '@/components/sections/programs'
import { Testimonials } from '@/components/sections/testimonials'
import { Pricing } from '@/components/sections/pricing'
import { Footer } from '@/components/layout/footer'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Features />
        <Programs />
        <Testimonials />
        <Pricing />
      </main>
      <Footer />
    </div>
  )
}