import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth.config'

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
    const { resourceType, resourceUrl, skillCode, content, parentId } = body

    // Validate required fields
    if (!resourceType || !resourceUrl || !skillCode || !content) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create comment
    const comment = await prisma.resourceComment.create({
      data: {
        userId: user.id,
        resourceType,
        resourceUrl,
        skillCode,
        content,
        parentId: parentId || null
      },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    })

    return NextResponse.json({
      message: 'Comment posted successfully',
      comment
    })
  } catch (error) {
    console.error('Resource comment error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Get comments for a resource
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const resourceUrl = searchParams.get('resourceUrl')

    if (!resourceUrl) {
      return NextResponse.json(
        { message: 'resourceUrl is required' },
        { status: 400 }
      )
    }

    const comments = await prisma.resourceComment.findMany({
      where: {
        resourceUrl,
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
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ comments })
  } catch (error) {
    console.error('Resource comments fetch error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
