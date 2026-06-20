'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { ease } from '@/lib/animations'
import type { Destination } from '@/types'
import { sanityImageUrl } from '../../../sanity/lib/image'

export function DestinationsSection({ destinations }: { destinations: Destination[] }) {
  const labelRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(labelRef, { once: true, margin: '-10%' })

  return (
    <section className="relative bg-espresso py-24 md:py-32">
      {/* Section header */}
      <div ref={labelRef} className="px-8 md:px-16 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
        >
          <SectionLabel className="text-taupe">Destinations</SectionLabel>
        </motion.div>
      </div>

      {/* Horizontal scroll track */}
      <div
        className="flex gap-6 md:gap-10 overflow-x-auto px-8 md:px-16 pb-8 snap-x snap-mandatory"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <style>{`.destinations-track::-webkit-scrollbar { display: none; }`}</style>
        {destinations.map((dest, index) => (
          <motion.div
            key={dest.slug}
            className="flex-shrink-0 snap-start"
            style={{ width: 'clamp(300px, 80vw, 520px)' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-5%' }}
            transition={{ duration: 0.7, delay: 0.08 * index, ease }}
          >
            {/* Image */}
            <div className="relative overflow-hidden mb-6" style={{ aspectRatio: '3 / 4' }}>
              {dest.image?.asset ? (
                <Image
                  src={sanityImageUrl(dest.image, 800)}
                  alt={dest.image.alt || dest.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 80vw, 520px"
                  priority={index === 0}
                  blurDataURL={dest.image.asset.metadata?.lqip}
                  placeholder={dest.image.asset.metadata?.lqip ? 'blur' : undefined}
                />
              ) : (
                <div className="absolute inset-0 bg-charcoal/40" />
              )}
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(26,23,19,0.7) 0%, transparent 50%)' }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="section-label text-taupe tracking-[0.3em] block mb-2">
                  {dest.name}
                </span>
                <span
                  className="font-heading text-ivory/10 font-light leading-none select-none block"
                  style={{ fontSize: 'clamp(60px, 8vw, 100px)' }}
                >
                  0{index + 1}
                </span>
              </div>
            </div>

            {/* Text */}
            <h2 className="font-heading text-ivory text-2xl md:text-3xl font-light leading-[1.15] mb-3">
              {dest.tagline}
            </h2>
            <p className="text-ivory/50 text-sm font-light leading-relaxed mb-6" style={{ maxWidth: 420 }}>
              {dest.story}
            </p>
            <Link
              href={`/destinations/${dest.slug}`}
              className="inline-flex items-center gap-2.5 px-5 py-2 text-ivory text-[10px] tracking-[0.22em] uppercase font-body font-medium transition-opacity duration-300 hover:opacity-80"
              style={{ backgroundColor: '#4a5240' }}
            >
              Explore {dest.name}
              <svg width="13" height="9" viewBox="0 0 14 10" fill="none">
                <path d="M9 1l4 4-4 4M13 5H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Scroll hint */}
      <div className="px-8 md:px-16 mt-6 flex items-center gap-3">
        <div className="w-8 h-[1px] bg-ivory/20" />
        <span className="text-ivory/30 text-[10px] tracking-[0.25em] uppercase font-body">
          Scroll sideways
        </span>
        <svg width="16" height="8" viewBox="0 0 16 8" fill="none" className="text-ivory/30">
          <path d="M12 1l3 3-3 3M15 4H1" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  )
}
