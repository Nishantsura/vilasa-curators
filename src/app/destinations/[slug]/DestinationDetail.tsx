'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'
import type { Destination } from '@/types'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { staggerContainer, fadeUp, imageReveal, ease } from '@/lib/animations'
import { sanityImageUrl } from '../../../../sanity/lib/image'

export function DestinationDetail({ destination }: { destination: Destination }) {
  return (
    <div className="bg-ivory min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex items-end bg-espresso overflow-hidden">
        <Link
          href="/#destinations"
          className="absolute top-24 left-8 md:left-16 z-20 flex items-center gap-2 text-ivory/60 hover:text-ivory transition-colors duration-300 section-label tracking-[0.2em]"
        >
          <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
            <path d="M5 1L1 5l4 4M1 5h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Destinations
        </Link>
        <div className="absolute inset-0">
          {destination.image?.asset && (
            <Image
              src={sanityImageUrl(destination.image, 1920)}
              alt={destination.image.alt || destination.name}
              fill
              className="object-cover opacity-70"
              priority
              blurDataURL={destination.image.asset.metadata?.lqip}
              placeholder={destination.image.asset.metadata?.lqip ? 'blur' : undefined}
            />
          )}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(26,23,19,0.75) 0%, rgba(26,23,19,0.2) 50%, transparent 100%)' }}
          />
        </div>

        <motion.div
          className="relative z-10 section-px pb-24 content-max w-full"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel className="text-taupe block mb-8">{destination.name}</SectionLabel>
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="font-heading text-ivory text-5xl md:text-7xl lg:text-[90px] font-light leading-[0.95] max-w-3xl"
          >
            {destination.tagline}
          </motion.h1>
        </motion.div>
      </section>

      {/* Story */}
      <section className="section-px py-28 content-max grid md:grid-cols-[2fr_1fr] gap-12 md:gap-20 lg:gap-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease }}
        >
          <SectionLabel className="block mb-8">Material Story</SectionLabel>
          <p className="text-charcoal/65 text-lg md:text-xl font-light leading-relaxed">
            {destination.story}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2, ease }}
        >
          <SectionLabel className="block mb-6">Materials</SectionLabel>
          <ul className="space-y-3">
            {destination.materials.map((m) => (
              <li key={m} className="flex items-center gap-3">
                <span className="w-4 h-[1px] bg-beige block" />
                <span className="text-charcoal/70 text-sm font-light">{m}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </section>
    </div>
  )
}
