import { createImageUrlBuilder } from '@sanity/image-url'
import { client } from './client'
import type { SanityImage } from '@/types'

const builder = createImageUrlBuilder(client)

export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source)
}

export function sanityImageUrl(
  image: SanityImage | null | undefined,
  width = 800,
): string {
  if (!image?.asset) return ''
  return urlFor(image).width(width).auto('format').quality(80).url()
}

export function sanityImageProps(image: SanityImage | null | undefined) {
  if (!image?.asset) return null
  return {
    src: urlFor(image).auto('format').quality(80).url(),
    blurDataURL: image.asset.metadata?.lqip,
    placeholder: image.asset.metadata?.lqip ? ('blur' as const) : undefined,
  }
}
