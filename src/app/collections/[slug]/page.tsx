import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { sanityFetch } from '../../../../sanity/lib/client'
import { allCollectionsQuery, collectionBySlugQuery } from '../../../../sanity/lib/queries'
import { CollectionDetail } from './CollectionDetail'
import type { Collection } from '@/types'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const collections = await sanityFetch<Collection[]>({
    query: allCollectionsQuery,
    tags: ['collection'],
  })
  return collections.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const collection = await sanityFetch<Collection | null>({
    query: collectionBySlugQuery,
    params: { slug },
    tags: ['collection'],
  })
  if (!collection) return {}
  return {
    title: `${collection.title} — Vilasa Curators`,
    description: collection.description,
  }
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params
  const collection = await sanityFetch<Collection | null>({
    query: collectionBySlugQuery,
    params: { slug },
    tags: ['collection'],
  })
  if (!collection) notFound()

  return <CollectionDetail collection={collection} />
}
