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
    const { resourceType, resourceUrl, skillCode, rating, review } = body

    // Validate required fields
    if (!resourceType || !resourceUrl || !skillCode || !rating) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate rating
    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { message: 'Rating must be between 1 and 5' },
        { status: 400 }
      )
    }

    // Check if user already rated this resource
    const existingRating = await prisma.resourceRating.findUnique({
      where: {
        userId_resourceUrl: {
          userId: user.id,
          resourceUrl: resourceUrl
        }
      }
    })

    if (existingRating) {
      // Update existing rating
      const updatedRating = await prisma.resourceRating.update({
        where: { id: existingRating.id },
        data: {
          rating,
          review: review || null
        }
      })

      return NextResponse.json({
        message: 'Rating updated successfully',
        rating: updatedRating
      })
    }

    // Create new rating
    const newRating = await prisma.resourceRating.create({
      data: {
        userId: user.id,
        resourceType,
        resourceUrl,
        skillCode,
        rating,
        review: review || null
      }
    })

    return NextResponse.json({
      message: 'Rating submitted successfully',
      rating: newRating
    })
  } catch (error) {
    console.error('Resource rating error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Get ratings for a resource
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

    const ratings = await prisma.resourceRating.findMany({
      where: { resourceUrl },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ ratings })
  } catch (error) {
    console.error('Resource ratings fetch error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
