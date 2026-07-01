'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { NAV_ITEMS } from '@/lib/constants'
import { ease, easeExit } from '@/lib/animations'

interface FullscreenMenuProps {
  isOpen: boolean
  onClose: () => void
}

const menuVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.4, ease: easeExit },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease, delay: 0.1 + i * 0.08 },
  }),
  exit: { opacity: 0, x: -20, transition: { duration: 0.3 } },
}

export function FullscreenMenu({ isOpen, onClose }: FullscreenMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] bg-espresso flex flex-col justify-between p-8 md:p-16 overflow-hidden"
          variants={menuVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Subtle background texture */}
          <div className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 20% 80%, #8c7660 0%, transparent 50%), radial-gradient(circle at 80% 20%, #6b2d3e 0%, transparent 50%)',
            }}
          />

          {/* Top row */}
          <div className="relative z-10 flex justify-between items-start">
            <Link href="/" onClick={onClose}>
              <Image
                src="/images/Vilasa png.png"
                alt="Vilasa"
                width={800}
                height={200}
                className="w-[45vw] md:w-[25vw] max-w-[350px] h-auto"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </Link>
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="section-label text-taupe hover:text-ivory transition-colors duration-300"
            >
              Close
            </button>
          </div>

          {/* Navigation items */}
          <nav className="relative z-10">
            <ul className="space-y-2">
              {NAV_ITEMS.slice(1).map((item, i) => (
                <li key={item.href}>
                  <motion.div
                    custom={i}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="group font-heading text-ivory text-5xl md:text-7xl lg:text-8xl font-light leading-none hover:text-taupe transition-colors duration-500 block"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </nav>

          {/* Bottom info */}
          <motion.div
            className="relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.6, delay: 0.6 } }}
            exit={{ opacity: 0 }}
          >
            <p className="section-label text-taupe">
              Global Luxury Sourcing
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
