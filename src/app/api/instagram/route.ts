import { NextResponse } from 'next/server'

export const revalidate = 3600

export interface InstagramPost {
  id: string
  caption?: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  media_url: string
  permalink: string
  timestamp: string
  thumbnail_url?: string
}

export async function GET() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN
  const userId = process.env.INSTAGRAM_USER_ID

  if (!token || !userId) {
    return NextResponse.json([])
  }

  try {
    const url = `https://graph.instagram.com/${userId}/media?fields=id,caption,media_type,media_url,permalink,timestamp,thumbnail_url&limit=12&access_token=${token}`
    const res = await fetch(url, { next: { revalidate: 3600 } })

    if (!res.ok) {
      return NextResponse.json([])
    }

    const data = await res.json()
    const posts: InstagramPost[] = (data.data || []).filter(
      (p: InstagramPost) => p.media_type === 'IMAGE' || p.media_type === 'CAROUSEL_ALBUM'
    )

    return NextResponse.json(posts)
  } catch {
    return NextResponse.json([])
  }
}
