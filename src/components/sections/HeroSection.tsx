'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ease } from '@/lib/animations'

import { toSentenceCase } from '@/lib/utils'
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
        className="relative z-10 w-full self-end pb-8 xs:pb-10 md:pb-14 lg:pb-16"
        style={{ y: textY, opacity: textOpacity }}
      >
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 section-px">

          {/* LEFT — headline + CTA */}
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.5, ease }}
          >
            <h1
              className="font-heading text-ivory leading-[1.0] mb-5"
              style={{ fontSize: 'clamp(32px, 5.5vw, 78px)' }}
            >
              {toSentenceCase(homePage?.heroHeadline || 'We source the world.')}
              <br />
              <em
                className="font-heading"
                style={{ fontStyle: 'italic', fontWeight: 300, color: 'rgba(245,240,235,0.82)', fontSize: 'clamp(26px, 4.2vw, 64px)' }}
              >
                {toSentenceCase(homePage?.heroHeadlineItalic || 'For spaces that feel inevitable.')}
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
              className="btn-primary-dark"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease }}
            >
              {homePage?.heroCtaLabel || 'Explore Collections'}
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                <path d="M9 1l4 4-4 4M13 5H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.a>
          </motion.div>

          {/* CENTER — featured label (desktop only) */}
          {homePage?.featuredLabel && (() => {
            const [line1, line2, line3] = homePage.featuredLabel.split(' — ')
            return (
              <motion.div
                className="hidden lg:flex flex-col items-center gap-1 absolute left-1/2 -translate-x-1/2 bottom-10 lg:bottom-14"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.0, delay: 1.2, ease }}
              >
                <p className="font-body text-ivory/50 tracking-[0.28em] uppercase text-center" style={{ fontSize: 9 }}>
                  {line1}
                </p>
                {line2 && (
                  <p className="font-heading text-ivory/75 tracking-[0.1em] uppercase text-center" style={{ fontSize: 13 }}>
                    {line2}
                  </p>
                )}
                {line3 && (
                  <p className="font-body text-ivory/35 tracking-[0.32em] uppercase text-center" style={{ fontSize: 9 }}>
                    {line3}
                  </p>
                )}
              </motion.div>
            )
          })()}
        </div>
      </motion.div>

      {/* Scroll indicator — hidden on small mobile */}
      <motion.div
        className="hidden sm:flex absolute right-6 md:right-12 bottom-36 md:bottom-40 flex-col items-center gap-2 pointer-events-none"
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
