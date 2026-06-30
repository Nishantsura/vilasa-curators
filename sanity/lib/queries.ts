import { groq } from 'next-sanity'

export const allDestinationsQuery = groq`
  *[_type == "destination"] | order(order asc) {
    name,
    "slug": slug.current,
    tagline,
    story,
    materials,
    image {
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      },
      hotspot,
      crop
    },
    order
  }
`

export const destinationBySlugQuery = groq`
  *[_type == "destination" && slug.current == $slug][0] {
    name,
    "slug": slug.current,
    tagline,
    story,
    materials,
    image {
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      },
      hotspot,
      crop
    }
  }
`

export const allCollectionsQuery = groq`
  *[_type == "collection"] | order(order asc) {
    title,
    "slug": slug.current,
    number,
    description,
    images[] {
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      },
      hotspot,
      crop,
      alt
    },
    order
  }
`

export const collectionBySlugQuery = groq`
  *[_type == "collection" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    number,
    description,
    images[] {
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      },
      hotspot,
      crop,
      alt
    }
  }
`

export const homePageQuery = groq`
  *[_type == "homePage"][0] {
    heroHeadline,
    heroHeadlineItalic,
    heroSubtext,
    heroCtaLabel,
    heroCtaHref,
    featuredLabel,
    philosophyHeading,
    philosophyHeadingItalic,
    philosophyBody,
    philosophyCards[] {
      heading,
      sub,
      image {
        asset->{
          _id,
          url,
          metadata { lqip, dimensions }
        },
        hotspot,
        crop
      }
    },
    destinationsHeading,
    destinationsHeadingItalic,
    collectionsHeading,
    collectionsHeadingItalic,
    collectionsSubtext,
    finalCtaHeading,
    finalCtaHeadingItalic,
    finalCtaBody
  }
`

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteTitle,
    siteDescription,
    ogImage {
      asset->{ url }
    },
    email,
    whatsappNumber,
    tagline
  }
`
