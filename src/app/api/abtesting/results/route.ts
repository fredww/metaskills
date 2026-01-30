import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth.config'
import { getTestResults } from '@/lib/ab-testing'
import { requireAdminApi } from '@/lib/auth'

/**
 * GET /api/abtesting/results
 * Get A/B test results (admin only)
 */
export async function GET(request: Request) {
  try {
    // Check admin permissions
    const authCheck = await requireAdminApi()
    if (authCheck.error) {
      return NextResponse.json(
        { message: authCheck.error },
        { status: authCheck.status }
      )
    }

    const { searchParams } = new URL(request.url)
    const testId = searchParams.get('testId')

    if (!testId) {
      // Get all tests with summary
      const tests = await prisma.aBTest.findMany({
        orderBy: { createdAt: 'desc' }
      })

      const results = await Promise.all(
        tests.map(async (test) => {
          const testResults = await getTestResults(test.id)

          // Calculate conversion rates
          const calculateRate = (conversions: any, type: string) => {
            const count = conversions[type] || 0
            const total = testResults.totalAssignments / 2 // Approximate per variant
            return total > 0 ? ((count / total) * 100).toFixed(2) : '0.00'
          }

          return {
            id: test.id,
            name: test.name,
            description: test.description,
            isActive: test.isActive,
            testType: test.testType,
            testContext: test.testContext,
            trafficAllocation: test.trafficAllocation,
            createdAt: test.createdAt,
            startDate: test.startDate,
            endDate: test.endDate,
            results: testResults
          }
        })
      )

      return NextResponse.json({ tests: results })
    }

    // Get specific test results
    const test = await prisma.aBTest.findUnique({
      where: { id: testId }
    })

    if (!test) {
      return NextResponse.json(
        { message: 'Test not found' },
        { status: 404 }
      )
    }

    const testResults = await getTestResults(testId)

    // Get detailed conversion data
    const conversions = await prisma.aBTestConversion.findMany({
      where: {
        assignment: {
          testId
        }
      },
      include: {
        assignment: {
          select: {
            variant: true
          }
        }
      },
      orderBy: { convertedAt: 'desc' },
      take: 100
    })

    return NextResponse.json({
      test,
      results: testResults,
      recentConversions: conversions
    })
  } catch (error) {
    console.error('A/B test results error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * PATCH /api/abtesting/results
 * Update test status (activate/deactivate)
 */
export async function PATCH(request: Request) {
  try {
    // Check admin permissions
    const authCheck = await requireAdminApi()
    if (authCheck.error) {
      return NextResponse.json(
        { message: authCheck.error },
        { status: authCheck.status }
      )
    }

    const { testId, isActive, endDate } = await request.json()

    if (!testId) {
      return NextResponse.json(
        { message: 'Missing testId' },
        { status: 400 }
      )
    }

    const updated = await prisma.aBTest.update({
      where: { id: testId },
      data: {
        ...(isActive !== undefined && { isActive }),
        ...(endDate && { endDate: new Date(endDate) })
      }
    })

    return NextResponse.json({
      success: true,
      test: updated
    })
  } catch (error) {
    console.error('A/B test update error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
