import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth.config'
import { trackConversion } from '@/lib/ab-testing'

/**
 * POST /api/abtesting/track
 * Track a conversion event for A/B testing
 */
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      )
    }

    const body = await request.json()
    const { assignmentId, conversionType, resourceUrl, metadata } = body

    if (!assignmentId || !conversionType) {
      return NextResponse.json(
        { message: 'Missing required fields: assignmentId, conversionType' },
        { status: 400 }
      )
    }

    // Validate assignment exists and belongs to user
    const assignment = await prisma.aBTestAssignment.findFirst({
      where: {
        id: assignmentId,
        userId: user.id
      }
    })

    if (!assignment) {
      return NextResponse.json(
        { message: 'Assignment not found' },
        { status: 404 }
      )
    }

    // Track conversion
    await trackConversion(
      assignmentId,
      conversionType,
      resourceUrl,
      metadata
    )

    return NextResponse.json({
      success: true,
      message: 'Conversion tracked'
    })
  } catch (error) {
    console.error('A/B test tracking error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
