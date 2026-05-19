'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { PROCESS_STEPS } from '@/lib/constants'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { ease } from '@/lib/animations'

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-10%' })
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    let gsap: typeof import('gsap').gsap | undefined
    let ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger | undefined
    let ctx: { revert: () => void } | undefined

    let cancelled = false

    const init = async () => {
      const gsapModule = await import('gsap')
      const stModule = await import('gsap/ScrollTrigger')
      gsap = gsapModule.gsap
      ScrollTrigger = stModule.ScrollTrigger
      gsap.registerPlugin(ScrollTrigger)

      if (cancelled) return
      if (!sectionRef.current) return

      ctx = gsap.context(() => {
        PROCESS_STEPS.forEach((_, index) => {
          ScrollTrigger!.create({
            trigger: sectionRef.current,
            start: `top+=${index * (window.innerHeight * 0.8)} top`,
            end: `top+=${(index + 1) * (window.innerHeight * 0.8)} top`,
            onEnter: () => setActiveStep(index),
            onEnterBack: () => setActiveStep(index),
          })
        })
      }, sectionRef)
    }

    init()
    return () => {
      cancelled = true
      ctx?.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative bg-bone"
      style={{ minHeight: `${PROCESS_STEPS.length * 80 + 40}vh` }}
    >
      {/* Section header */}
      <div ref={headerRef} className="px-8 md:px-16 pt-28 pb-16 max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
        >
          <SectionLabel className="mb-6 block">Process</SectionLabel>
          <h2 className="font-heading text-espresso text-4xl md:text-6xl font-light leading-[0.95]">
            How a room
            <br />
            <em className="text-bronze">comes to itself.</em>
          </h2>
        </motion.div>
      </div>

      {/* Sticky content panel */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="w-full px-8 md:px-16 max-w-[1400px] mx-auto grid md:grid-cols-[1fr_1fr] gap-16 items-center">

          {/* Left: step text */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.7, ease }}
              >
                <span className="font-heading text-beige text-[120px] font-light leading-none select-none block -mb-6">
                  {PROCESS_STEPS[activeStep].number}
                </span>
                <h3 className="font-heading text-espresso text-4xl md:text-5xl font-light mb-5">
                  {PROCESS_STEPS[activeStep].title}
                </h3>
                <p className="text-charcoal/65 text-base md:text-lg font-light leading-relaxed max-w-sm">
                  {PROCESS_STEPS[activeStep].description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Step indicators */}
            <div className="flex items-center gap-3 mt-12">
              {PROCESS_STEPS.map((_, i) => (
                <div
                  key={i}
                  className="h-[1px] transition-all duration-500"
                  style={{
                    width: i === activeStep ? 40 : 20,
                    backgroundColor: i === activeStep ? '#1a1713' : '#d9cfc4',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right: step image */}
          <div className="hidden md:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                className="relative aspect-[3/4] overflow-hidden"
                initial={{ opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' }}
                animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              >
                <Image
                  src={PROCESS_STEPS[activeStep].imageUrl}
                  alt={PROCESS_STEPS[activeStep].title}
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
