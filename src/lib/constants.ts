import type { ProcessStep, NavItem } from '@/types'

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Collections', href: '/#collections' },
  { label: 'Destinations', href: '/#destinations' },
  { label: 'About Us', href: '/about' },
]

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Discovery',
    description:
      'We begin by understanding not what you want, but what you have always responded to.',
    imageUrl: '/images/process/discovery.jpg',
  },
  {
    number: '02',
    title: 'Taste Mapping',
    description:
      "References accumulate: a torn magazine page, a hotel lobby remembered for years, a grandmother's sideboard.",
    imageUrl: '/images/process/taste-mapping.jpg',
  },
  {
    number: '03',
    title: 'Global Sourcing',
    description:
      'We travel to the workshops, the quarries, the ateliers — to select what cannot be found by scrolling.',
    imageUrl: '/images/process/sourcing.jpg',
  },
  {
    number: '04',
    title: 'Procurement',
    description:
      'Documentation, shipping, handling, import — the invisible work that keeps the beautiful thing intact.',
    imageUrl: '/images/process/procurement.jpg',
  },
  {
    number: '05',
    title: 'Placement',
    description:
      'Not delivery. Integration. The object finds its position in the room, and the room becomes itself.',
    imageUrl: '/images/process/placement.jpg',
  },
]
