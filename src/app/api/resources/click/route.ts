import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth.config'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    // Allow tracking for anonymous users too, but we'll store userId as null
    let userId: string | null = null

    if (session?.user?.email) {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email }
      })

      if (user) {
        userId = user.id
      }
    }

    const body = await request.json()
    const {
      resourceType,
      resourceTitle,
      resourceUrl,
      skillCode,
      clickSource,
      metadata
    } = body

    // Validate required fields
    if (!resourceType || !resourceTitle || !resourceUrl || !skillCode || !clickSource) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate resource type
    const validResourceTypes = ['BOOK', 'TOOL', 'COURSE', 'ARTICLE', 'VIDEO']
    if (!validResourceTypes.includes(resourceType)) {
      return NextResponse.json(
        { message: 'Invalid resource type' },
        { status: 400 }
      )
    }

    // Validate click source
    const validClickSources = ['SKILL_PAGE', 'PRACTICE_MODAL', 'DASHBOARD', 'RECOMMENDATION_EMAIL']
    if (!validClickSources.includes(clickSource)) {
      return NextResponse.json(
        { message: 'Invalid click source' },
        { status: 400 }
      )
    }

    // Store resource click (only for logged-in users)
    if (userId) {
      await prisma.resourceClick.create({
        data: {
          userId,
          resourceType,
          resourceTitle,
          resourceUrl,
          skillCode,
          clickSource,
          metadata: metadata || {}
        }
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Resource click tracked'
    })
  } catch (error) {
    console.error('Resource click tracking error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Get resource click analytics (for admins or user's own clicks)
export async function GET(request: Request) {
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

    const { searchParams } = new URL(request.url)
    const skillCode = searchParams.get('skillCode')
    const resourceType = searchParams.get('resourceType')

    // Build where clause
    const where: any = { userId: user.id }

    if (skillCode) {
      where.skillCode = skillCode
    }

    if (resourceType) {
      where.resourceType = resourceType
    }

    // Get resource clicks
    const clicks = await prisma.resourceClick.findMany({
      where,
      orderBy: { clickedAt: 'desc' },
      take: 100
    })

    // Group clicks by skill
    const clicksBySkill: Record<string, number> = {}
    clicks.forEach(click => {
      clicksBySkill[click.skillCode] = (clicksBySkill[click.skillCode] || 0) + 1
    })

    // Group clicks by resource type
    const clicksByType: Record<string, number> = {}
    clicks.forEach(click => {
      clicksByType[click.resourceType] = (clicksByType[click.resourceType] || 0) + 1
    })

    return NextResponse.json({
      totalClicks: clicks.length,
      clicksBySkill,
      clicksByType,
      recentClicks: clicks.slice(0, 20)
    })
  } catch (error) {
    console.error('Resource click fetch error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
