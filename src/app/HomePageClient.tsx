'use client'

import { useState, useEffect } from 'react'
import { LoadingScreen } from '@/components/sections/LoadingScreen'
import { HeroSection } from '@/components/sections/HeroSection'
import { PhilosophySection } from '@/components/sections/PhilosophySection'
import { DestinationsSection } from '@/components/sections/DestinationsSection'
import { CollectionsSection } from '@/components/sections/CollectionsSection'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { FinalCTA } from '@/components/sections/FinalCTA'
import { InstagramSection } from '@/components/sections/InstagramSection'
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
  const GATE_KEY = 'vilasa-entered-at'
  const GATE_TTL = 24 * 60 * 60 * 1000 // 24 hours

  const hasRecentEntry = () => {
    try {
      const ts = localStorage.getItem(GATE_KEY)
      return ts ? Date.now() - Number(ts) < GATE_TTL : false
    } catch {
      return false
    }
  }

  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (hasRecentEntry()) setLoaded(true)
  }, [])

  const handleEntered = () => {
    try { localStorage.setItem(GATE_KEY, String(Date.now())) } catch { /* */ }
    setLoaded(true)
  }

  return (
    <>
      {!loaded && <LoadingScreen onComplete={handleEntered} />}
      {loaded && (
        <>
          <HeroSection homePage={homePage} siteSettings={siteSettings} />
          <InstagramSection />
          <PhilosophySection homePage={homePage} />
          <div id="destinations">
            <DestinationsSection destinations={destinations} />
          </div>
          <div id="collections">
            <CollectionsSection
              collections={collections}
              heading={homePage?.collectionsHeading}
              headingItalic={homePage?.collectionsHeadingItalic}
              subtext={homePage?.collectionsSubtext}
            />
          </div>
          <ProcessSection />
          <FinalCTA homePage={homePage} siteSettings={siteSettings} />
        </>
      )}
    </>
  )
}
