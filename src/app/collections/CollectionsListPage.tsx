'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import type { Collection } from '@/types'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { fadeUp, staggerContainer, ease } from '@/lib/animations'

interface CollectionsListPageProps {
  collections: Collection[]
  heading?: string
  headingItalic?: string
}

export function CollectionsListPage({
  collections,
  heading = 'Twelve worlds.',
  headingItalic = 'One vision.',
}: CollectionsListPageProps) {
  return (
    <div className="bg-ivory min-h-screen">
      {/* Header */}
      <section className="section-px pt-40 pb-20 content-max">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          <motion.div variants={fadeUp}>
            <SectionLabel className="block mb-8">Collections</SectionLabel>
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="font-heading text-espresso text-5xl md:text-7xl font-light leading-[0.95]"
          >
            {heading}
            <br />
            <em className="text-bronze">{headingItalic}</em>
          </motion.h1>
        </motion.div>
      </section>

      {/* Collection grid */}
      <section className="section-px pb-32">
        <div className="content-max space-y-2">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5%' }}
              transition={{ duration: 0.7, delay: 0.05 * (index % 4), ease }}
            >
              <Link
                href={`/collections/${collection.slug}`}
                className="group flex items-center justify-between py-7 border-b border-beige/50 hover:border-taupe transition-colors duration-500"
              >
                <div className="flex items-center gap-8 md:gap-16">
                  <span className="section-label text-taupe w-8">{collection.number}</span>
                  <span className="font-heading text-espresso text-xl md:text-3xl font-light group-hover:text-bronze transition-colors duration-500">
                    {collection.title}
                  </span>
                </div>
                <div className="flex items-center gap-6 flex-shrink-0">
                  <span className="hidden md:block text-charcoal/40 text-sm font-light max-w-xs text-right leading-relaxed group-hover:text-charcoal/60 transition-colors duration-500">
                    {collection.description.split('.')[0]}.
                  </span>
                  <span className="section-label text-taupe group-hover:text-espresso transition-colors duration-300 whitespace-nowrap">
                    View →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
