/**
 * Referral & Affiliate Tracking System
 * Manages user referrals, click tracking, and revenue sharing
 */

import { prisma } from './prisma'

/**
 * Generate a unique referral code for a user
 * Format: METASKILLS-XXXX (8 characters)
 */
export async function generateReferralCode(userId: string): Promise<string> {
  // Check if user already has a referral code
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { referralCode: true }
  })

  if (user?.referralCode) {
    return user.referralCode
  }

  // Generate unique code
  const code = `METASKILLS-${Math.random().toString(36).substring(2, 6).toUpperCase()}${Date.now().toString(36).substring(6, 10).toUpperCase()}`

  // Update user with referral code
  await prisma.user.update({
    where: { id: userId },
    data: { referralCode: code }
  })

  return code
}

/**
 * Create a referral relationship when a new user registers
 */
export async function createReferralRelationship(
  referrerId: string,
  referredId: string,
  referralCode: string
): Promise<void> {
  // Check if referred user already has a referrer
  const existingReferral = await prisma.userReferral.findUnique({
    where: { referredId }
  })

  if (existingReferral) {
    throw new Error('User already has a referrer')
  }

  // Create referral relationship
  await prisma.userReferral.create({
    data: {
      referrerId,
      referredId,
      referralCode,
      status: 'PENDING',
      commissionRate: 30.00 // Default 30% commission rate
    }
  })
}

/**
 * Record an affiliate click/conversion
 */
export async function recordAffiliateClick(params: {
  userId?: string
  resourceUrl: string
  resourceType: string
  asin?: string
  referralCode?: string
  source?: string
}): Promise<{ clickId: string; affiliateUrl: string }> {
  const clickId = crypto.randomUUID()

  // Get commission rate from referral if exists
  let commissionRate = 0
  if (params.referralCode) {
    const referral = await prisma.userReferral.findUnique({
      where: { referralCode: params.referralCode }
    })
    commissionRate = referral?.commissionRate ? Number(referral.commissionRate) : 0
  }

  // Record the click
  await prisma.affiliateConversion.create({
    data: {
      userId: params.userId,
      resourceUrl: params.resourceUrl,
      resourceType: params.resourceType as any,
      asin: params.asin,
      referralCode: params.referralCode,
      clickId,
      clickedAt: new Date(),
      metadata: {
        source: params.source,
        commissionRate
      }
    }
  })

  // Generate affiliate URL
  const affiliateUrl = generateAffiliateUrl(params.resourceUrl, {
    referralCode: params.referralCode,
    clickId,
    source: params.source as any
  })

  return { clickId, affiliateUrl }
}

/**
 * Generate affiliate URL with tracking parameters
 */
function generateAffiliateUrl(
  originalUrl: string,
  params: {
    referralCode?: string
    clickId: string
    source?: string
  }
): string {
  try {
    const url = new URL(originalUrl)

    // Add Amazon tag if it's an Amazon URL
    if (url.hostname.includes('amazon')) {
      const tag = process.env.AMAZON_ASSOCIATES_TAG || 'metaskillsai-20'
      url.searchParams.set('tag', tag)
    }

    // Add tracking parameters
    if (params.referralCode) {
      url.searchParams.set('ref', params.referralCode)
    }

    url.searchParams.set('clickId', params.clickId)

    if (params.source) {
      url.searchParams.set('ref_', params.source)
    }

    return url.toString()
  } catch (error) {
    console.error('Error generating affiliate URL:', error)
    return originalUrl
  }
}

/**
 * Get referral statistics for a user
 */
export async function getReferralStats(userId: string) {
  const [
    totalReferrals,
    activeReferrals,
    totalConversions,
    totalEarnings
  ] = await Promise.all([
    // Total referrals
    prisma.userReferral.count({
      where: { referrerId: userId }
    }),

    // Active referrals (status = ACTIVE)
    prisma.userReferral.count({
      where: {
        referrerId: userId,
        status: 'ACTIVE'
      }
    }),

    // Total conversions from referrals
    prisma.affiliateConversion.count({
      where: {
        referralCode: { in: prisma.userReferral.findMany({ where: { referrerId: userId }, select: { referralCode: true } }).then(r => r.map(x => x.referralCode!)) },
        converted: true
      }
    }),

    // Total earnings
    prisma.affiliatePayout.aggregate({
      where: {
        userId,
        status: { in: ['PAID', 'PROCESSING'] }
      },
      _sum: { amount: true }
    })
  ])

  // Get current balance
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { totalEarnings: true }
  })

  return {
    totalReferrals,
    activeReferrals,
    totalConversions,
    totalEarnings: Number(totalEarnings._sum.amount || 0),
    currentBalance: Number(user?.totalEarnings || 0),
    pendingPayouts: await prisma.affiliatePayout.count({
      where: { userId, status: 'PENDING' }
    })
  }
}

