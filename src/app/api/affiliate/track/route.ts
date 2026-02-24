/**
 * Affiliate Click Tracking API
 * POST /api/affiliate/track - Record affiliate click and generate tracked URL
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { recordAffiliateClick } from '@/lib/referral-system'
import { extractASIN } from '@/lib/amazon-affiliate'
import { prisma } from '@/lib/prisma'

/**
 * POST /api/affiliate/track - Record click and get affiliate URL
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { resourceUrl, resourceType, referralCode, source } = body

    if (!resourceUrl || !resourceType) {
      return NextResponse.json(
        { error: 'Missing required fields: resourceUrl, resourceType' },
        { status: 400 }
      )
    }

    // Get optional user session
    const session = await getServerSession()
    const userId = session?.user?.email
      ? (await prisma.user.findUnique({
          where: { email: session.user.email },
          select: { id: true }
        }))?.id
      : undefined

    // Extract ASIN if Amazon URL
    const asin = extractASIN(resourceUrl)

    // Record the click
    const { clickId, affiliateUrl } = await recordAffiliateClick({
      userId,
      resourceUrl,
      resourceType,
      asin: asin || undefined,
      referralCode,
      source
    })

    return NextResponse.json({
      clickId,
      affiliateUrl,
      message: 'Click tracked successfully'
    })
  } catch (error) {
    console.error('Error tracking click:', error)
    return NextResponse.json(
      { error: 'Failed to track click' },
      { status: 500 }
    )
  }
}
