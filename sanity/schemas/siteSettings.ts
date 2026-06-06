import { defineType, defineField } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
      description: 'Shown in browser tab and search results (e.g. "Vilasa Curators — Global Luxury Sourcing")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'siteDescription',
      title: 'Site Description',
      type: 'text',
      rows: 3,
      description: 'Meta description for SEO — shown in Google search results',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ogImage',
      title: 'Social Share Image',
      type: 'image',
      description: 'Image shown when the site is shared on social media (recommended: 1200x630px)',
    }),
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
      description: 'Shown across the site as the contact email',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Number',
      type: 'string',
      description: 'Full phone number with country code, no spaces or symbols (e.g. "919999999999")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Brand Tagline',
      type: 'string',
      description: 'Recurring tagline used across the site (e.g. "More than objects. We compose atmospheres.")',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Site Settings' }),
  },
})
