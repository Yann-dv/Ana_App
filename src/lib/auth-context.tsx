'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, AuthContextType } from '@/types/auth'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('auth_token')
      if (token) {
        // Validate token with mock service for static deployment
        const { mockVerifyToken } = await import('@/lib/mock-auth')
        const result = await mockVerifyToken(token)
        
        if (result.valid && result.user) {
          setUser(result.user)
        } else {
          localStorage.removeItem('auth_token')
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      // Use mock authentication for static deployment
      const { mockLogin } = await import('@/lib/mock-auth')
      const result = await mockLogin(email, password)
      
      if (result.success && result.user && result.token) {
        localStorage.setItem('auth_token', result.token)
        setUser(result.user)
        return { success: true }
      } else {
        return { success: false, error: result.error || 'Login failed' }
      }
    } catch (error) {
      return { success: false, error: 'Login failed' }
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      // Use mock authentication for static deployment
      const { mockRegister } = await import('@/lib/mock-auth')
      const result = await mockRegister(name, email, password)
      
      if (result.success && result.user && result.token) {
        localStorage.setItem('auth_token', result.token)
        setUser(result.user)
        return { success: true }
      } else {
        return { success: false, error: result.error || 'Registration failed' }
      }
    } catch (error) {
      return { success: false, error: 'Registration failed' }
    }
  }

  const logout = () => {
    localStorage.removeItem('auth_token')
    setUser(null)
  }

  const updateSubscription = (subscription: User['subscription']) => {
    if (user) {
      setUser({ ...user, subscription })
    }
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateSubscription,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}