import { sanityFetch } from '../../../sanity/lib/client'
import { allDestinationsQuery, homePageQuery } from '../../../sanity/lib/queries'
import type { Destination, HomePage } from '@/types'
import { DestinationsListPage } from './DestinationsListPage'

export default async function DestinationsPage() {
  const [destinations, homePage] = await Promise.all([
    sanityFetch<Destination[]>({ query: allDestinationsQuery, tags: ['destination'] }),
    sanityFetch<HomePage | null>({ query: homePageQuery, tags: ['homePage'] }),
  ])

  return (
    <DestinationsListPage
      destinations={destinations}
      heading={homePage?.destinationsHeading}
      headingItalic={homePage?.destinationsHeadingItalic}
    />
  )
}
