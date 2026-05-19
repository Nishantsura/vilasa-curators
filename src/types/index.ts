export interface Destination {
  slug: string
  name: string
  tagline: string
  story: string
  materials: string[]
  imageUrl: string
}

export interface Collection {
  id: string
  number: string
  title: string
  description: string
  images: string[]
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
