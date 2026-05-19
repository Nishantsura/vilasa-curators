'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { PROCESS_STEPS } from '@/lib/constants'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { CTALink } from '@/components/ui/CTALink'
import { staggerContainer, fadeUp, imageReveal, ease } from '@/lib/animations'

export default function ProcessPage() {
  return (
    <div className="bg-ivory min-h-screen">
      {/* Header */}
      <section className="px-8 md:px-16 pt-40 pb-20 max-w-[1400px] mx-auto">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          <motion.div variants={fadeUp}>
            <SectionLabel className="block mb-8">Process</SectionLabel>
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="font-heading text-espresso text-5xl md:text-7xl font-light leading-[0.95]"
          >
            How a room
            <br />
            <em className="text-bronze">comes to itself.</em>
          </motion.h1>
        </motion.div>
      </section>

      {/* Steps */}
      <section className="px-8 md:px-16 pb-32 max-w-[1400px] mx-auto space-y-28 md:space-y-40">
        {PROCESS_STEPS.map((step, index) => (
          <div
            key={step.number}
            className="grid md:grid-cols-[1fr_1fr] gap-12 md:gap-20 items-center"
          >
            <motion.div
              variants={imageReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-10%' }}
              className={`relative aspect-[4/3] overflow-hidden ${index % 2 !== 0 ? 'md:order-2' : ''}`}
            >
              <Image
                src={step.imageUrl}
                alt={step.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-10%' }}
              className={index % 2 !== 0 ? 'md:order-1' : ''}
            >
              <motion.span
                variants={fadeUp}
                className="font-heading text-beige text-[100px] font-light leading-none select-none block -mb-4"
              >
                {step.number}
              </motion.span>
              <motion.h2
                variants={fadeUp}
                className="font-heading text-espresso text-3xl md:text-4xl font-light mb-5"
              >
                {step.title}
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-charcoal/65 text-base md:text-lg font-light leading-relaxed max-w-sm"
              >
                {step.description}
              </motion.p>
            </motion.div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="bg-espresso py-24 px-8 md:px-16">
        <motion.div
          className="max-w-[800px] mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease }}
        >
          <h2 className="font-heading text-ivory text-3xl md:text-5xl font-light leading-[1.1]">
            Ready to begin
            <br />
            <em className="text-bronze">your journey?</em>
          </h2>
          <CTALink href="/contact" className="text-ivory/70">
            Begin a Conversation
          </CTALink>
        </motion.div>
      </section>
    </div>
  )
}
