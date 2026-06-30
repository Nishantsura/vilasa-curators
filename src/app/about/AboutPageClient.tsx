'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { DestinationsSection } from '@/components/sections/DestinationsSection'
import { CollectionsSection } from '@/components/sections/CollectionsSection'
import { staggerContainer, fadeUp, imageReveal, ease } from '@/lib/animations'
import type { Collection, Destination, HomePage, SiteSettings } from '@/types'

interface AboutPageClientProps {
  collections: Collection[]
  destinations: Destination[]
  homePage: HomePage | null
  siteSettings: SiteSettings | null
}

export function AboutPageClient({
  collections,
  destinations,
  homePage,
  siteSettings,
}: AboutPageClientProps) {
  return (
    <div className="bg-ivory">
      {/* ── Hero ── */}
      <section className="relative min-h-[60vh] flex items-end bg-espresso overflow-hidden pt-24">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80&auto=format"
            alt="Luxury interior space"
            fill
            className="object-cover opacity-60"
            priority
            unoptimized
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(26,23,19,0.85) 0%, rgba(26,23,19,0.2) 55%, transparent 100%)' }}
          />
        </div>

        <motion.div
          className="relative z-10 section-px pb-16 md:pb-20 content-max w-full"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel className="text-taupe block mb-6">About</SectionLabel>
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="font-heading text-ivory text-4xl md:text-6xl lg:text-7xl font-light leading-[0.95]"
          >
            A map of the world&apos;s
            <br />
            <em className="text-bronze">most considered objects.</em>
          </motion.h1>
        </motion.div>
      </section>

      {/* ── Our Story ── */}
      <section className="section-px py-20 md:py-28 content-max">
        <div className="grid md:grid-cols-[1fr_1fr] gap-10 md:gap-16 lg:gap-24">
          <motion.div
            variants={imageReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10%' }}
            className="relative aspect-[3/4] overflow-hidden"
            style={{ borderRadius: 12 }}
          >
            <Image
              src="https://cdn.sanity.io/images/hl24yywq/production/dda4c48cef624c87465856db7ec0eeda900a47a2-3000x4000.jpg?w=1200&q=80&auto=format"
              alt="Founder of Vilasa Curators"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized
            />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10%' }}
            className="flex flex-col justify-center"
          >
            <motion.div variants={fadeUp}>
              <SectionLabel className="block mb-8">Our Story</SectionLabel>
            </motion.div>
            <motion.p variants={fadeUp} className="font-heading text-espresso text-xl md:text-2xl font-light leading-[1.3] mb-6">
              Vilasa Curators began as a collection of answers to questions that
              had no catalogue.
            </motion.p>
            <motion.p variants={fadeUp} className="text-charcoal/65 text-sm md:text-base font-light leading-relaxed mb-5">
              I spent fifteen years traveling with designers who knew exactly what they wanted
              but couldn&apos;t find where to find it. A stone from a specific quarry in Tuscany.
              A lacquer finish from a specific workshop in H&#7897;i An. A textile made on a specific
              loom in Varanasi.
            </motion.p>
            <motion.p variants={fadeUp} className="text-charcoal/65 text-sm md:text-base font-light leading-relaxed mb-5">
              These things exist. They are being made, right now, by people who have spent
              their lives mastering a single material. But they are invisible to the
              international luxury market — because no one has bothered to find them,
              document them, and bring them into the conversation.
            </motion.p>
            <motion.p variants={fadeUp} className="text-charcoal/65 text-sm md:text-base font-light leading-relaxed">
              Vilasa is that conversation. A bridge between the workshops of five countries
              and the spaces that deserve what they make.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Image Gallery Strip ── */}
      <section className="py-8 md:py-12 overflow-hidden">
        <div className="flex gap-4 md:gap-6" style={{ width: 'max-content' }}>
          {[
            'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80&auto=format',
            'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80&auto=format',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80&auto=format',
            'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=600&q=80&auto=format',
          ].map((src, i) => (
            <motion.div
              key={i}
              className="relative flex-shrink-0 overflow-hidden"
              style={{ width: 'clamp(200px, 30vw, 360px)', aspectRatio: '4 / 5', borderRadius: 8 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease }}
            >
              <Image
                src={src}
                alt={`Vilasa sourcing ${i + 1}`}
                fill
                className="object-cover"
                sizes="30vw"
                unoptimized
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Closing Quote ── */}
      <section className="bg-espresso py-16 md:py-24 section-px">
        <motion.div
          className="max-w-[900px] mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease }}
        >
          <p className="font-heading text-ivory text-2xl md:text-4xl font-light italic leading-[1.2]">
            &ldquo;More than objects. We compose atmospheres.&rdquo;
          </p>
        </motion.div>
      </section>

      {/* ── Collections Section ── */}
      <CollectionsSection
        collections={collections}
        heading={homePage?.collectionsHeading}
        headingItalic={homePage?.collectionsHeadingItalic}
        subtext={homePage?.collectionsSubtext}
      />

      {/* ── Destinations Section ── */}
      <DestinationsSection destinations={destinations} />
    </div>
  )
}
