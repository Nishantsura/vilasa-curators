import { sanityFetch } from '../../sanity/lib/client'
import {
  allCollectionsQuery,
  allDestinationsQuery,
  homePageQuery,
  siteSettingsQuery,
} from '../../sanity/lib/queries'
import type { Collection, Destination, HomePage, SiteSettings } from '@/types'
import { HomePageClient } from './HomePageClient'

export default async function Page() {
  const [collections, destinations, homePage, siteSettings] = await Promise.all([
    sanityFetch<Collection[]>({ query: allCollectionsQuery, tags: ['collection'] }),
    sanityFetch<Destination[]>({ query: allDestinationsQuery, tags: ['destination'] }),
    sanityFetch<HomePage | null>({ query: homePageQuery, tags: ['homePage'] }),
    sanityFetch<SiteSettings | null>({ query: siteSettingsQuery, tags: ['siteSettings'] }),
  ])

  return (
    <HomePageClient
      collections={collections}
      destinations={destinations}
      homePage={homePage}
      siteSettings={siteSettings}
    />
  )
}
