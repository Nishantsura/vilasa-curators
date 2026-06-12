'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { staggerContainer, fadeUp, imageReveal, ease } from '@/lib/animations'

export default function AboutPage() {
  return (
    <div className="bg-ivory min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end bg-espresso overflow-hidden pt-24">
        <div className="absolute inset-0">
          <Image
            src="/images/about-hero.jpg"
            alt="Vilasa Curators"
            fill
            className="object-cover opacity-50"
            priority
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(26,23,19,0.9) 0%, transparent 60%)' }}
          />
        </div>

        <motion.div
          className="relative z-10 px-8 md:px-16 pb-20 max-w-[1400px] mx-auto w-full"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel className="text-taupe block mb-8">About</SectionLabel>
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="font-heading text-ivory text-5xl md:text-7xl lg:text-8xl font-light leading-[0.95]"
          >
            A map of the world's
            <br />
            <em className="text-bronze">most considered objects.</em>
          </motion.h1>
        </motion.div>
      </section>

      {/* Story */}
      <section className="px-8 md:px-16 py-28 md:py-40 max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-[1fr_1fr] gap-16 md:gap-32">
          <motion.div
            variants={imageReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10%' }}
            className="relative aspect-[3/4] overflow-hidden"
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
              <SectionLabel className="block mb-10">Our Story</SectionLabel>
            </motion.div>
            <motion.p variants={fadeUp} className="font-heading text-espresso text-2xl md:text-3xl font-light leading-[1.3] mb-8">
              Vilasa Curators began as a collection of answers to questions that
              had no catalogue.
            </motion.p>
            <motion.p variants={fadeUp} className="text-charcoal/65 text-base font-light leading-relaxed mb-6">
              I spent fifteen years traveling with designers who knew exactly what they wanted
              but couldn't find where to find it. A stone from a specific quarry in Tuscany.
              A lacquer finish from a specific workshop in Hội An. A textile made on a specific
              loom in Varanasi.
            </motion.p>
            <motion.p variants={fadeUp} className="text-charcoal/65 text-base font-light leading-relaxed mb-6">
              These things exist. They are being made, right now, by people who have spent
              their lives mastering a single material. But they are invisible to the
              international luxury market — because no one has bothered to find them,
              document them, and bring them into the conversation.
            </motion.p>
            <motion.p variants={fadeUp} className="text-charcoal/65 text-base font-light leading-relaxed">
              Vilasa is that conversation. A bridge between the workshops of five countries
              and the spaces that deserve what they make.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Closing statement */}
      <section className="bg-espresso py-28 md:py-40 px-8 md:px-16">
        <motion.div
          className="max-w-[900px] mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease }}
        >
          <p className="font-heading text-ivory text-3xl md:text-5xl font-light italic leading-[1.2]">
            "More than objects. We compose atmospheres."
          </p>
        </motion.div>
      </section>
    </div>
  )
}
