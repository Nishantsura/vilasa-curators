'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { COLLECTIONS } from '@/lib/constants'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { ease } from '@/lib/animations'
import type { Collection } from '@/types'

// Unsplash placeholder images — swap with real photography when ready
const PLACEHOLDER: Record<string, string> = {
  'living-room':               'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
  'dining':                    'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80',
  'modular-kitchen':           'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
  'bedrooms-wardrobes':        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
  'mattresses-pillow-filling': 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
  'tiles-stones':              'https://images.unsplash.com/photo-1615971677499-5467cbab01b0?w=800&q=80',
  'doors':                     'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=800&q=80',
  'wall-panels':               'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
  'fabric-selection':          'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  'carpets':                   'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=80',
  'outdoor-furniture':         'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80',
  'artifacts-statement-pieces':'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=800&q=80',
}

// 12 collections → 3 columns of 4
const COL_1 = COLLECTIONS.slice(0, 4)   // left  — counter-scroll (bottom → top reveal)
const COL_2 = COLLECTIONS.slice(4, 8)   // mid   — normal scroll  (top → bottom reveal)
const COL_3 = COLLECTIONS.slice(8, 12)  // right — counter-scroll (bottom → top reveal)

function CollectionCard({ collection }: { collection: Collection }) {
  const imgSrc = PLACEHOLDER[collection.slug] ?? PLACEHOLDER['living-room']

  return (
    <Link href={`/collections/${collection.slug}`} className="group block w-[22vw]">
      {/* Portrait image */}
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: '3 / 4', willChange: 'transform' }}
      >
        <Image
          src={imgSrc}
          alt={collection.title}
          fill
          unoptimized
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          sizes="22vw"
        />

        {/* Hover overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              'linear-gradient(to top, rgba(26,23,19,0.88) 0%, rgba(26,23,19,0.35) 55%, transparent 100%)',
          }}
        />

        {/* Collection number — ghosted watermark */}
        <span
          className="absolute top-5 right-5 font-heading font-light leading-none select-none pointer-events-none transition-opacity duration-500 group-hover:opacity-0"
          style={{ fontSize: 'clamp(48px, 4.5vw, 72px)', color: 'rgba(245,240,235,0.14)' }}
        >
          {collection.number}
        </span>

        {/* Description rises on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
          <p
            className="text-ivory/75 font-light leading-relaxed"
            style={{ fontSize: 'clamp(11px, 0.85vw, 13px)' }}
          >
            {collection.description}
          </p>
        </div>
      </div>

      {/* Title */}
      <div className="pt-4 pb-2">
        <h3
          className="font-heading text-espresso font-light leading-tight"
          style={{ fontSize: 'clamp(16px, 1.4vw, 22px)' }}
        >
          {collection.title}
        </h3>
        <span className="section-label text-bronze mt-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          Explore →
        </span>
      </div>
    </Link>
  )
}

