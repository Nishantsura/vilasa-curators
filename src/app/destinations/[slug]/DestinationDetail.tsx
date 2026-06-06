'use client'

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
        <div className="absolute inset-0">
          {destination.image?.asset && (
            <Image
              src={sanityImageUrl(destination.image, 1920)}
              alt={destination.image.alt || destination.name}
              fill
              className="object-cover opacity-60"
              priority
              blurDataURL={destination.image.asset.metadata?.lqip}
              placeholder={destination.image.asset.metadata?.lqip ? 'blur' : undefined}
            />
          )}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(26,23,19,0.85) 0%, transparent 50%)' }}
          />
        </div>

        <motion.div
          className="relative z-10 px-8 md:px-16 pb-24 max-w-[1400px] mx-auto w-full"
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
      <section className="px-8 md:px-16 py-28 max-w-[1400px] mx-auto grid md:grid-cols-[2fr_1fr] gap-16 md:gap-32">
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
