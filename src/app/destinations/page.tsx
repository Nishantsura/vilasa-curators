'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { DESTINATIONS } from '@/lib/constants'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { CTALink } from '@/components/ui/CTALink'
import { imageReveal, fadeUp, staggerContainer, ease } from '@/lib/animations'

export default function DestinationsPage() {
  return (
    <div className="bg-ivory min-h-screen">
      {/* Header */}
      <section className="px-8 md:px-16 pt-40 pb-20 max-w-[1400px] mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel className="block mb-8">Destinations</SectionLabel>
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="font-heading text-espresso text-5xl md:text-7xl font-light leading-[0.95]"
          >
            Five countries.
            <br />
            <em className="text-bronze">Infinite sourcing.</em>
          </motion.h1>
        </motion.div>
      </section>

      {/* Destinations grid */}
      <section className="px-8 md:px-16 pb-32 max-w-[1400px] mx-auto space-y-32">
        {DESTINATIONS.map((dest, index) => (
          <motion.div
            key={dest.slug}
            className="grid md:grid-cols-[1fr_1fr] gap-12 md:gap-20 items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.8, ease }}
          >
            <motion.div
              variants={imageReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-10%' }}
              className={`relative aspect-[4/3] overflow-hidden ${index % 2 !== 0 ? 'md:order-2' : ''}`}
            >
              <Image
                src={dest.imageUrl}
                alt={dest.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-10%' }}
              className={index % 2 !== 0 ? 'md:order-1' : ''}
            >
              <motion.div variants={fadeUp}>
                <span className="section-label text-taupe block mb-6">0{index + 1}</span>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="font-heading text-espresso text-4xl md:text-5xl font-light mb-4"
              >
                {dest.name}
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="font-heading text-bronze text-xl italic mb-6"
              >
                {dest.tagline}
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="text-charcoal/65 text-base font-light leading-relaxed mb-6 max-w-sm"
              >
                {dest.story}
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-8">
                {dest.materials.map((m) => (
                  <span key={m} className="section-label text-taupe border border-beige px-3 py-1.5">
                    {m}
                  </span>
                ))}
              </motion.div>
              <motion.div variants={fadeUp}>
                <CTALink href={`/destinations/${dest.slug}`}>
                  Explore {dest.name}
                </CTALink>
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </section>
    </div>
  )
}
