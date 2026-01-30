import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth.config'
import { getResourcesBySkill } from '@/lib/skill-resources'
import { ResourceType } from '@prisma/client'

// Helper function to decode URL-encoded resource URL
function decodeResourceUrl(encodedUrl: string): string {
  return decodeURIComponent(encodedUrl)
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ resourceType: string; resourceUrl: string }> }
) {
  try {
    const { resourceType, resourceUrl } = await params
    const decodedUrl = decodeResourceUrl(resourceUrl)

    // Find resource in our data
    let resourceData: any = null

    // Search through all skills to find the resource
    const skillCodes = ['learning-to-learn', 'critical-thinking', 'self-awareness', 'mindfulness', 'resilience', 'communication', 'emotional-intelligence', 'empathy']

    for (const skillCode of skillCodes) {
      const skillResources = getResourcesBySkill(skillCode)
      if (!skillResources) continue

      if (resourceType === 'book') {
        const book = skillResources.books.find((b: any) => b.url === decodedUrl)
        if (book) {
          resourceData = { ...book, skillCode, type: 'book' }
          break
        }
      } else if (resourceType === 'tool') {
        const tool = skillResources.tools.find((t: any) => t.url === decodedUrl)
        if (tool) {
          resourceData = { ...tool, skillCode, type: 'tool' }
          break
        }
      }
    }

    if (!resourceData) {
      return NextResponse.json(
        { message: 'Resource not found' },
        { status: 404 }
      )
    }

    // Get ratings
    const ratings = await prisma.resourceRating.findMany({
      where: {
        resourceUrl: decodedUrl,
        resourceType: resourceType.toUpperCase() as ResourceType
      },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 10
    })

    // Calculate average rating
    const totalRatings = await prisma.resourceRating.count({
      where: {
        resourceUrl: decodedUrl,
        resourceType: resourceType.toUpperCase() as ResourceType
      }
    })

    const ratingSum = await prisma.resourceRating.aggregate({
      where: {
        resourceUrl: decodedUrl,
        resourceType: resourceType.toUpperCase() as ResourceType
      },
      _avg: {
        rating: true
      }
    })

    const averageRating = ratingSum._avg.rating || 0
    const ratingDistribution = await prisma.resourceRating.groupBy({
      by: ['rating'],
      where: {
        resourceUrl: decodedUrl,
        resourceType: resourceType.toUpperCase() as ResourceType
      },
      _count: true
    })

    // Get comments
    const comments = await prisma.resourceComment.findMany({
      where: {
        resourceUrl: decodedUrl,
        resourceType: resourceType.toUpperCase() as ResourceType,
        parentId: null // Only top-level comments
      },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        },
        replies: {
          include: {
            user: {
              select: {
                name: true,
                email: true
              }
            }
          },
          orderBy: { createdAt: 'asc' }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 20
    })

    // Get current user's rating if logged in
    let userRating = null
    const session = await getServerSession(authOptions)
    if (session?.user?.email) {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email }
      })

      if (user) {
        userRating = await prisma.resourceRating.findUnique({
          where: {
            userId_resourceUrl: {
              userId: user.id,
              resourceUrl: decodedUrl
            }
          }
        })
      }
    }

    return NextResponse.json({
      resource: resourceData,
      stats: {
        totalRatings,
        averageRating: Math.round(averageRating * 10) / 10,
        ratingDistribution: ratingDistribution.reduce((acc: any, item) => {
          acc[item.rating] = item._count
          return acc
        }, {})
      },
      ratings,
      comments,
      userRating
    })
  } catch (error) {
    console.error('Resource detail fetch error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
