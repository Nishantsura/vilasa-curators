'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { staggerContainer, fadeUp, ease } from '@/lib/animations'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { CTALink } from '@/components/ui/CTALink'
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
      className="relative bg-ivory min-h-screen flex items-center py-32 md:py-48 px-8 md:px-16 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto w-full grid md:grid-cols-[3fr_2fr] gap-16 md:gap-32 items-end">

        {/* Left: Statement */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.h2
            variants={fadeUp}
            className="font-heading text-espresso text-5xl md:text-7xl lg:text-8xl font-light leading-[0.9] mb-12"
          >
            {homePage?.finalCtaHeading || 'More than objects.'}
            <br />
            <em className="text-bronze">
              {homePage?.finalCtaHeadingItalic || 'We compose atmospheres.'}
            </em>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-charcoal/60 text-base md:text-lg font-light leading-relaxed max-w-md mb-12"
          >
            {homePage?.finalCtaBody || "If you have a space that requires the world's most considered objects, we would like to hear from you."}
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-8">
            <CTALink href="/contact">
              Begin a Conversation
            </CTALink>
            <CTALink href="/collections" className="text-charcoal/50">
              Explore Collections
            </CTALink>
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
            <SectionLabel className="block mb-3">Vilasa Curators</SectionLabel>
            <p className="font-heading text-espresso text-lg font-light">
              Global Luxury Sourcing
            </p>
          </div>

          <div className="space-y-2">
            <a
              href={`mailto:${siteSettings?.email || 'hello@vilasacurators.com'}`}
              className="cta-underline text-charcoal/70 text-sm font-light block hover:text-espresso transition-colors duration-300"
            >
              {siteSettings?.email || 'hello@vilasacurators.com'}
            </a>
            <a
              href={`https://wa.me/${siteSettings?.whatsappNumber || '919999999999'}`}
              className="cta-underline text-charcoal/70 text-sm font-light block hover:text-espresso transition-colors duration-300"
            >
              WhatsApp Enquiry
            </a>
          </div>

          {/* Founder signature line */}
          <div className="pt-8 border-t border-beige/60">
            <p className="font-heading italic text-taupe text-xl font-light">
              Vilasa Curators
            </p>
          </div>
        </motion.div>
      </div>

      {/* Background decorative element */}
      <motion.div
        className="absolute bottom-0 right-0 font-heading text-beige/20 text-[200px] md:text-[300px] font-light leading-none select-none pointer-events-none"
        initial={{ opacity: 0, x: 60 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1.4, delay: 0.3, ease }}
      >
        V
      </motion.div>
    </section>
  )
}
