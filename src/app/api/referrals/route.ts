/**
 * Referral API Endpoints
 * GET /api/referrals - Get referral stats
 * POST /api/referrals - Generate referral code
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { generateReferralCode, getReferralStats, getReferralTier } from '@/lib/referral-system'
import { prisma } from '@/lib/prisma'

/**
 * GET /api/referrals - Get referral statistics
 */
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession()

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user from email
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, referralCode: true }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Get stats
    const stats = await getReferralStats(user.id)

    // Get current tier
    const tier = getReferralTier(stats.activeReferrals)

    return NextResponse.json({
      referralCode: user.referralCode,
      ...stats,
      tier
    })
  } catch (error) {
    console.error('Error getting referral stats:', error)
    return NextResponse.json(
      { error: 'Failed to get referral stats' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/referrals - Generate referral code
 */
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession()

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user from email
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Generate referral code
    const referralCode = await generateReferralCode(user.id)

    return NextResponse.json({
      referralCode,
      referralUrl: `${process.env.NEXTAUTH_URL}/?ref=${referralCode}`
    })
  } catch (error) {
    console.error('Error generating referral code:', error)
    return NextResponse.json(
      { error: 'Failed to generate referral code' },
      { status: 500 }
    )
  }
}
