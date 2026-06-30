'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { GrainOverlay } from '@/components/ui/GrainOverlay'
import { ease } from '@/lib/animations'

interface LoadingScreenProps {
  onComplete: () => void
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [phase, setPhase] = useState<'logo' | 'tagline' | 'enter' | 'exiting'>('logo')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('tagline'), 800)
    const t2 = setTimeout(() => setPhase('enter'), 2000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  const handleEnter = () => {
    setPhase('exiting')
    setTimeout(onComplete, 900)
  }

  return (
    <AnimatePresence>
      {phase !== 'exiting' ? (
        <motion.div
          className="fixed inset-0 z-[200] bg-espresso flex flex-col items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease }}
        >
          {/* Background image */}
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="/Firstscreen.jpg"
              alt=""
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
            {/* Light base tint */}
            <div className="absolute inset-0" style={{ backgroundColor: 'rgba(16,13,10,0.38)' }} />
            {/* Soft vignette only at edges — centre stays vivid */}
            <div
              className="absolute inset-0"
              style={{ background: 'radial-gradient(ellipse 55% 50% at 50% 42%, transparent 0%, rgba(16,13,10,0.42) 100%)' }}
            />
          </div>

          <GrainOverlay />

          {/* Logo */}
          <motion.div
            className="text-center relative z-10 px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, ease }}
          >
            <h1
              className="font-heading text-ivory uppercase font-light"
              style={{
                fontSize: 'clamp(22px, 5vw, 56px)',
                letterSpacing: '0.32em',
                textShadow: '0 2px 32px rgba(16,13,10,0.95), 0 0 60px rgba(16,13,10,0.7)',
              }}
            >
              Vilasa Curators
            </h1>
          </motion.div>

          {/* Tagline */}
          <AnimatePresence>
            {phase !== 'logo' && (
              <motion.p
                className="relative z-10 mt-4 font-body uppercase font-light tracking-[0.28em] px-4 py-1.5 rounded-sm"
                style={{
                  fontSize: 'clamp(9px, 1.1vw, 11px)',
                  color: 'rgba(245,240,235,0.9)',
                  backgroundColor: 'rgba(16,13,10,0.45)',
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease }}
              >
                Global Luxury Sourcing
              </motion.p>
            )}
          </AnimatePresence>

          {/* Enter button */}
          <AnimatePresence>
            {phase === 'enter' && (
              <motion.div
                className="mt-14 flex flex-col items-center gap-7 relative z-10"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease }}
              >
                <p
                  className="font-body uppercase tracking-[0.26em] px-3 py-1 rounded-sm"
                  style={{
                    fontSize: 10,
                    color: 'rgba(245,240,235,0.75)',
                    backgroundColor: 'rgba(16,13,10,0.42)',
                  }}
                >
                  Objects sourced across four continents.
                </p>
                <button onClick={handleEnter} className="btn-gold">
                  Enter Experience
                  <svg width="13" height="9" viewBox="0 0 14 10" fill="none">
                    <path d="M9 1l4 4-4 4M13 5H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Thin bottom line */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 h-[1px] bg-ivory/20 z-10"
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ duration: 1.8, delay: 0.5, ease }}
          />
        </motion.div>
      ) : (
        <motion.div
          key="exit-overlay"
          className="fixed inset-0 z-[200] bg-espresso"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.9, ease }}
        />
      )}
    </AnimatePresence>
  )
}
