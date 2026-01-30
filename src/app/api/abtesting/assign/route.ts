import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth.config'
import { getActiveTest, assignVariant } from '@/lib/ab-testing'

/**
 * GET /api/abtesting/assign
 * Get or create A/B test assignment for a user
 */
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    const userId = session?.user?.email ? await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true }
    }).then(u => u?.id) : undefined

    const { searchParams } = new URL(request.url)
    const context = searchParams.get('context') || 'skill-page'
    const testType = searchParams.get('testType') || undefined

    // Get active test for this context
    const test = await getActiveTest(context, testType)

    if (!test) {
      return NextResponse.json({
        assignment: null,
        message: 'No active test found'
      })
    }

    // Assign variant
    const variant = await assignVariant(test.id, userId)

    // Get assignment record
    const assignment = await prisma.aBTestAssignment.findFirst({
      where: {
        testId: test.id,
        userId: userId || undefined
      },
      orderBy: { assignedAt: 'desc' }
    })

    return NextResponse.json({
      testId: test.id,
      testType: test.testType,
      context: test.testContext,
      variant,
      config: variant === 'A' ? test.variantA : test.variantB,
      assignmentId: assignment?.id
    })
  } catch (error) {
    console.error('A/B test assignment error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
