'use client'

import { useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { DestinationsSection } from '@/components/sections/DestinationsSection'
import { CollectionsSection } from '@/components/sections/CollectionsSection'
import { staggerContainer, fadeUp, ease } from '@/lib/animations'
import type { Collection, Destination, HomePage, SiteSettings } from '@/types'

const GALLERY_IMAGES = [
  '/images/about us 1.png',
  '/images/about us 2.png',
  '/images/about us 3.png',
  '/images/about us 04.png',
  '/images/about us 05.png',
  '/images/about us 06.png',
  '/images/about us 07.png',
  '/images/about us 08.png',
  '/images/about us 10.png',
  '/images/about us 11.png',
  '/images/about us 12.png',
]

function GalleryStrip() {
  const trackRef = useRef<HTMLDivElement>(null)
  const speedRef = useRef(0.5)
  const posRef = useRef(0)
  const rafRef = useRef<number>(0)
  const isDragging = useRef(false)
  const dragStart = useRef(0)
  const scrollStart = useRef(0)

  const animate = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    if (!isDragging.current) {
      posRef.current -= speedRef.current
      const halfWidth = track.scrollWidth / 2
      if (Math.abs(posRef.current) >= halfWidth) {
        posRef.current += halfWidth
      }
      track.style.transform = `translateX(${posRef.current}px)`
    }
    rafRef.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [animate])

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true
    dragStart.current = e.clientX
    scrollStart.current = posRef.current
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }, [])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return
    const delta = e.clientX - dragStart.current
    posRef.current = scrollStart.current + delta
    const track = trackRef.current
    if (track) {
      const halfWidth = track.scrollWidth / 2
      if (Math.abs(posRef.current) >= halfWidth) {
        posRef.current += halfWidth * Math.sign(posRef.current)
      }
      track.style.transform = `translateX(${posRef.current}px)`
    }
  }, [])

  const handlePointerUp = useCallback(() => {
    isDragging.current = false
  }, [])

  const handleMouseEnter = useCallback(() => { speedRef.current = 0.2 }, [])
  const handleMouseLeave = useCallback(() => { speedRef.current = 0.5 }, [])

  const images = [...GALLERY_IMAGES, ...GALLERY_IMAGES]

  return (
    <section
      className="py-8 md:py-12 overflow-hidden cursor-grab active:cursor-grabbing select-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={trackRef} className="flex gap-4 md:gap-6" style={{ width: 'max-content', willChange: 'transform' }}>
        {images.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="relative flex-shrink-0 overflow-hidden group"
            style={{ width: 'clamp(200px, 30vw, 360px)', aspectRatio: '4 / 5', borderRadius: 8 }}
          >
            <Image
              src={src}
              alt={`Vilasa sourcing ${(i % GALLERY_IMAGES.length) + 1}`}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              sizes="30vw"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

interface AboutPageClientProps {
  collections: Collection[]
  destinations: Destination[]
  homePage: HomePage | null
  siteSettings: SiteSettings | null
}

export function AboutPageClient({
  collections,
  destinations,
  homePage,
  siteSettings,
}: AboutPageClientProps) {
  return (
    <div className="bg-ivory">
      {/* ── Our Story ── */}
      <section className="section-px pt-32 md:pt-40 pb-20 md:pb-28 content-max">
        <div className="grid md:grid-cols-[1fr_1fr] gap-10 md:gap-16 lg:gap-24">
          <motion.div
            initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[3/4] overflow-hidden"
            style={{ borderRadius: 12 }}
          >
            <Image
              src="/images/about us 09.png"
              alt="Founder of Vilasa Curators"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col justify-center"
          >
            <motion.div variants={fadeUp}>
              <SectionLabel className="block mb-8">Our Story</SectionLabel>
            </motion.div>
            <motion.p variants={fadeUp} className="font-heading text-espresso text-xl md:text-2xl font-light leading-[1.3] mb-6">
              Vilasa Curators began as a collection of answers to questions that
              had no catalogue.
            </motion.p>
            <motion.p variants={fadeUp} className="text-charcoal/65 text-sm md:text-base font-light leading-relaxed mb-5">
              I spent fifteen years traveling with designers who knew exactly what they wanted
              but couldn&apos;t find where to find it. A stone from a specific quarry in Tuscany.
              A lacquer finish from a specific workshop in H&#7897;i An. A textile made on a specific
              loom in Varanasi.
            </motion.p>
            <motion.p variants={fadeUp} className="text-charcoal/65 text-sm md:text-base font-light leading-relaxed mb-5">
              These things exist. They are being made, right now, by people who have spent
              their lives mastering a single material. But they are invisible to the
              international luxury market — because no one has bothered to find them,
              document them, and bring them into the conversation.
            </motion.p>
            <motion.p variants={fadeUp} className="text-charcoal/65 text-sm md:text-base font-light leading-relaxed">
              Vilasa is that conversation. A bridge between the workshops of five countries
              and the spaces that deserve what they make.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Image Gallery Strip ── */}
      <GalleryStrip />

      {/* ── Closing Quote ── */}
      <section className="bg-espresso py-16 md:py-24 section-px">
        <motion.div
          className="max-w-[900px] mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease }}
        >
          <p className="font-heading text-ivory text-2xl md:text-4xl font-light italic leading-[1.2]">
            &ldquo;More than objects. We compose atmospheres.&rdquo;
          </p>
        </motion.div>
      </section>

      {/* ── Collections Section ── */}
      <CollectionsSection
        collections={collections}
        heading={homePage?.collectionsHeading}
        headingItalic={homePage?.collectionsHeadingItalic}
        subtext={homePage?.collectionsSubtext}
      />

      {/* ── Destinations Section ── */}
      <DestinationsSection destinations={destinations} />
    </div>
  )
}
