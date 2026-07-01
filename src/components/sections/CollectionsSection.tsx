'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { ease } from '@/lib/animations'
import type { Collection } from '@/types'
import { sanityImageUrl } from '../../../sanity/lib/image'

function CollectionCard({ collection, isMobile }: { collection: Collection; isMobile?: boolean }) {
  const firstImage = collection.images?.[0]
  const imgSrc = firstImage?.asset
    ? sanityImageUrl(firstImage, 800)
    : ''

  return (
    <Link href={`/collections/${collection.slug}`} className="group block w-full">
      {/* Portrait image */}
      <div
        className="relative overflow-hidden bg-beige/30"
        style={{ aspectRatio: '3 / 4', willChange: 'transform', borderRadius: 12 }}
      >
        {imgSrc && (
          <Image
            src={imgSrc}
            alt={firstImage?.alt || collection.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            sizes={isMobile ? '90vw' : '22vw'}
            blurDataURL={firstImage?.asset?.metadata?.lqip}
            placeholder={firstImage?.asset?.metadata?.lqip ? 'blur' : undefined}
          />
        )}

        {/* Gradient overlay — always visible on mobile, hover on desktop */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
          style={{
            background:
              'linear-gradient(to top, rgba(26,23,19,0.88) 0%, rgba(26,23,19,0.45) 50%, transparent 100%)',
          }}
        />

        {/* Collection number — ghosted watermark */}
        <span
          className={`absolute top-5 right-5 font-heading font-light leading-none select-none pointer-events-none transition-opacity duration-500 ${isMobile ? '' : 'group-hover:opacity-0'}`}
          style={{ fontSize: 'clamp(48px, 4.5vw, 72px)', color: 'rgba(245,240,235,0.14)' }}
        >
          {collection.number}
        </span>

        {/* Title + description on image — always visible on mobile, hover on desktop */}
        <div className={`absolute bottom-0 left-0 right-0 p-5 transition-all duration-500 ease-out ${isMobile ? 'opacity-100 translate-y-0' : 'translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100'}`}>
          {isMobile && (
            <h3
              className="font-heading text-ivory font-light leading-tight mb-2"
              style={{ fontSize: '22px' }}
            >
              {collection.title}
            </h3>
          )}
          <p
            className="text-ivory/75 font-light leading-relaxed"
            style={{ fontSize: isMobile ? '13px' : 'clamp(11px, 0.85vw, 13px)' }}
          >
            {collection.description}
          </p>
        </div>
      </div>

      {/* Title — below image on desktop only */}
      {!isMobile && (
        <div className="pt-4 pb-2">
          <h3
            className="font-heading text-espresso font-light leading-tight"
            style={{ fontSize: 'clamp(18px, 1.5vw, 24px)' }}
          >
            {collection.title}
          </h3>
          <span className="section-label text-bronze mt-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            Explore →
          </span>
        </div>
      )}
    </Link>
  )
}

function MobileCollections({ collections }: { collections: Collection[] }) {
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? collections : collections.slice(0, 4)

  return (
    <div
      className="flex flex-col gap-10 py-10 md:hidden section-px"
    >
      {visible.map((c) => (
        <CollectionCard key={c.slug} collection={c} isMobile />
      ))}
      {!showAll && collections.length > 4 && (
        <motion.div
          className="flex justify-center pt-4"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          <button
            onClick={() => setShowAll(true)}
            className="inline-flex items-center gap-2.5 text-[11px] tracking-[0.18em] uppercase font-body font-medium whitespace-nowrap transition-all duration-300 hover:opacity-80"
            style={{ backgroundColor: 'rgba(26,23,19,0.08)', border: '1px solid rgba(26,23,19,0.2)', color: '#1a1713', borderRadius: '9999px', padding: '14px 32px' }}
          >
            View All Collections
            <svg width="13" height="9" viewBox="0 0 14 10" fill="none">
              <path d="M9 1l4 4-4 4M13 5H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </motion.div>
      )}
    </div>
  )
}

interface CollectionsSectionProps {
  collections: Collection[]
  heading?: string
  headingItalic?: string
  subtext?: string
}

export function CollectionsSection({
  collections,
  heading = 'Twelve worlds.',
  headingItalic = 'One vision.',
  subtext = 'Each collection draws from workshops, quarries, and artisans found across five continents.',
}: CollectionsSectionProps) {
  const COL_1 = collections.slice(0, 4)
  const COL_2 = collections.slice(4, 8)
  const COL_3 = collections.slice(8, 12)

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
      <div ref={headerRef} className="section-px pt-20 xs:pt-24 md:pt-32 lg:pt-40 pb-12 md:pb-16 content-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
          className="flex items-end justify-between"
        >
          <div>
            <SectionLabel className="mb-6 block">Collections</SectionLabel>
            <h2 className="font-heading text-espresso text-3xl md:text-5xl lg:text-7xl font-light leading-[0.95]">
              {heading}
              <br />
              <em className="text-bronze">{headingItalic}</em>
            </h2>
          </div>
          <p className="hidden md:block text-charcoal/50 text-sm font-light max-w-xs text-right leading-relaxed">
            {subtext}
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
                  <CollectionCard key={c.slug} collection={c} />
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
                  <CollectionCard key={c.slug} collection={c} />
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
                  <CollectionCard key={c.slug} collection={c} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile: single column (4 cards + view all) ── */}
      <MobileCollections collections={collections} />
    </section>
  )
}
