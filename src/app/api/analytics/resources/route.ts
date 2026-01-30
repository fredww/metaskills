import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth.config'

// Analytics API - for admins to view resource performance
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
    const timeframe = searchParams.get('timeframe') || '30' // days
    const skillCode = searchParams.get('skillCode')

    // Calculate date range
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - parseInt(timeframe))

    // Get clicks in timeframe
    const whereClause: any = {
      clickedAt: { gte: startDate }
    }

    if (skillCode) {
      whereClause.skillCode = skillCode
    }

    const [clicks, ratings, comments, totalUsers] = await Promise.all([
      // Resource clicks
      prisma.resourceClick.findMany({
        where: whereClause,
        orderBy: { clickedAt: 'desc' }
      }),

      // Resource ratings
      prisma.resourceRating.findMany({
        where: {
          createdAt: { gte: startDate }
        },
        orderBy: { createdAt: 'desc' }
      }),

      // Comments
      prisma.resourceComment.findMany({
        where: {
          createdAt: { gte: startDate }
        },
        orderBy: { createdAt: 'desc' }
      }),

      // Total user count for comparison
      prisma.user.count()
    ])

    // Aggregate analytics
    const clicksByResource = clicks.reduce((acc: Record<string, any>, click) => {
      const key = `${click.resourceType}:${click.resourceUrl}`
      if (!acc[key]) {
        acc[key] = {
          resourceType: click.resourceType,
          resourceUrl: click.resourceUrl,
          skillCode: click.skillCode,
          clickCount: 0,
          uniqueClickers: new Set()
        }
      }
      acc[key].clickCount++
      acc[key].uniqueClickers.add(click.userId)
      return acc
    }, {})

    const clicksBySkill = clicks.reduce((acc: Record<string, number>, click) => {
      acc[click.skillCode] = (acc[click.skillCode] || 0) + 1
      return acc
    }, {})

    const clicksByType = clicks.reduce((acc: Record<string, number>, click) => {
      acc[click.resourceType] = (acc[click.resourceType] || 0) + 1
      return acc
    }, {})

    const clicksBySource = clicks.reduce((acc: Record<string, number>, click) => {
      acc[click.clickSource] = (acc[click.clickSource] || 0) + 1
      return acc
    }, {})

    // Top resources
    const topResources = Object.values(clicksByResource)
      .map(item => ({
        ...item,
        uniqueClickers: item.uniqueClickers.size
      }))
      .sort((a, b) => b.clickCount - a.clickCount)
      .slice(0, 20)

    // Rating statistics
    const averageRatings = ratings.reduce((acc: Record<string, any>, rating) => {
      const key = `${rating.resourceType}:${rating.resourceUrl}`
      if (!acc[key]) {
        acc[key] = {
          resourceType: rating.resourceType,
          resourceUrl: rating.resourceUrl,
          totalRating: 0,
          count: 0
        }
      }
      acc[key].totalRating += rating.rating
      acc[key].count++
      return acc
    }, {})

    const ratingStats = Object.values(averageRatings).map(item => ({
      ...item,
      averageRating: item.totalRating / item.count
    }))

    // Engagement metrics
    const engagementRate = totalUsers > 0 ? (clicks.length / totalUsers) * 100 : 0

    // Get resource names for top clicked resources
    const { findBookByUrl, findToolByUrl } = await import('@/lib/skill-resources')

    const topResourcesWithDetails = topResources.map(resource => {
      if (resource.resourceType === 'BOOK') {
        const found = findBookByUrl(resource.resourceUrl)
        if (found) {
          return {
            ...resource,
            title: found.book.title,
            author: found.book.author
          }
        }
      } else if (resource.resourceType === 'TOOL') {
        const found = findToolByUrl(resource.resourceUrl)
        if (found) {
          return {
            ...resource,
            title: found.tool.name
          }
        }
      }
      return resource
    })

    return NextResponse.json({
      summary: {
        totalClicks: clicks.length,
        totalRatings: ratings.length,
        totalComments: comments.length,
        uniqueUsersEngaged: totalUsers,
        engagementRate: Math.round(engagementRate * 100) / 100,
        timeframeDays: timeframe
      },
      clicksBySkill,
      clicksByType,
      clicksBySource,
      topResources: topResourcesWithDetails,
      ratingStats
    })
  } catch (error) {
    console.error('Analytics fetch error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
