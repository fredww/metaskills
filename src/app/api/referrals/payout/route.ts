/**
 * Payout API Endpoints
 * POST /api/referrals/payout - Request payout
 * GET /api/referrals/payout - Get payout history
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { requestPayout } from '@/lib/referral-system'
import { prisma } from '@/lib/prisma'

/**
 * POST /api/referrals/payout - Request a payout
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
      select: { id: true, totalEarnings: true }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const body = await req.json()
    const { amount, payoutMethod, payoutDetails } = body

    if (!amount || !payoutMethod || !payoutDetails) {
      return NextResponse.json(
        { error: 'Missing required fields: amount, payoutMethod, payoutDetails' },
        { status: 400 }
      )
    }

    // Validate amount
    if (Number(amount) < 10) {
      return NextResponse.json(
        { error: 'Minimum payout amount is $10' },
        { status: 400 }
      )
    }

    // Request payout
    const result = await requestPayout({
      userId: user.id,
      amount: Number(amount),
      payoutMethod,
      payoutDetails
    })

    return NextResponse.json({
      ...result,
      message: 'Payout requested successfully',
      newBalance: Number(user.totalEarnings) - Number(amount)
    })
  } catch (error: any) {
    console.error('Error requesting payout:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to request payout' },
      { status: 500 }
    )
  }
}

/**
 * GET /api/referrals/payout - Get payout history
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
      select: { id: true }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Get payouts
    const payouts = await prisma.affiliatePayout.findMany({
      where: { userId: user.id },
      orderBy: { requestedAt: 'desc' },
      take: 50
    })

    return NextResponse.json({ payouts })
  } catch (error) {
    console.error('Error getting payout history:', error)
    return NextResponse.json(
      { error: 'Failed to get payout history' },
      { status: 500 }
    )
  }
}
