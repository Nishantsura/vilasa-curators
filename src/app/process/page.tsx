'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { PROCESS_STEPS } from '@/lib/constants'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { CTALink } from '@/components/ui/CTALink'
import { staggerContainer, fadeUp, ease } from '@/lib/animations'

export default function ProcessPage() {
  return (
    <div className="bg-bone min-h-screen">
      {/* Hero header with background */}
      <section className="relative min-h-[55vh] flex items-end bg-espresso overflow-hidden pt-24">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1920&q=80&auto=format"
            alt="Artisan workshop"
            fill
            className="object-cover opacity-55"
            priority
            unoptimized
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(26,23,19,0.78) 0%, rgba(26,23,19,0.15) 55%, transparent 100%)' }}
          />
        </div>

        <motion.div
          className="relative z-10 px-8 md:px-16 pb-20 max-w-[1400px] mx-auto w-full"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel className="text-taupe block mb-8">Process</SectionLabel>
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="font-heading text-ivory text-5xl md:text-7xl font-light leading-[0.95]"
          >
            How a room
            <br />
            <em className="text-bronze">comes to itself.</em>
          </motion.h1>
        </motion.div>
      </section>

      {/* Steps — two-column editorial list */}
      <section className="px-8 md:px-16 pb-40 max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-[1fr_1.5fr] gap-12 md:gap-24 items-start">

          {/* Left: intro text (sticky on desktop) */}
          <motion.p
            className="md:sticky md:top-40 text-charcoal/50 text-base md:text-lg font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease }}
          >
            Every object we source passes through five moments of intention. Not steps — ceremonies. Each one irreversible.
          </motion.p>

          {/* Right: numbered steps */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col"
          >
            {PROCESS_STEPS.map((step, i) => (
              <motion.div key={step.number} variants={fadeUp}>
                <div className="flex items-baseline gap-5 mb-3">
                  <span className="font-heading text-beige font-light leading-none select-none"
                    style={{ fontSize: 'clamp(56px, 6vw, 80px)' }}
                  >
                    {step.number}
                  </span>
                  <h2 className="font-heading text-espresso text-2xl md:text-3xl font-light">
                    {step.title}
                  </h2>
                </div>
                <p className="text-charcoal/55 text-sm md:text-base font-light leading-relaxed pl-[68px] md:pl-[88px] max-w-md">
                  {step.description}
                </p>
                {i < PROCESS_STEPS.length - 1 && (
                  <div className="my-10 md:my-12 h-[1px] bg-espresso/8" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-espresso py-24 px-8 md:px-16">
        <motion.div
          className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.9, ease }}
        >
          <h2 className="font-heading text-ivory text-3xl md:text-5xl font-light leading-[1.1]">
            Ready to begin
            <br />
            <em className="text-bronze">your journey?</em>
          </h2>
          <a href="/contact" className="btn-gold">
            Begin a Conversation
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
              <path d="M9 1l4 4-4 4M13 5H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>
      </section>
    </div>
  )
}
