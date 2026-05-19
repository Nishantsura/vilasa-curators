'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { staggerContainer, fadeUp, ease } from '@/lib/animations'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic goes here
    setSent(true)
  }

  return (
    <div className="bg-ivory min-h-screen">
      <section className="px-8 md:px-16 pt-40 pb-32 max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-[1fr_1fr] gap-16 md:gap-32">

          {/* Left: heading */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeUp}>
              <SectionLabel className="block mb-10">Contact</SectionLabel>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="font-heading text-espresso text-5xl md:text-6xl lg:text-7xl font-light leading-[0.95] mb-10"
            >
              Begin a
              <br />
              <em className="text-bronze">conversation.</em>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-charcoal/60 text-base font-light leading-relaxed max-w-sm mb-12"
            >
              We work with interior designers, architects, and private clients
              on projects that require the world's most considered objects.
              Tell us about your space.
            </motion.p>

            <motion.div variants={fadeUp} className="space-y-4">
              <div>
                <SectionLabel className="block mb-1">Email</SectionLabel>
                <a
                  href="mailto:hello@vilasacurators.com"
                  className="cta-underline text-charcoal/70 text-sm font-light"
                >
                  hello@vilasacurators.com
                </a>
              </div>
              <div>
                <SectionLabel className="block mb-1">WhatsApp</SectionLabel>
                <a
                  href="https://wa.me/91XXXXXXXXXX"
                  className="cta-underline text-charcoal/70 text-sm font-light"
                >
                  WhatsApp Enquiry
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease }}
          >
            {!sent ? (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label className="section-label block mb-3 text-taupe" htmlFor="name">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="w-full bg-transparent border-b border-beige py-3 text-espresso text-base font-light outline-none focus:border-bronze transition-colors duration-300 placeholder:text-taupe/50"
                    placeholder="Name"
                  />
                </div>

                <div>
                  <label className="section-label block mb-3 text-taupe" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    className="w-full bg-transparent border-b border-beige py-3 text-espresso text-base font-light outline-none focus:border-bronze transition-colors duration-300 placeholder:text-taupe/50"
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label className="section-label block mb-3 text-taupe" htmlFor="message">
                    Tell Us About Your Space
                  </label>
                  <textarea
                    id="message"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    rows={5}
                    className="w-full bg-transparent border-b border-beige py-3 text-espresso text-base font-light outline-none focus:border-bronze transition-colors duration-300 placeholder:text-taupe/50 resize-none"
                    placeholder="Describe your project, space, or enquiry..."
                  />
                </div>

                <button
                  type="submit"
                  className="cta-underline section-label text-espresso mt-4"
                >
                  Send Enquiry →
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease }}
                className="flex flex-col justify-center h-full"
              >
                <SectionLabel className="block mb-6">Received</SectionLabel>
                <p className="font-heading text-espresso text-2xl md:text-3xl font-light leading-[1.3]">
                  Thank you.
                  <br />
                  <em className="text-bronze">We will be in touch.</em>
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Closing line */}
      <section className="px-8 md:px-16 pb-24 max-w-[1400px] mx-auto">
        <motion.div
          className="border-t border-beige/60 pt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          <p className="font-heading italic text-taupe text-xl font-light">
            "More than objects. We compose atmospheres."
          </p>
        </motion.div>
      </section>
    </div>
  )
}
