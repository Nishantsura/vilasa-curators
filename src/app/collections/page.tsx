import { sanityFetch } from '../../../sanity/lib/client'
import { allCollectionsQuery, homePageQuery } from '../../../sanity/lib/queries'
import type { Collection, HomePage } from '@/types'
import { CollectionsListPage } from './CollectionsListPage'

export default async function CollectionsPage() {
  const [collections, homePage] = await Promise.all([
    sanityFetch<Collection[]>({ query: allCollectionsQuery, tags: ['collection'] }),
    sanityFetch<HomePage | null>({ query: homePageQuery, tags: ['homePage'] }),
  ])

  return (
    <CollectionsListPage
      collections={collections}
      heading={homePage?.collectionsHeading}
      headingItalic={homePage?.collectionsHeadingItalic}
    />
  )
}
