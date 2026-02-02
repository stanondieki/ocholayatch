'use client'

import { Hero } from '@/components/Hero'
import { FeaturedYachts } from '@/components/FeaturedYachts'
import { Destinations } from '@/components/Destinations'
import { SearchSection } from '@/components/SearchSection'
import { ParallaxSection } from '@/components/ParallaxSection'
import { HorizontalYachtShowcase } from '@/components/HorizontalYachtShowcase'
import { SplitScreenFeature } from '@/components/SplitScreenFeature'
import { PerformanceStats } from '@/components/PerformanceStats'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <SearchSection />
      <FeaturedYachts />
      <ParallaxSection />
      <Destinations />
      <HorizontalYachtShowcase />
      <SplitScreenFeature />
      <PerformanceStats />
    </main>
  )
}

