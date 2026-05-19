'use client'

import { motion } from 'framer-motion'
import { CTALink } from '@/components/ui/CTALink'
import { ease } from '@/lib/animations'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center px-8">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease }}
      >
        <span className="font-heading text-beige text-[160px] font-light leading-none select-none block">
          404
        </span>
        <p className="font-heading text-espresso text-2xl md:text-3xl font-light mb-8 -mt-4">
          This page does not exist.
        </p>
        <p className="text-charcoal/50 text-sm font-light mb-10">
          But the world's most considered objects do.
        </p>
        <CTALink href="/">Return Home</CTALink>
      </motion.div>
    </div>
  )
}
