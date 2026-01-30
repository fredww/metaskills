import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth.config'

// Enroll in a challenge
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
    const { challengeId } = body

    if (!challengeId) {
      return NextResponse.json(
        { message: 'Challenge ID is required' },
        { status: 400 }
      )
    }

    // Check if challenge exists
    const challenge = await prisma.challenge.findUnique({
      where: { id: challengeId }
    })

    if (!challenge) {
      return NextResponse.json(
        { message: 'Challenge not found' },
        { status: 404 }
      )
    }

    // Check if already enrolled
    const existingEnrollment = await prisma.challengeEnrollment.findUnique({
      where: {
        userId_challengeId: {
          userId: user.id,
          challengeId
        }
      }
    })

    if (existingEnrollment) {
      return NextResponse.json(
        { message: 'Already enrolled in this challenge' },
        { status: 400 }
      )
    }

    // Create enrollment
    const enrollment = await prisma.challengeEnrollment.create({
      data: {
        userId: user.id,
        challengeId,
        progress: 0,
        resourceUrls: []
      },
      include: {
        challenge: true
      }
    })

    return NextResponse.json({
      message: 'Successfully enrolled in challenge',
      enrollment
    })
  } catch (error) {
    console.error('Challenge enrollment error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Update challenge progress (when a resource is completed)
export async function PATCH(request: Request) {
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
    const { enrollmentId, resourceUrl } = body

    if (!enrollmentId || !resourceUrl) {
      return NextResponse.json(
        { message: 'Enrollment ID and resource URL are required' },
        { status: 400 }
      )
    }

    // Get enrollment
    const enrollment = await prisma.challengeEnrollment.findUnique({
      where: { id: enrollmentId },
      include: { challenge: true }
    })

    if (!enrollment || enrollment.userId !== user.id) {
      return NextResponse.json(
        { message: 'Enrollment not found' },
        { status: 404 }
      )
    }

    // Check if already tracked this resource
    if (enrollment.resourceUrls.includes(resourceUrl)) {
      return NextResponse.json({
        message: 'Resource already tracked',
        enrollment
      })
    }

    // Update progress
    const updatedEnrollment = await prisma.challengeEnrollment.update({
      where: { id: enrollmentId },
      data: {
        resourceUrls: [...enrollment.resourceUrls, resourceUrl],
        progress: enrollment.progress + 1,
        ...(enrollment.progress + 1 >= enrollment.challenge.targetCount ? { completedAt: new Date() } : {})
      },
      include: { challenge: true }
    })

    return NextResponse.json({
      message: 'Challenge progress updated',
      enrollment: updatedEnrollment
    })
  } catch (error) {
    console.error('Challenge progress update error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
