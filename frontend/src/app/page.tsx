'use client'

import { useState } from 'react'
import { Hero } from '@/components/Hero'
import { FeaturedYachts } from '@/components/FeaturedYachts'
import { Destinations } from '@/components/Destinations'
import { SearchSection } from '@/components/SearchSection'
import { ParallaxSection } from '@/components/ParallaxSection'
import { HorizontalYachtShowcase } from '@/components/HorizontalYachtShowcase'
import { SplitScreenFeature } from '@/components/SplitScreenFeature'
import { PerformanceStats } from '@/components/PerformanceStats'
import { Yacht } from '@/types'

interface HomePageProps {
  onYachtClick?: (yacht: Yacht) => void;
}

export default function HomePage({ onYachtClick }: HomePageProps) {
  return (
    <main>
      <Hero />
      <SearchSection />
      <FeaturedYachts onYachtClick={onYachtClick} />
      <ParallaxSection />
      <Destinations />
      <HorizontalYachtShowcase />
      <SplitScreenFeature />
      <PerformanceStats />
    </main>
  )
}

