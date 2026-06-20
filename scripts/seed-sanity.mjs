/**
 * Seed script — pushes all hardcoded content into Sanity.
 *
 * Usage:
 *   node scripts/seed-sanity.mjs
 *
 * Requires NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN in .env.local
 */

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { readFileSync } from 'fs'
import { homedir } from 'os'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: resolve(__dirname, '..', '.env.local') })

const sanityConfig = JSON.parse(
  readFileSync(resolve(homedir(), '.config', 'sanity', 'config.json'), 'utf8')
)

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: sanityConfig.authToken,
  apiVersion: '2025-06-06',
  useCdn: false,
})

// ─── DESTINATIONS ───────────────────────────────────────────────────────────

const destinations = [
  {
    _id: 'destination-italy',
    _type: 'destination',
    name: 'Italy',
    slug: { _type: 'slug', current: 'italy' },
    tagline: 'The Italian Chapter',
    story: 'Carrara marble cut from the mountains. Terrazzo cast with fragments of history. Leather shaped and softened by generations of craftsmanship. Murano glass transformed through fire into objects of remarkable delicacy. A material language refined over centuries.',
    materials: ['Carrara marble', 'Murano glass', 'Florentine leather', 'Venetian terrazzo'],
    order: 1,
  },
  {
    _id: 'destination-vietnam',
    _type: 'destination',
    name: 'Vietnam',
    slug: { _type: 'slug', current: 'vietnam' },
    tagline: 'The Vietnam Chapter',
    story: 'Rattan woven by hand. Bamboo shaped with remarkable simplicity. Lacquer built layer upon layer to reveal depth and sheen. Silk woven with a lightness that has defined Vietnamese craft for generations.',
    materials: ['Lacquerware', 'Rattan', 'Bamboo', 'Silk'],
    order: 2,
  },
  {
    _id: 'destination-bali',
    _type: 'destination',
    name: 'Bali',
    slug: { _type: 'slug', current: 'bali' },
    tagline: 'The Bali Chapter',
    story: 'Bali has a way of blurring boundaries, between indoors and outdoors. Volcanic stone underfoot. Hand-carved timber overhead. Macrame Woven pieces catching the afternoon light. Across Bali, we found materials shaped by a culture that builds with the landscape.',
    materials: ['Hand-carved stone', 'Teak', 'Volcanic rock', 'Natural fiber'],
    order: 3,
  },
  {
    _id: 'destination-china',
    _type: 'destination',
    name: 'China',
    slug: { _type: 'slug', current: 'china' },
    tagline: 'Ten thousand years of knowing what a room needs.',
    story: 'Ceramics from Jingdezhen. Screens from Suzhou. Material memory encoded into the grain.',
    materials: ['Jingdezhen porcelain', 'Suzhou silk', 'Lacquered wood', 'Jade'],
    order: 4,
  },
  {
    _id: 'destination-mexico',
    _type: 'destination',
    name: 'Mexico',
    slug: { _type: 'slug', current: 'mexico' },
    tagline: 'The Mexico Chapter',
    story: 'Copper hammered by hand. Talavera painted stroke by stroke. Obsidian formed by ancient volcanic landscapes. Across Mexico, we found materials that carry both the richness of the earth and the imprint of the maker.',
    materials: ['Talavera ceramics', 'Obsidian', 'Hammered copper', 'Oaxacan textiles'],
    order: 5,
  },
]

// ─── COLLECTIONS ────────────────────────────────────────────────────────────

