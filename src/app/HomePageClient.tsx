'use client'

import { useState } from 'react'
import { LoadingScreen } from '@/components/sections/LoadingScreen'
import { HeroSection } from '@/components/sections/HeroSection'
import { PhilosophySection } from '@/components/sections/PhilosophySection'
import { DestinationsSection } from '@/components/sections/DestinationsSection'
import { CollectionsSection } from '@/components/sections/CollectionsSection'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { FinalCTA } from '@/components/sections/FinalCTA'
import type { Collection, Destination, HomePage, SiteSettings } from '@/types'

interface HomePageClientProps {
  collections: Collection[]
  destinations: Destination[]
  homePage: HomePage | null
  siteSettings: SiteSettings | null
}

export function HomePageClient({
  collections,
  destinations,
  homePage,
  siteSettings,
}: HomePageClientProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      {loaded && (
        <>
          <HeroSection homePage={homePage} siteSettings={siteSettings} />
          <PhilosophySection homePage={homePage} />
          <DestinationsSection destinations={destinations} />
          <CollectionsSection
            collections={collections}
            heading={homePage?.collectionsHeading}
            headingItalic={homePage?.collectionsHeadingItalic}
            subtext={homePage?.collectionsSubtext}
          />
          <ProcessSection />
          <FinalCTA homePage={homePage} siteSettings={siteSettings} />
        </>
      )}
    </>
  )
}
