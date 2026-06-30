'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { staggerContainer, fadeUp, ease } from '@/lib/animations'
import { SectionLabel } from '@/components/ui/SectionLabel'
import type { HomePage, SiteSettings } from '@/types'

interface FinalCTAProps {
  homePage?: HomePage | null
  siteSettings?: SiteSettings | null
}

export function FinalCTA({ homePage, siteSettings }: FinalCTAProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section
      ref={ref}
      className="relative bg-ivory flex items-center py-16 xs:py-20 md:py-24 lg:py-28 section-px overflow-hidden"
    >
      <div className="content-max w-full grid md:grid-cols-[3fr_2fr] gap-12 md:gap-20 lg:gap-32 items-end">

        {/* Left: Statement */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.h2
            variants={fadeUp}
            className="font-heading text-espresso text-3xl md:text-5xl lg:text-7xl font-light leading-[0.9] mb-8"
          >
            {homePage?.finalCtaHeading || 'More than objects.'}
            <br />
            <em className="text-bronze">
              {homePage?.finalCtaHeadingItalic || 'We compose atmospheres.'}
            </em>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-charcoal/60 text-sm md:text-base font-light leading-relaxed max-w-md mb-8"
          >
            {homePage?.finalCtaBody || "If you have a space that requires the world's most considered objects, we would like to hear from you."}
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col xs:flex-row flex-wrap gap-4">
            <a href="/about" className="btn-primary-light">
              Begin a Conversation
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                <path d="M9 1l4 4-4 4M13 5H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="/#collections" className="btn-ghost-light">
              Explore Collections
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                <path d="M9 1l4 4-4 4M13 5H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </motion.div>
        </motion.div>

        {/* Right: Contact details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.5, ease }}
          className="space-y-8"
        >
          <div>
            <Image
              src="/images/Vilasa png.png"
              alt="Vilasa — Luxurious Living"
              width={160}
              height={40}
              className="h-[144px] md:h-[192px] w-auto mb-6"
            />
          </div>

          <div className="flex flex-col gap-3">
            <a
              href={`mailto:${siteSettings?.email || 'hello@vilasacurators.com'}`}
              className="cta-underline text-charcoal/70 text-sm font-light hover:text-espresso transition-colors duration-300"
            >
              {siteSettings?.email || 'hello@vilasacurators.com'}
            </a>
          </div>

          {/* Founder signature line */}
          <div className="pt-8 border-t border-beige/60">
            <p className="font-heading italic text-taupe text-xl font-light">
              {siteSettings?.tagline ?? 'Vilasa Curators'}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Subtle decorative element */}
      <motion.div
        className="absolute bottom-0 right-0 font-heading text-beige/10 text-[120px] md:text-[180px] font-light leading-none select-none pointer-events-none"
        initial={{ opacity: 0, x: 40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1.4, delay: 0.3, ease }}
      >
        V
      </motion.div>
    </section>
  )
}
