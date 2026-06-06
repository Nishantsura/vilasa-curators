import { sanityFetch } from '../../../sanity/lib/client'
import { allCollectionsQuery } from '../../../sanity/lib/queries'
import type { Collection } from '@/types'
import { CollectionsListPage } from './CollectionsListPage'

export default async function CollectionsPage() {
  const collections = await sanityFetch<Collection[]>({
    query: allCollectionsQuery,
    tags: ['collection'],
  })

  return <CollectionsListPage collections={collections} />
}
