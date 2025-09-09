import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'
import { SubscriptionProvider } from '@/contexts/SubscriptionContext'
import { VideoProvider } from '@/contexts/VideoContext'
import { ProgressProvider } from '@/contexts/ProgressContext'
import { Toaster } from 'react-hot-toast'
import PWAProvider from '@/components/PWAProvider'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NODE_ENV === 'production' ? 'https://ana-fitness.com' : 'http://localhost:3000'),
  title: 'Ana Fitness - Transform Your Body & Mind',
  description: 'Join millions in achieving your fitness goals with personalized yoga, pilates, and gym classes. Stream live and on-demand workouts anywhere.',
  keywords: 'fitness, yoga, pilates, gym, workout, health, wellness, online classes',
  authors: [{ name: 'Ana Fitness Team' }],
  manifest: '/manifest.json',
  icons: {
    icon: ['/icon-192x192.svg', '/icon-512x512.svg'],
    apple: '/icon-192x192.svg',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Ana Fitness',
  },
  other: {
    'mobile-web-app-capable': 'yes',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: 'Ana Fitness',
    title: 'Ana Fitness - Transform Your Body & Mind',
    description: 'Join millions in achieving your fitness goals with personalized yoga, pilates, and gym classes.',
  },
  twitter: {
    card: 'summary',
    title: 'Ana Fitness - Transform Your Body & Mind',
    description: 'Join millions in achieving your fitness goals with personalized yoga, pilates, and gym classes.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased bg-gray-50 text-gray-900">
        <PWAProvider>
          <AuthProvider>
            <SubscriptionProvider>
              <VideoProvider>
                <ProgressProvider>
                  <div className="min-h-screen flex flex-col">
                    {children}
                  </div>
                  <Toaster />
                </ProgressProvider>
              </VideoProvider>
            </SubscriptionProvider>
          </AuthProvider>
        </PWAProvider>
      </body>
    </html>
  )
}