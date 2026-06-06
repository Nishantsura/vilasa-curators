import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { sanityFetch } from '../../../../sanity/lib/client'
import { allDestinationsQuery, destinationBySlugQuery } from '../../../../sanity/lib/queries'
import { DestinationDetail } from './DestinationDetail'
import type { Destination } from '@/types'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const destinations = await sanityFetch<Destination[]>({
    query: allDestinationsQuery,
    tags: ['destination'],
  })
  return destinations.map((d) => ({ slug: d.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const dest = await sanityFetch<Destination | null>({
    query: destinationBySlugQuery,
    params: { slug },
    tags: ['destination'],
  })
  if (!dest) return {}
  return {
    title: `${dest.name} — Vilasa Curators`,
    description: dest.tagline,
  }
}

export default async function DestinationPage({ params }: Props) {
  const { slug } = await params
  const dest = await sanityFetch<Destination | null>({
    query: destinationBySlugQuery,
    params: { slug },
    tags: ['destination'],
  })
  if (!dest) notFound()

  return <DestinationDetail destination={dest} />
}