export function CollectionsSection() {
  const headerRef = useRef<HTMLDivElement>(null)
  const outerRef  = useRef<HTMLDivElement>(null)
  const isInView  = useInView(headerRef, { once: true, margin: '-10%' })

  useEffect(() => {
    let cancelled = false
    let ctx: { revert: () => void } | undefined

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (cancelled) return
      if (!outerRef.current) return

      // Only animate on desktop
      const mm = gsap.matchMedia()
      mm.add('(min-width: 769px)', () => {
        const vh = window.innerHeight

        const col1List = outerRef.current!.querySelector<HTMLElement>('.col-1-list')
        const col2List = outerRef.current!.querySelector<HTMLElement>('.col-2-list')
        const col3List = outerRef.current!.querySelector<HTMLElement>('.col-3-list')
        if (!col1List || !col2List || !col3List) return

        const listH = col2List.offsetHeight
        const travel = listH - vh  // px each column needs to travel

        // Size the outer wrapper so sticky duration = travel distance exactly
        outerRef.current!.style.height = `${listH}px`
        ScrollTrigger.refresh()

        const innerCtx = gsap.context(() => {
          // Middle (even): top → bottom reveal — starts at top (y=0), ends pulled up
          gsap.set(col2List, { y: 0 })
          // Left & right (odd): bottom → top reveal — starts pulled up (bottom items visible), ends at top
          gsap.set(col1List, { y: -travel })
          gsap.set(col3List, { y: -travel })

          const st = {
            trigger: outerRef.current,
            start: 'top top',
            end:   'bottom bottom',
            scrub: 1.2,
          }

          // Middle moves up (normal direction)
          gsap.to(col2List, { y: -travel, ease: 'none', scrollTrigger: st })
          // Left & right move down (counter direction — bottom items arrive first)
          gsap.to(col1List, { y: 0,       ease: 'none', scrollTrigger: st })
          gsap.to(col3List, { y: 0,       ease: 'none', scrollTrigger: st })
        }, outerRef)

        ctx = innerCtx
        return () => innerCtx.revert()
      })

      return () => mm.revert()
    }

    init()
    return () => {
      cancelled = true
      ctx?.revert()
    }
  }, [])

  return (
    <section className="bg-bone">
      {/* Section header — scrolls away before carousel locks */}
      <div ref={headerRef} className="px-8 md:px-16 pt-28 md:pt-40 pb-16 max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
          className="flex items-end justify-between"
        >
          <div>
            <SectionLabel className="mb-6 block">Collections</SectionLabel>
            <h2 className="font-heading text-espresso text-4xl md:text-6xl lg:text-7xl font-light leading-[0.95]">
              Twelve worlds.
              <br />
              <em className="text-bronze">One vision.</em>
            </h2>
          </div>
          <p className="hidden md:block text-charcoal/50 text-sm font-light max-w-xs text-right leading-relaxed">
            Each collection draws from workshops, quarries, and artisans found
            across five continents.
          </p>
        </motion.div>
      </div>

      {/* ── Desktop: sticky 3-column counter-scroll ── */}
      {/*
        outerRef provides scroll distance. The sticky inner (100vh) locks while
        GSAP translates each column list at 1:1 with scroll — no pin, no DOM mutation.
        Height is set precisely by JS so the sticky exits the moment travel completes.
      */}
      <div
        ref={outerRef}
        className="hidden md:block"
        style={{ height: '200vh' /* JS will overwrite with exact listH */ }}
      >
        <div
          className="sticky top-0 h-screen overflow-hidden"
          style={{ backgroundColor: '#ede8e0' }}
        >
          <div
            className="grid h-full"
            style={{
              width: '90vw',
              margin: '0 auto',
              gridTemplateColumns: 'repeat(3, 1fr)',
            }}
          >
            {/* Left column — counter-scroll */}
            <div className="relative overflow-hidden h-full flex justify-center">
              <div
                className="col-1-list absolute"
                style={{ display: 'flex', flexDirection: 'column', gap: '6vw', width: '22vw' }}
              >
                {COL_1.map((c) => (
                  <CollectionCard key={c.id} collection={c} />
                ))}
              </div>
            </div>

            {/* Middle column — normal scroll */}
            <div className="relative overflow-hidden h-full flex justify-center">
              <div
                className="col-2-list absolute"
                style={{ display: 'flex', flexDirection: 'column', gap: '6vw', width: '22vw' }}
              >
                {COL_2.map((c) => (
                  <CollectionCard key={c.id} collection={c} />
                ))}
              </div>
            </div>

            {/* Right column — counter-scroll */}
            <div className="relative overflow-hidden h-full flex justify-center">
              <div
                className="col-3-list absolute"
                style={{ display: 'flex', flexDirection: 'column', gap: '6vw', width: '22vw' }}
              >
                {COL_3.map((c) => (
                  <CollectionCard key={c.id} collection={c} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile: single column ── */}
      <div
        className="flex flex-col gap-12 py-12 md:hidden"
        style={{ width: '90vw', margin: '0 auto' }}
      >
        {COLLECTIONS.map((c) => (
          <CollectionCard key={c.id} collection={c} />
        ))}
      </div>
    </section>
  )
}
