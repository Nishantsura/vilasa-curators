'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { CTALink } from '@/components/ui/CTALink'
import { ease } from '@/lib/animations'
import type { Destination } from '@/types'
import { sanityImageUrl } from '../../../sanity/lib/image'

export function DestinationsSection({ destinations }: { destinations: Destination[] }) {
  const outerRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(labelRef, { once: true, margin: '-10%' })

  useEffect(() => {
    let cancelled = false
    let ctx: { revert: () => void } | undefined

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (cancelled) return
      if (!outerRef.current || !trackRef.current) return

      const travelX = (destinations.length - 1) * window.innerWidth

      ctx = gsap.context(() => {
        // Translate the track horizontally as the outer section scrolls.
        // CSS sticky on the inner viewport-height div handles the visual lock
        // — no GSAP pin, no DOM node movement, no React removeChild conflict.
        gsap.to(trackRef.current, {
          x: -travelX,
          ease: 'none',
          scrollTrigger: {
            trigger: outerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.2,
          },
        })

        // Subtle parallax on each image
        const panels = trackRef.current!.querySelectorAll<HTMLElement>('.destination-panel')
        panels.forEach((panel) => {
          const img = panel.querySelector<HTMLElement>('.dest-img')
          if (!img) return
          gsap.fromTo(
            img,
            { yPercent: 5 },
            {
              yPercent: -5,
              ease: 'none',
              scrollTrigger: {
                trigger: outerRef.current,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1.5,
              },
            }
          )
        })
      }, outerRef)
    }

    init()
    return () => {
      cancelled = true
      ctx?.revert()
    }
  }, [destinations.length])

  return (
    /*
     * Outer section height = 100vh per destination (first 100vh is the "pinned"
     * view; remaining (N-1)*100vh provides scroll distance for the horizontal travel).
     * CSS sticky on the inner div replaces GSAP pin — zero DOM mutation.
     */
    <section
      ref={outerRef}
      className="relative bg-espresso"
      style={{ height: `${destinations.length * 100}vh` }}
    >
      {/* Section label */}
      <div ref={labelRef} className="absolute top-8 left-8 md:left-16 z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
        >
          <SectionLabel className="text-taupe">Destinations</SectionLabel>
        </motion.div>
      </div>

      {/* Sticky viewport — CSS locks this while outer section scrolls */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Horizontal track */}
        <div
          ref={trackRef}
          className="flex h-full"
          style={{ width: `${destinations.length * 100}vw` }}
        >
          {destinations.map((dest, index) => (
            <div
              key={dest.slug}
              className="destination-panel relative flex-shrink-0 overflow-hidden"
              style={{ width: '100vw', height: '100vh' }}
            >
              <div className="h-full flex items-center px-8 md:px-16">
                <div className="max-w-[1400px] mx-auto w-full grid md:grid-cols-[1fr_1fr] gap-12 md:gap-20 items-center">

                  {/* Left: text */}
                  <div>
                    <span
                      className="font-heading text-ivory/10 font-light leading-none select-none block mb-6"
                      style={{ fontSize: 'clamp(80px, 10vw, 140px)' }}
                    >
                      0{index + 1}
                    </span>
                    <div className="flex items-end gap-6 mb-6">
                      <span className="section-label text-taupe [writing-mode:vertical-rl] tracking-[0.3em] h-20">
                        {dest.name}
                      </span>
                      <div className="w-12 h-[1px] bg-taupe/60 mb-1" />
                    </div>
                    <h2 className="font-heading text-ivory text-3xl md:text-4xl lg:text-5xl font-light leading-[1.1] mb-4">
                      {dest.tagline}
                    </h2>
                    <p className="text-ivory/50 text-sm md:text-base font-light leading-relaxed max-w-sm mb-8">
                      {dest.story}
                    </p>
                    <CTALink href={`/destinations/${dest.slug}`} className="text-ivory/70">
                      Explore {dest.name}
                    </CTALink>
                  </div>

                  {/* Right: image */}
                  <div className="relative overflow-hidden hidden md:block" style={{ aspectRatio: '3 / 4', maxHeight: '70vh' }}>
                    {dest.image?.asset && (
                      <div className="dest-img absolute inset-0">
                        <Image
                          src={sanityImageUrl(dest.image, 1000)}
                          alt={dest.image.alt || dest.name}
                          fill
                          className="object-cover"
                          sizes="45vw"
                          priority={index === 0}
                          blurDataURL={dest.image.asset.metadata?.lqip}
                          placeholder={dest.image.asset.metadata?.lqip ? 'blur' : undefined}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {destinations.map((dest) => (
          <div key={dest.slug} className="w-8 h-[1px] bg-ivory/20" />
        ))}
      </div>
    </section>
  )
}
