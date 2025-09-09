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
        // Mock token validation for demo purposes
        if (token.startsWith('demo_token_')) {
          const mockUser: User = {
            id: '1',
            name: 'Demo User',
            email: 'demo@example.com',
            subscription: 'free',
            createdAt: new Date().toISOString(),
          }
          setUser(mockUser)
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
      // Mock authentication for demo purposes
      if (email && password) {
        const mockUser: User = {
          id: '1',
          name: 'Demo User',
          email: email,
          subscription: 'free',
          createdAt: new Date().toISOString(),
        }
        const mockToken = 'demo_token_' + Date.now()
        localStorage.setItem('auth_token', mockToken)
        setUser(mockUser)
        return { success: true }
      } else {
        return { success: false, error: 'Please enter email and password' }
      }
    } catch (error) {
      return { success: false, error: 'Login failed' }
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      // Mock registration for demo purposes
      if (name && email && password) {
        const mockUser: User = {
          id: '1',
          name: name,
          email: email,
          subscription: 'free',
          createdAt: new Date().toISOString(),
        }
        const mockToken = 'demo_token_' + Date.now()
        localStorage.setItem('auth_token', mockToken)
        setUser(mockUser)
        return { success: true }
      } else {
        return { success: false, error: 'Please fill in all fields' }
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