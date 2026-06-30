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
    <section className="relative bg-espresso py-14 xs:py-16 md:py-20 lg:py-24">
      {/* Section header */}
      <div ref={labelRef} className="section-px mb-10 md:mb-12">
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
        className="destinations-track flex gap-5 md:gap-8 lg:gap-10 overflow-x-auto pb-4 snap-x snap-mandatory section-px"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
          scrollPaddingLeft: '20px',
        }}
      >
        <style>{`.destinations-track::-webkit-scrollbar { display: none; }`}</style>
        {destinations.map((dest, index) => (
          <motion.div
            key={dest.slug}
            className="flex-shrink-0 snap-start group"
            style={{ width: 'clamp(220px, 58vw, 420px)' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-5%' }}
            transition={{ duration: 0.7, delay: 0.08 * index, ease }}
          >
            {/* Image with overlay content */}
            <div className="relative overflow-hidden aspect-[4/5] md:aspect-[4/5]" style={{ borderRadius: 12, maxHeight: 'min(58vh, 480px)' }}>
              {dest.image?.asset ? (
                <Image
                  src={sanityImageUrl(dest.image, 800)}
                  alt={dest.image.alt || dest.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  sizes="(max-width: 768px) 60vw, 520px"
                  priority={index === 0}
                  blurDataURL={dest.image.asset.metadata?.lqip}
                  placeholder={dest.image.asset.metadata?.lqip ? 'blur' : undefined}
                />
              ) : (
                <div className="absolute inset-0 bg-charcoal/40" />
              )}
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(16,13,10,0.9) 0%, rgba(16,13,10,0.5) 45%, rgba(16,13,10,0.1) 75%, transparent 100%)' }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                <span
                  className="section-label tracking-[0.3em] block mb-1"
                  style={{ color: '#f5f0eb', textShadow: '0 2px 20px rgba(16,13,10,0.9)' }}
                >
                  {dest.name}
                </span>
                <h2 className="font-heading text-ivory text-lg md:text-2xl font-light leading-[1.15] mb-2">
                  {dest.tagline}
                </h2>
                <p className="text-ivory/60 text-xs font-light leading-relaxed line-clamp-2 mb-3" style={{ maxWidth: 320 }}>
                  {dest.story}
                </p>
                <Link href={`/destinations/${dest.slug}`} className="btn-primary-dark !py-2 !px-4 !text-[9px]">
                  Explore
                  <svg width="11" height="8" viewBox="0 0 14 10" fill="none">
                    <path d="M9 1l4 4-4 4M13 5H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Scroll hint */}
      <div className="section-px mt-6 flex items-center gap-3">
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
