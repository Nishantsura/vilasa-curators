import { sanityFetch } from '../../../sanity/lib/client'
import { allDestinationsQuery } from '../../../sanity/lib/queries'
import type { Destination } from '@/types'
import { DestinationsListPage } from './DestinationsListPage'

export default async function DestinationsPage() {
  const destinations = await sanityFetch<Destination[]>({
    query: allDestinationsQuery,
    tags: ['destination'],
  })

  return <DestinationsListPage destinations={destinations} />
}