const collections = [
  { num: '01', title: 'Living Room', slug: 'living-room', desc: 'Where stillness is designed, not found. The living room begins in the sourcing — in the weight of a stone top, the give of a cushion fill, the proportion of an arm against a back.' },
  { num: '02', title: 'Dining', slug: 'dining', desc: 'A table is the most social object a room contains. We find ours in the places where timber is still chosen for its story, not only its grain.' },
  { num: '03', title: 'Modular Kitchen', slug: 'modular-kitchen', desc: 'The kitchen is the most honest room in any home. We source for durability of craft, warmth of material, and the quiet pride of work done well.' },
  { num: '04', title: 'Bedrooms & Wardrobes', slug: 'bedrooms-wardrobes', desc: 'The bedroom asks for nothing more than perfect proportion and the right material. A headboard in aged leather. A wardrobe in pale ash. Simplicity is the luxury here.' },
  { num: '05', title: 'Mattresses & Pillow Filling', slug: 'mattresses-pillow-filling', desc: 'Sleep is not a function. It is the architecture of restoration. We source fills that are measured in texture before they are measured in weight.' },
  { num: '06', title: 'Tiles & Stones', slug: 'tiles-stones', desc: 'A floor is not a surface. It is a decision that every room inherits. We travel to the quarries to choose what no catalogue can fairly represent.' },
  { num: '07', title: 'Doors', slug: 'doors', desc: "The door is the first object that sets the threshold of a room's tone. Pivoting stone, hand-carved teak, ribbed glass — each entry is a statement before the room speaks." },
  { num: '08', title: 'Wall Panels', slug: 'wall-panels', desc: 'Walls are not backgrounds. They are surfaces that hold light, absorb sound, and carry the material story of the entire room forward.' },
  { num: '09', title: 'Fabric Selection', slug: 'fabric-selection', desc: 'From the looms of Varanasi to the mills of Como. Fabric is where a room acquires its warmth — or its restraint.' },
  { num: '10', title: 'Carpets', slug: 'carpets', desc: 'A carpet is a room within a room. Hand-knotted in Nepal, flat-woven in Morocco — the foundation that every furniture arrangement is grateful for.' },
  { num: '11', title: 'Outdoor Furniture', slug: 'outdoor-furniture', desc: 'The outdoors is not a compromise of the indoors. We find furniture that earns its place under sky — teak that weathers honestly, stone that holds heat into evening.' },
  { num: '12', title: 'Artifacts & Statement Pieces', slug: 'artifacts-statement-pieces', desc: 'Some objects refuse to be functional. They ask only to be seen — and to make everything near them more considered by proximity.' },
].map((c, i) => ({
  _id: `collection-${c.slug}`,
  _type: 'collection',
  title: c.title,
  slug: { _type: 'slug', current: c.slug },
  number: c.num,
  description: c.desc,
  images: [],
  order: i + 1,
}))

// ─── HOME PAGE (singleton) ─────────────────────────────────────────────────

const homePage = {
  _id: 'homePage',
  _type: 'homePage',
  heroHeadline: 'WE SOURCE THE WORLD.',
  heroHeadlineItalic: 'FOR SPACES THAT FEEL INEVITABLE.',
  heroSubtext: 'From marble quarries in Italy to lacquer workshops in Vietnam — every object chosen for the atmosphere it creates.',
  heroCtaLabel: 'EXPLORE COLLECTIONS',
  heroCtaHref: '/collections',
  featuredLabel: 'FEATURED COLLECTION — ARTIFACTS & STATEMENT PIECES — ITALY · BALI · MEXICO',
  philosophyHeading: 'SOURCING THE WORLD.',
  philosophyHeadingItalic: 'IT STARTS HERE.',
  philosophyBody: 'At Vilasa Curators, every object we source is chosen in person — in the workshops of Umbria, the lacquer ateliers of Hanoi, the stone yards of Bali. We bring back what no catalogue can represent.',
  philosophyCards: [
    { _type: 'object', _key: 'card1', heading: 'THE SOURCING\nVOYAGE.', sub: '' },
    { _type: 'object', _key: 'card2', heading: 'THE ARTISAN\nALLIANCE.', sub: '' },
    { _type: 'object', _key: 'card3', heading: 'CRAFTED IN\nSINGULARITY.', sub: 'Access to private reserves and singular creations that no international buying guide has ever documented.' },
  ],
  collectionsHeading: 'Twelve worlds.',
  collectionsHeadingItalic: 'One vision.',
  collectionsSubtext: 'Each collection draws from workshops, quarries, and artisans found across five continents.',
  finalCtaHeading: 'More than objects.',
  finalCtaHeadingItalic: 'We compose atmospheres.',
  finalCtaBody: "If you have a space that requires the world's most considered objects, we would like to hear from you.",
}

// ─── SITE SETTINGS (singleton) ──────────────────────────────────────────────

const siteSettings = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  siteTitle: 'Vilasa Curators — Global Luxury Sourcing',
  siteDescription: "We source the world's most considered objects for spaces that feel inevitable. Global luxury furniture sourcing from Italy, Vietnam, Bali, China, and Mexico.",
  email: 'hello@vilasacurators.com',
  whatsappNumber: '919999999999',
  tagline: 'More than objects. We compose atmospheres.',
}

// ─── RUN ────────────────────────────────────────────────────────────────────

async function seed() {
  const allDocs = [...destinations, ...collections, homePage, siteSettings]

  console.log(`Seeding ${allDocs.length} documents into Sanity...`)

  const transaction = client.transaction()
  for (const doc of allDocs) {
    transaction.createOrReplace(doc)
  }

  const result = await transaction.commit()
  console.log(`Done! ${result.documentIds.length} documents created/updated.`)
  console.log('\nDocuments seeded:')
  console.log(`  - ${destinations.length} destinations`)
  console.log(`  - ${collections.length} collections`)
  console.log(`  - 1 home page`)
  console.log(`  - 1 site settings`)
  console.log('\nNote: Images are empty — upload them through the Studio.')
}

seed().catch((err) => {
  console.error('Seed failed:', err.message)
  process.exit(1)
})
