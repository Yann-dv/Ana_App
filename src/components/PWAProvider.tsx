'use client'

import { useEffect, useState } from 'react'
import { registerSW, setupInstallPrompt, setupNetworkMonitoring } from '@/lib/pwa'
import { toast } from 'react-hot-toast'
import InstallPrompt from './InstallPrompt'

interface PWAProviderProps {
  children: React.ReactNode
}

export default function PWAProvider({ children }: PWAProviderProps) {
  const [isOnline, setIsOnline] = useState(true)
  const [updateAvailable, setUpdateAvailable] = useState(false)

  useEffect(() => {
    // Register service worker
    registerSW()

    // Setup install prompt
    setupInstallPrompt()

    // Setup network monitoring
    const cleanup = setupNetworkMonitoring(
      () => {
        setIsOnline(true)
        toast.success('Connection restored!')
      },
      () => {
        setIsOnline(false)
        toast.error('You are offline. Some features may be limited.')
      }
    )

    // Check for service worker updates
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        setUpdateAvailable(true)
        toast.success('App updated! Refresh to see changes.', {
          duration: 5000,
        })
      })
    }

    // Initial online status
    setIsOnline(navigator.onLine)

    return cleanup
  }, [])

  return (
    <>
      {children}
      <InstallPrompt />
      
      {/* Offline indicator */}
      {!isOnline && (
        <div className="fixed bottom-4 left-4 right-4 z-50 bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-lg text-center">
          <span className="text-sm font-medium">You're offline. Some features may be limited.</span>
        </div>
      )}
      
      {/* Update available indicator */}
      {updateAvailable && (
        <div className="fixed bottom-4 left-4 right-4 z-50 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg text-center">
          <span className="text-sm font-medium">App update available! </span>
          <button 
            onClick={() => window.location.reload()}
            className="underline font-semibold ml-1"
          >
            Refresh now
          </button>
        </div>
      )}
    </>
  )
}