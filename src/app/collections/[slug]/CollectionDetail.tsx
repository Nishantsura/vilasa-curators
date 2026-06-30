'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'
import type { Collection, SiteSettings } from '@/types'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { CTALink } from '@/components/ui/CTALink'
import { staggerContainer, fadeUp, imageReveal, ease } from '@/lib/animations'
import { sanityImageUrl } from '../../../../sanity/lib/image'

export function CollectionDetail({ collection, siteSettings }: { collection: Collection; siteSettings?: SiteSettings | null }) {
  const firstImage = collection.images?.[0]
  const additionalImages = collection.images?.slice(1) ?? []

  return (
    <div className="bg-ivory min-h-screen">
      {/* Header */}
      <section className="px-8 md:px-16 pt-40 pb-20 max-w-[1400px] mx-auto">
        <Link
          href="/collections"
          className="inline-flex items-center gap-2 text-charcoal/40 hover:text-charcoal/70 transition-colors duration-300 section-label tracking-[0.2em] mb-10 block"
        >
          <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
            <path d="M5 1L1 5l4 4M1 5h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Collections
        </Link>
        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          <motion.div variants={fadeUp}>
            <SectionLabel className="block mb-4">{collection.number}</SectionLabel>
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="font-heading text-espresso text-5xl md:text-7xl lg:text-8xl font-light leading-[0.95]"
          >
            {collection.title}
          </motion.h1>
        </motion.div>
      </section>

      {/* Description + first image */}
      <section className="px-8 md:px-16 pb-28 max-w-[1400px] mx-auto grid md:grid-cols-[1fr_1fr] gap-16 md:gap-28 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease }}
        >
          <p className="font-heading text-espresso text-2xl md:text-3xl font-light leading-[1.3] mb-8">
            {collection.description}
          </p>
          <Link href="/contact" className="btn-dark">
            Enquire About This Collection
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
              <path d="M9 1l4 4-4 4M13 5H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>

        {firstImage?.asset && (
          <motion.div
            variants={imageReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10%' }}
            className="relative aspect-[4/3] overflow-hidden"
          >
            <Image
              src={sanityImageUrl(firstImage, 1200)}
              alt={firstImage.alt || collection.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              blurDataURL={firstImage.asset.metadata?.lqip}
              placeholder={firstImage.asset.metadata?.lqip ? 'blur' : undefined}
            />
          </motion.div>
        )}
      </section>

      {/* Additional images */}
      {additionalImages.length > 0 && (
        <section className="px-8 md:px-16 pb-32 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {additionalImages.map((img, i) => (
              img?.asset && (
                <motion.div
                  key={img.asset._id}
                  variants={imageReveal}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-5%' }}
                  className="relative aspect-[3/4] overflow-hidden"
                >
                  <Image
                    src={sanityImageUrl(img, 800)}
                    alt={img.alt || `${collection.title} ${i + 2}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 33vw"
                    blurDataURL={img.asset.metadata?.lqip}
                    placeholder={img.asset.metadata?.lqip ? 'blur' : undefined}
                  />
                </motion.div>
              )
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-bone py-24 px-8 md:px-16">
        <motion.div
          className="max-w-[600px] mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease }}
        >
          <p className="font-heading text-espresso text-2xl md:text-3xl font-light italic leading-[1.3] mb-8">
            &ldquo;{siteSettings?.tagline ?? 'More than objects. We compose atmospheres.'}&rdquo;
          </p>
          <Link href="/contact" className="btn-dark">
            Begin a Conversation
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
              <path d="M9 1l4 4-4 4M13 5H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