/**
 * Activate a referral when referred user completes qualifying action
 */
export async function activateReferral(referredId: string): Promise<void> {
  await prisma.userReferral.updateMany({
    where: { referredId },
    data: {
      status: 'ACTIVE',
      activatedAt: new Date()
    }
  })
}

/**
 * Calculate and distribute earnings from a conversion
 */
export async function distributeEarnings(params: {
  asin: string
  orderId: string
  commissionAmount: number
  clickId?: string
  referralCode?: string
}): Promise<void> {
  // Find the conversion
  const conversion = await prisma.affiliateConversion.findFirst({
    where: {
      asin: params.asin,
      converted: false
    },
    orderBy: { clickedAt: 'desc' }
  })

  if (!conversion) {
    console.log('No conversion found for ASIN:', params.asin)
    return
  }

  // Get commission rate
  let commissionRate = 0
  if (conversion.referralCode) {
    const referral = await prisma.userReferral.findUnique({
      where: { referralCode: conversion.referralCode }
    })
    commissionRate = referral?.commissionRate ? Number(referral.commissionRate) : 0
  }

  // Calculate shares
  const userShare = params.commissionAmount * (commissionRate / 100)
  const platformShare = params.commissionAmount - userShare

  // Update conversion
  await prisma.affiliateConversion.update({
    where: { id: conversion.id },
    data: {
      converted: true,
      orderId: params.orderId,
      commissionAmount: params.commissionAmount,
      userShare,
      platformShare,
      convertedAt: new Date(),
      reportedAt: new Date()
    }
  })

  // Add to referrer's earnings if there's a referral
  if (conversion.referralCode && userShare > 0) {
    const referral = await prisma.userReferral.findUnique({
      where: { referralCode: conversion.referralCode },
      select: { referrerId: true }
    })

    if (referral) {
      await prisma.user.update({
        where: { id: referral.referrerId },
        data: {
          totalEarnings: { increment: userShare }
        }
      })
    }
  }
}

/**
 * Request a payout
 */
export async function requestPayout(params: {
  userId: string
  amount: number
  payoutMethod: string
  payoutDetails: Record<string, any>
}): Promise<{ payoutId: string; status: string }> {
  // Check user's balance
  const user = await prisma.user.findUnique({
    where: { id: params.userId },
    select: { totalEarnings: true }
  })

  if (!user || Number(user.totalEarnings) < params.amount) {
    throw new Error('Insufficient balance')
  }

  // Create payout record
  const payout = await prisma.affiliatePayout.create({
    data: {
      userId: params.userId,
      amount: params.amount,
      status: 'PENDING',
      payoutMethod: params.payoutMethod,
      payoutDetails: params.payoutDetails
    }
  })

  // Deduct from balance
  await prisma.user.update({
    where: { id: params.userId },
    data: {
      totalEarnings: { decrement: params.amount }
    }
  })

  return {
    payoutId: payout.id,
    status: payout.status
  }
}

/**
 * Get referral tier based on number of active referrals
 */
export function getReferralTier(activeReferrals: number): {
  level: string
  commissionRate: number
  benefits: string[]
} {
  if (activeReferrals >= 100) {
    return {
      level: 'PLATINUM',
      commissionRate: 50,
      benefits: ['最高分成', '优先提现', '年度奖励']
    }
  } else if (activeReferrals >= 50) {
    return {
      level: 'GOLD',
      commissionRate: 40,
      benefits: ['高比例分成', '专属支持', '提前结算']
    }
  } else if (activeReferrals >= 10) {
    return {
      level: 'SILVER',
      commissionRate: 30,
      benefits: ['提升分成', '月度报告']
    }
  } else {
    return {
      level: 'BRONZE',
      commissionRate: 20,
      benefits: ['基础收益分成']
    }
  }
}
