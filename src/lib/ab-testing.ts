import { prisma } from './prisma'

export interface VariantConfig {
  layout?: 'horizontal' | 'vertical' | 'grid'
  ctaPosition?: 'top' | 'bottom' | 'inline'
  showThumbnail?: boolean
  thumbnailSize?: 'small' | 'medium' | 'large'
  descriptionLength?: 'short' | 'medium' | 'full'
  cardStyle?: 'minimal' | 'detailed' | 'highlighted'
}

export interface ABTestConfig {
  id: string
  name: string
  testType: string
  testContext: string
  variantA: VariantConfig
  variantB: VariantConfig
  trafficAllocation: number
}

/**
 * Get active A/B test for a specific context
 */
export async function getActiveTest(context: string, testType?: string): Promise<ABTestConfig | null> {
  const tests = await prisma.aBTest.findMany({
    where: {
      isActive: true,
      testContext: context,
      ...(testType && { testType: testType as any }),
      OR: [
        { endDate: null },
        { endDate: { gte: new Date() } }
      ]
    },
    orderBy: { createdAt: 'desc' },
    take: 1
  })

  if (tests.length === 0) return null

  const test = tests[0]
  return {
    id: test.id,
    name: test.name,
    testType: test.testType,
    testContext: test.testContext,
    variantA: test.variantA as VariantConfig,
    variantB: test.variantB as VariantConfig,
    trafficAllocation: test.trafficAllocation
  }
}

/**
 * Assign or get existing A/B test variant for a user
 */
export async function assignVariant(
  testId: string,
  userId?: string,
  sessionId?: string
): Promise<'A' | 'B'> {
  // Check if user/session already has an assignment
  if (userId) {
    const existing = await prisma.aBTestAssignment.findFirst({
      where: {
        testId,
        userId
      }
    })

    if (existing) {
      return existing.variant as 'A' | 'B'
    }
  } else if (sessionId) {
    const existing = await prisma.aBTestAssignment.findFirst({
      where: {
        testId,
        sessionId
      }
    })

    if (existing) {
      return existing.variant as 'A' | 'B'
    }
  }

  // Get test configuration
  const test = await prisma.aBTest.findUnique({
    where: { id: testId }
  })

  if (!test) {
    throw new Error(`Test ${testId} not found`)
  }

  // Assign variant based on traffic allocation
  const random = Math.random() * 100
  const variant = random < test.trafficAllocation ? 'A' : 'B'

  // Create assignment
  await prisma.aBTestAssignment.create({
    data: {
      testId,
      userId,
      sessionId,
      variant
    }
  })

  return variant as 'A' | 'B'
}

/**
 * Track conversion event for A/B testing
 */
export async function trackConversion(
  assignmentId: string,
  conversionType: 'CLICK' | 'VIEW' | 'RATE' | 'COMMENT' | 'ENGAGEMENT',
  resourceUrl?: string,
  metadata?: any
): Promise<void> {
  await prisma.aBTestConversion.create({
    data: {
      assignmentId,
      conversionType: conversionType as any,
      resourceUrl,
      metadata
    }
  })
}

/**
 * Get conversion data for a test
 */
export async function getTestResults(testId: string) {
  const assignments = await prisma.aBTestAssignment.findMany({
    where: { testId },
    include: {
      conversions: true
    }
  })

  const variantAAssignments = assignments.filter(a => a.variant === 'A')
  const variantBAssignments = assignments.filter(a => a.variant === 'B')

  const conversionsByType = (assignments: any[]) => {
    return assignments.reduce((acc: Record<string, number>, assignment) => {
      assignment.conversions.forEach((conversion: any) => {
        acc[conversion.conversionType] = (acc[conversion.conversionType] || 0) + 1
      })
      return acc
    }, {})
  }

  return {
    totalAssignments: assignments.length,
    variantA: {
      count: variantAAssignments.length,
      percentage: assignments.length > 0 ? (variantAAssignments.length / assignments.length) * 100 : 0,
      conversions: conversionsByType(variantAAssignments)
    },
    variantB: {
      count: variantBAssignments.length,
      percentage: assignments.length > 0 ? (variantBAssignments.length / assignments.length) * 100 : 0,
      conversions: conversionsByType(variantBAssignments)
    }
  }
}

/**
 * Get variant config for a user/context
 */
export async function getVariantForUser(
  context: string,
  userId?: string,
  sessionId?: string,
  testType?: string
): Promise<{ variant: 'A' | 'B'; config: VariantConfig } | null> {
  const test = await getActiveTest(context, testType)

  if (!test) return null

  const variant = await assignVariant(test.id, userId, sessionId)

  return {
    variant,
    config: variant === 'A' ? test.variantA : test.variantB
  }
}
