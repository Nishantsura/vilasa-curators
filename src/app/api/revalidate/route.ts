import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

/**
 * Sanity → Next.js on-publish revalidation.
 *
 * A Sanity webhook POSTs here whenever a document is published/changed.
 * We verify the request signature against SANITY_REVALIDATE_SECRET, then
 * clear the Next.js cache tag matching the document's `_type`
 * (homePage | destination | collection | siteSettings) — the same tags
 * passed in sanity/lib/queries via sanityFetch. The affected pages then
 * regenerate on the next request, so edits appear within seconds.
 */
type WebhookPayload = { _type?: string }

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_REVALIDATE_SECRET
    )

    if (!isValidSignature) {
      return new NextResponse('Invalid signature', { status: 401 })
    }

    if (!body?._type) {
      return new NextResponse('Bad Request: missing _type', { status: 400 })
    }

    revalidateTag(body._type, 'max')

    return NextResponse.json({
      revalidated: true,
      tag: body._type,
      now: Date.now(),
    })
  } catch (err) {
    console.error('Revalidate webhook error:', err)
    return new NextResponse((err as Error).message, { status: 500 })
  }
}
