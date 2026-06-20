export interface SanityImage {
  asset: {
    _id: string
    url: string
    metadata: {
      lqip: string
      dimensions: { width: number; height: number }
    }
  }
  hotspot?: { x: number; y: number }
  crop?: { top: number; bottom: number; left: number; right: number }
  alt?: string
}

export interface Destination {
  slug: string
  name: string
  tagline: string
  story: string
  materials: string[]
  image: SanityImage | null
  imageUrl?: string
}

export interface Collection {
  id?: string
  number: string
  title: string
  description: string
  images: SanityImage[]
  slug: string
}

export interface ProcessStep {
  number: string
  title: string
  description: string
  imageUrl: string
}

export interface NavItem {
  label: string
  href: string
}

export interface PhilosophyCard {
  heading: string
  sub?: string
  image?: SanityImage | null
}

export interface HomePage {
  heroHeadline: string
  heroHeadlineItalic: string
  heroSubtext: string
  heroCtaLabel: string
  heroCtaHref: string
  featuredLabel: string
  philosophyHeading: string
  philosophyHeadingItalic: string
  philosophyBody: string
  philosophyCards?: PhilosophyCard[]
  collectionsHeading: string
  collectionsHeadingItalic: string
  collectionsSubtext: string
  finalCtaHeading: string
  finalCtaHeadingItalic: string
  finalCtaBody: string
}

export interface SiteSettings {
  siteTitle: string
  siteDescription: string
  ogImage: { asset: { url: string } } | null
  email: string
  whatsappNumber: string
  tagline: string
}
