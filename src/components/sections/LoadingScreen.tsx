'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
          <GrainOverlay />

          {/* Logo */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, ease }}
          >
            <h1 className="font-heading text-ivory text-2xl md:text-3xl tracking-[0.35em] uppercase font-light">
              Vilasa Curators
            </h1>
          </motion.div>

          {/* Tagline */}
          <AnimatePresence>
            {phase !== 'logo' && (
              <motion.p
                className="section-label text-taupe mt-6"
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
                className="mt-16 flex flex-col items-center gap-4"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease }}
              >
                <p className="section-label text-taupe/60 text-[10px]">
                  For the best experience, enable sound.
                </p>
                <button
                  onClick={handleEnter}
                  className="cta-underline section-label text-ivory mt-2 hover:opacity-60 transition-opacity duration-300"
                >
                  Enter Experience
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Thin bottom line */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 h-[1px] bg-taupe/30"
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
