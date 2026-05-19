'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { DESTINATIONS } from '@/lib/constants'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { CTALink } from '@/components/ui/CTALink'
import { ease } from '@/lib/animations'

export function DestinationsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(labelRef, { once: true, margin: '-10%' })

  useEffect(() => {
    let cancelled = false
    let gsap: typeof import('gsap').gsap | undefined
    let ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger | undefined
    let ctx: { revert: () => void } | undefined

    const init = async () => {
      const gsapModule = await import('gsap')
      const stModule = await import('gsap/ScrollTrigger')
      gsap = gsapModule.gsap
      ScrollTrigger = stModule.ScrollTrigger
      gsap.registerPlugin(ScrollTrigger)

      if (cancelled) return
      if (!sectionRef.current || !trackRef.current) return

      const panels = trackRef.current.querySelectorAll<HTMLElement>('.destination-panel')
      const totalWidth = panels.length * window.innerWidth

      ctx = gsap.context(() => {
        gsap!.to(trackRef.current, {
          x: -(totalWidth - window.innerWidth),
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: `+=${totalWidth * 0.85}`,
            scrub: 1.2,
            pin: true,
            anticipatePin: 1,
          },
        })

        // Parallax on individual images
        panels.forEach((panel) => {
          const img = panel.querySelector<HTMLElement>('.dest-img')
          if (!img) return
          gsap!.fromTo(
            img,
            { xPercent: -8 },
            {
              xPercent: 8,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top top',
                end: `+=${totalWidth * 0.85}`,
                scrub: 1.5,
              },
            },
          )
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
      className="relative bg-espresso overflow-hidden"
      style={{ height: '100vh' }}
    >
      {/* Section label (pinned) */}
      <div
        ref={labelRef}
        className="absolute top-8 left-8 md:left-16 z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
        >
          <SectionLabel className="text-taupe">Destinations</SectionLabel>
        </motion.div>
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        className="flex h-full"
        style={{ width: `${DESTINATIONS.length * 100}vw` }}
      >
        {DESTINATIONS.map((dest, index) => (
          <div
            key={dest.slug}
            className="destination-panel relative flex-shrink-0 overflow-hidden"
            style={{ width: '100vw', height: '100vh' }}
          >
            {/* Background image */}
            <div className="dest-img absolute inset-[-8%] top-0 bottom-0">
              <Image
                src={dest.imageUrl}
                alt={dest.name}
                fill
                className="object-cover"
                sizes="100vw"
                priority={index === 0}
              />
            </div>

            {/* Overlay gradient */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to right, rgba(26,23,19,0.7) 0%, rgba(26,23,19,0.2) 50%, transparent 100%)',
              }}
            />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-16 md:pt-28">
              {/* Country number */}
              <div className="self-end">
                <span className="font-heading text-ivory/20 text-[120px] md:text-[180px] font-light leading-none select-none">
                  0{index + 1}
                </span>
              </div>

              {/* Text content */}
              <div className="max-w-md">
                {/* Vertical country name */}
                <div className="flex items-end gap-6 mb-6">
                  <span className="section-label text-taupe [writing-mode:vertical-rl] tracking-[0.3em] h-20">
                    {dest.name}
                  </span>
                  <div className="w-12 h-[1px] bg-taupe/60 mb-1" />
                </div>

                <h2 className="font-heading text-ivory text-3xl md:text-4xl lg:text-5xl font-light leading-[1.1] mb-4">
                  {dest.tagline}
                </h2>

                <p className="text-ivory/50 text-sm md:text-base font-light leading-relaxed max-w-sm">
                  {dest.story}
                </p>

                <div className="mt-8">
                  <CTALink href={`/destinations/${dest.slug}`} className="text-ivory/70">
                    Explore {dest.name}
                  </CTALink>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {DESTINATIONS.map((dest) => (
          <div key={dest.slug} className="w-8 h-[1px] bg-ivory/20" />
        ))}
      </div>
    </section>
  )
}
