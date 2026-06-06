import { createClient } from 'next-sanity'

const isDev = process.env.NODE_ENV === 'development'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2025-06-06',
  useCdn: !isDev,
})

export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
}: {
  query: string
  params?: Record<string, unknown>
  tags?: string[]
}): Promise<T> {
  return client.fetch<T>(query, params, {
    next: isDev
      ? { revalidate: 0 }
      : { revalidate: 3600, tags },
  })
}
