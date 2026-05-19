import { notFound } from 'next/navigation'
import { DESTINATIONS } from '@/lib/constants'
import type { Metadata } from 'next'
import { DestinationDetail } from './DestinationDetail'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return DESTINATIONS.map((d) => ({ slug: d.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const dest = DESTINATIONS.find((d) => d.slug === slug)
  if (!dest) return {}
  return {
    title: `${dest.name} — Vilasa Curators`,
    description: dest.tagline,
  }
}

export default async function DestinationPage({ params }: Props) {
  const { slug } = await params
  const dest = DESTINATIONS.find((d) => d.slug === slug)
  if (!dest) notFound()

  return <DestinationDetail destination={dest} />
}
