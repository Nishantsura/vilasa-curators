'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { PROCESS_STEPS } from '@/lib/constants'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { ease } from '@/lib/animations'

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' })

  return (
    <section
      ref={sectionRef}
      className="relative bg-bone py-24 md:py-32"
    >
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 grid md:grid-cols-[1fr_1.4fr] gap-12 md:gap-20 items-start">

        {/* Left: header (sticky on desktop) */}
        <motion.div
          className="md:sticky md:top-40"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
        >
          <SectionLabel className="mb-6 block">Process</SectionLabel>
          <h2 className="font-heading text-espresso text-4xl md:text-5xl lg:text-6xl font-light leading-[0.95]">
            How a room
            <br />
            <em className="text-bronze">comes to itself.</em>
          </h2>
        </motion.div>

        {/* Right: all steps */}
        <div className="flex flex-col gap-8 md:gap-10">
          {PROCESS_STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              className="group"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 + i * 0.1, ease }}
            >
              <div className="flex items-baseline gap-4 mb-2">
                <span className="font-heading text-beige text-4xl md:text-5xl font-light leading-none select-none">
                  {step.number}
                </span>
                <h3 className="font-heading text-espresso text-xl md:text-2xl font-light">
                  {step.title}
                </h3>
              </div>
              <p className="text-charcoal/55 text-sm font-light leading-relaxed pl-[56px] md:pl-[68px] max-w-sm">
                {step.description}
              </p>
              {i < PROCESS_STEPS.length - 1 && (
                <div className="mt-8 md:mt-10 h-[1px] bg-espresso/8" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
