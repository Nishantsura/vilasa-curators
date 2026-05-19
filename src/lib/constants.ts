import type { Destination, Collection, ProcessStep, NavItem } from '@/types'

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Destinations', href: '/destinations' },
  { label: 'Collections', href: '/collections' },
  { label: 'Process', href: '/process' },
  { label: 'Contact', href: '/contact' },
]

export const DESTINATIONS: Destination[] = [
  {
    slug: 'italy',
    name: 'Italy',
    tagline: 'Where stone and silence have equal weight.',
    story:
      'Marble from Carrara, hand-knotted wool from Prato, the geometric vocabulary of a language spoken in tiles.',
    materials: ['Carrara marble', 'Murano glass', 'Florentine leather', 'Venetian terrazzo'],
    imageUrl: '/images/destinations/italy.jpg',
  },
  {
    slug: 'vietnam',
    name: 'Vietnam',
    tagline: 'A country that turns patience into object.',
    story:
      "Lacquerware from Hanoi's old quarter. Rattan from the Mekong delta. Forms that take months to arrive at their own simplicity.",
    materials: ['Lacquerware', 'Rattan', 'Bamboo', 'Silk'],
    imageUrl: '/images/destinations/vietnam.jpg',
  },
  {
    slug: 'bali',
    name: 'Bali',
    tagline: 'Stone carved by faith. Given to rooms.',
    story:
      'The artisans here have no word that separates decoration from devotion.',
    materials: ['Hand-carved stone', 'Teak', 'Volcanic rock', 'Natural fiber'],
    imageUrl: '/images/destinations/bali.jpg',
  },
  {
    slug: 'china',
    name: 'China',
    tagline: 'Ten thousand years of knowing what a room needs.',
    story:
      'Ceramics from Jingdezhen. Screens from Suzhou. Material memory encoded into the grain.',
    materials: ['Jingdezhen porcelain', 'Suzhou silk', 'Lacquered wood', 'Jade'],
    imageUrl: '/images/destinations/china.jpg',
  },
  {
    slug: 'mexico',
    name: 'Mexico',
    tagline: 'Color as climate. Object as ceremony.',
    story:
      'Talavera, obsidian, hand-hammered copper: a tradition where beautiful and useful are the same word.',
    materials: ['Talavera ceramics', 'Obsidian', 'Hammered copper', 'Oaxacan textiles'],
    imageUrl: '/images/destinations/mexico.jpg',
  },
]

export const COLLECTIONS: Collection[] = [
  {
    id: '01',
    number: '01',
    title: 'Living Room',
    description:
      'Where stillness is designed, not found. The living room begins in the sourcing — in the weight of a stone top, the give of a cushion fill, the proportion of an arm against a back.',
    images: ['/images/collections/living-1.jpg', '/images/collections/living-2.jpg'],
    slug: 'living-room',
  },
  {
    id: '02',
    number: '02',
    title: 'Dining',
    description:
      'A table is the most social object a room contains. We find ours in the places where timber is still chosen for its story, not only its grain.',
    images: ['/images/collections/dining-1.jpg', '/images/collections/dining-2.jpg'],
    slug: 'dining',
  },
  {
    id: '03',
    number: '03',
    title: 'Modular Kitchen',
    description:
      'The kitchen is the most honest room in any home. We source for durability of craft, warmth of material, and the quiet pride of work done well.',
    images: ['/images/collections/kitchen-1.jpg', '/images/collections/kitchen-2.jpg'],
    slug: 'modular-kitchen',
  },
  {
    id: '04',
    number: '04',
    title: 'Bedrooms & Wardrobes',
    description:
      'The bedroom asks for nothing more than perfect proportion and the right material. A headboard in aged leather. A wardrobe in pale ash. Simplicity is the luxury here.',
    images: ['/images/collections/bedroom-1.jpg', '/images/collections/bedroom-2.jpg'],
    slug: 'bedrooms-wardrobes',
  },
  {
    id: '05',
    number: '05',
    title: 'Mattresses & Pillow Filling',
    description:
      'Sleep is not a function. It is the architecture of restoration. We source fills that are measured in texture before they are measured in weight.',
    images: ['/images/collections/mattress-1.jpg'],
    slug: 'mattresses-pillow-filling',
  },
  {
    id: '06',
    number: '06',
    title: 'Tiles & Stones',
    description:
      'A floor is not a surface. It is a decision that every room inherits. We travel to the quarries to choose what no catalogue can fairly represent.',
    images: ['/images/collections/tiles-1.jpg', '/images/collections/tiles-2.jpg'],
    slug: 'tiles-stones',
  },
  {
    id: '07',
    number: '07',
    title: 'Doors',
    description:
      "The door is the first object that sets the threshold of a room's tone. Pivoting stone, hand-carved teak, ribbed glass — each entry is a statement before the room speaks.",
    images: ['/images/collections/doors-1.jpg'],
    slug: 'doors',
  },
  {
    id: '08',
    number: '08',
    title: 'Wall Panels',
    description:
      'Walls are not backgrounds. They are surfaces that hold light, absorb sound, and carry the material story of the entire room forward.',
    images: ['/images/collections/panels-1.jpg', '/images/collections/panels-2.jpg'],
    slug: 'wall-panels',
  },
  {
    id: '09',
    number: '09',
    title: 'Fabric Selection',
    description:
      'From the looms of Varanasi to the mills of Como. Fabric is where a room acquires its warmth — or its restraint.',
    images: ['/images/collections/fabric-1.jpg'],
    slug: 'fabric-selection',
  },
  {
    id: '10',
    number: '10',
    title: 'Carpets',
    description:
      'A carpet is a room within a room. Hand-knotted in Nepal, flat-woven in Morocco — the foundation that every furniture arrangement is grateful for.',
    images: ['/images/collections/carpets-1.jpg', '/images/collections/carpets-2.jpg'],
    slug: 'carpets',
  },
  {
    id: '11',
    number: '11',
    title: 'Outdoor Furniture',
    description:
      'The outdoors is not a compromise of the indoors. We find furniture that earns its place under sky — teak that weathers honestly, stone that holds heat into evening.',
    images: ['/images/collections/outdoor-1.jpg'],
    slug: 'outdoor-furniture',
  },
  {
    id: '12',
    number: '12',
    title: 'Artifacts & Statement Pieces',
    description:
      'Some objects refuse to be functional. They ask only to be seen — and to make everything near them more considered by proximity.',
    images: ['/images/collections/artifacts-1.jpg', '/images/collections/artifacts-2.jpg'],
    slug: 'artifacts-statement-pieces',
  },
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
