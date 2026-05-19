'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import type { Collection } from '@/types'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { CTALink } from '@/components/ui/CTALink'
import { staggerContainer, fadeUp, imageReveal, ease } from '@/lib/animations'

export function CollectionDetail({ collection }: { collection: Collection }) {
  return (
    <div className="bg-ivory min-h-screen">
      {/* Header */}
      <section className="px-8 md:px-16 pt-40 pb-20 max-w-[1400px] mx-auto">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          <motion.div variants={fadeUp}>
            <SectionLabel className="block mb-4">{collection.number}</SectionLabel>
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="font-heading text-espresso text-5xl md:text-7xl lg:text-8xl font-light leading-[0.95]"
          >
            {collection.title}
          </motion.h1>
        </motion.div>
      </section>

      {/* Description + first image */}
      <section className="px-8 md:px-16 pb-28 max-w-[1400px] mx-auto grid md:grid-cols-[1fr_1fr] gap-16 md:gap-28 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease }}
        >
          <p className="font-heading text-espresso text-2xl md:text-3xl font-light leading-[1.3] mb-8">
            {collection.description}
          </p>
          <CTALink href="/contact">
            Enquire About This Collection
          </CTALink>
        </motion.div>

        {collection.images[0] && (
          <motion.div
            variants={imageReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10%' }}
            className="relative aspect-[4/3] overflow-hidden"
          >
            <Image
              src={collection.images[0]}
              alt={collection.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        )}
      </section>

      {/* Additional images */}
      {collection.images.length > 1 && (
        <section className="px-8 md:px-16 pb-32 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {collection.images.slice(1).map((img, i) => (
              <motion.div
                key={i}
                variants={imageReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-5%' }}
                className="relative aspect-[3/4] overflow-hidden"
              >
                <Image
                  src={img}
                  alt={`${collection.title} ${i + 2}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-bone py-24 px-8 md:px-16">
        <motion.div
          className="max-w-[600px] mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease }}
        >
          <p className="font-heading text-espresso text-2xl md:text-3xl font-light italic leading-[1.3] mb-8">
            "More than objects. We compose atmospheres."
          </p>
          <CTALink href="/contact">Begin a Conversation</CTALink>
        </motion.div>
      </section>
    </div>
  )
}
