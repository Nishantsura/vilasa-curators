'use client'

import { useState } from 'react'
import { LoadingScreen } from '@/components/sections/LoadingScreen'
import { HeroSection } from '@/components/sections/HeroSection'
import { PhilosophySection } from '@/components/sections/PhilosophySection'
import { DestinationsSection } from '@/components/sections/DestinationsSection'
import { CollectionsSection } from '@/components/sections/CollectionsSection'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { FinalCTA } from '@/components/sections/FinalCTA'

export default function HomePage() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      {loaded && (
        <>
          <HeroSection />
          <PhilosophySection />
          <DestinationsSection />
          <CollectionsSection />
          <ProcessSection />
          <FinalCTA />
        </>
      )}
    </>
  )
}
