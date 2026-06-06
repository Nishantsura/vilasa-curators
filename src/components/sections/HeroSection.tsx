'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ease } from '@/lib/animations'

function WhatsAppIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

import type { HomePage, SiteSettings } from '@/types'

interface HeroSectionProps {
  homePage?: HomePage | null
  siteSettings?: SiteSettings | null
}

export function HeroSection({ homePage, siteSettings }: HeroSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const textOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])

  return (
    <section ref={ref} className="relative min-h-screen flex overflow-hidden bg-[#16130f]">

      {/* ── VIDEO BACKGROUND ── */}
      <motion.div className="absolute inset-0" style={{ scale: videoScale }}>
        <video
          autoPlay
          muted
          playsInline
          loop
          className="w-full h-full object-cover"
          style={{ opacity: 0.75 }}
        >
          <source src="/videos/home-bg.mp4" type="video/mp4" />
        </video>

        {/* Vignette edges */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 85% 85% at 50% 40%, transparent 35%, rgba(22,19,15,0.5) 100%)',
          }}
        />
        {/* Bottom gradient for text legibility */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: '70%',
            background: 'linear-gradient(to top, rgba(16,13,10,0.94) 0%, rgba(16,13,10,0.35) 60%, transparent 100%)',
          }}
        />
        {/* Top gradient for nav area */}
        <div
          className="absolute top-0 left-0 right-0 h-40"
          style={{ background: 'linear-gradient(to bottom, rgba(16,13,10,0.55) 0%, transparent 100%)' }}
        />
      </motion.div>

      {/* Grain */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* ── BOTTOM CONTENT ── */}
      <motion.div
        className="relative z-10 w-full self-end pb-10 md:pb-14"
        style={{ y: textY, opacity: textOpacity }}
      >
        <div className="flex items-end justify-between px-6 md:px-12">

          {/* LEFT — headline + CTA */}
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.5, ease }}
          >
            <h1
              className="font-heading text-ivory leading-[1.0] mb-5"
              style={{ fontSize: 'clamp(38px, 5.8vw, 82px)' }}
            >
              {homePage?.heroHeadline || 'WE SOURCE THE WORLD.'}
              <br />
              <em
                className="font-heading"
                style={{ fontStyle: 'italic', fontWeight: 300, color: 'rgba(245,240,235,0.82)' }}
              >
                {homePage?.heroHeadlineItalic || 'FOR SPACES THAT FEEL INEVITABLE.'}
              </em>
            </h1>

            <p
              className="text-ivory/50 font-body font-light leading-relaxed mb-9"
              style={{ fontSize: 'clamp(13px, 1.15vw, 16px)', maxWidth: 440 }}
            >
              {homePage?.heroSubtext || 'From marble quarries in Italy to lacquer workshops in Vietnam — every object chosen for the atmosphere it creates.'}
            </p>

            <motion.a
              href={homePage?.heroCtaHref || '/collections'}
              className="inline-flex items-center gap-3 px-6 py-3.5 text-ivory font-body font-medium uppercase tracking-[0.2em] transition-opacity duration-300 hover:opacity-80"
              style={{ backgroundColor: '#4a5240', fontSize: 11 }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease }}
            >
              {homePage?.heroCtaLabel || 'EXPLORE COLLECTIONS'}
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                <path d="M9 1l4 4-4 4M13 5H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.a>
          </motion.div>

          {/* CENTER — featured label (desktop only) */}
          <motion.div
            className="hidden md:flex flex-col items-center gap-1 absolute left-1/2 -translate-x-1/2 bottom-10 md:bottom-14"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 1.2, ease }}
          >
            <p className="font-body text-ivory/50 tracking-[0.28em] uppercase text-center" style={{ fontSize: 9 }}>
              FEATURED COLLECTION
            </p>
            <p className="font-heading text-ivory/75 tracking-[0.1em] uppercase text-center" style={{ fontSize: 13 }}>
              ARTIFACTS &amp; STATEMENT PIECES
            </p>
            <p className="font-body text-ivory/35 tracking-[0.32em] uppercase text-center" style={{ fontSize: 9 }}>
              ITALY · BALI · MEXICO
            </p>
          </motion.div>

          {/* RIGHT — WhatsApp CTA */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease }}
          >
            <a
              href={`https://wa.me/${siteSettings?.whatsappNumber || '919999999999'}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="flex items-center justify-center transition-opacity duration-300 hover:opacity-85"
              style={{ width: 56, height: 56, backgroundColor: '#25D366', color: '#fff' }}
            >
              <WhatsAppIcon />
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute right-6 md:right-12 bottom-36 md:bottom-40 flex flex-col items-center gap-2 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4, ease }}
      >
        <span
          className="font-body text-ivory/30 uppercase tracking-[0.3em]"
          style={{ writingMode: 'vertical-rl', fontSize: 9 }}
        >
          Scroll
        </span>
        <motion.div
          className="w-[1px] bg-ivory/25"
          initial={{ height: 0 }}
          animate={{ height: 40 }}
          transition={{ duration: 1.4, delay: 1.6, ease }}
        />
      </motion.div>
    </section>
  )
}
