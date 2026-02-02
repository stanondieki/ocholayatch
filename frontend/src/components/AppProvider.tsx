'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { LoadingScreen } from '@/components/LoadingScreen'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ScrollToTop } from '@/components/ScrollToTop'
import { YachtDetailModal } from '@/components/YachtDetailModal'
import { Yacht } from '@/types'

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [selectedYacht, setSelectedYacht] = useState<Yacht | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname()

  const handleNavigate = (page: string) => {
    const routes: Record<string, string> = {
      home: '/',
      yachts: '/yachts',
      destinations: '/destinations',
      about: '/about',
      contact: '/contact',
      testimonials: '/testimonials',
      blog: '/blog',
      services: '/services'
    }
    window.location.href = routes[page] || '/'
  }

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />
  }

  return (
    <div className="min-h-screen">
      <Navbar onNavigate={handleNavigate} />
      {children}
      <Footer onNavigate={handleNavigate} />
      <ScrollToTop />
      {selectedYacht && (
        <YachtDetailModal yacht={selectedYacht} onClose={() => setSelectedYacht(null)} />
      )}
    </div>
  )
}
