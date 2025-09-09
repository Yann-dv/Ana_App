'use client'

import { useState, useEffect } from 'react'
import { Download, X } from 'lucide-react'
import { showInstallPrompt, isAppInstalled } from '@/lib/pwa'

export default function InstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    // Check if app is already installed or user dismissed prompt
    const isDismissed = localStorage.getItem('pwa-install-dismissed') === 'true'
    const isInstalled = isAppInstalled()
    
    if (!isInstalled && !isDismissed) {
      // Show prompt after a delay
      const timer = setTimeout(() => {
        setShowPrompt(true)
      }, 3000)
      
      return () => clearTimeout(timer)
    }
  }, [])

  const handleInstall = async () => {
    const installed = await showInstallPrompt()
    if (installed) {
      setShowPrompt(false)
    }
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    setDismissed(true)
    localStorage.setItem('pwa-install-dismissed', 'true')
  }

  if (!showPrompt || dismissed) {
    return null
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-4 rounded-lg shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">Install Ana Fitness</h3>
            <p className="text-xs opacity-90">Get the full app experience with offline access</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleInstall}
            className="bg-white text-primary-600 px-3 py-1 rounded text-xs font-medium hover:bg-gray-100 transition-colors"
          >
            Install
          </button>
          <button
            onClick={handleDismiss}
            className="p-1 hover:bg-white/20 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}