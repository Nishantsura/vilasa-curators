import { notFound } from 'next/navigation'
import { COLLECTIONS } from '@/lib/constants'
import type { Metadata } from 'next'
import { CollectionDetail } from './CollectionDetail'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return COLLECTIONS.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const collection = COLLECTIONS.find((c) => c.slug === slug)
  if (!collection) return {}
  return {
    title: `${collection.title} — Vilasa Curators`,
    description: collection.description,
  }
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params
  const collection = COLLECTIONS.find((c) => c.slug === slug)
  if (!collection) notFound()

  return <CollectionDetail collection={collection} />
}
