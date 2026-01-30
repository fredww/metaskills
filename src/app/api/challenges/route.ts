import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth.config'

// Get available challenges
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
    const type = searchParams.get('type')
    const active = searchParams.get('active')

    // Get available challenges
    const where: any = {
      isActive: active === 'false' ? false : true
    }

    if (type) {
      where.type = type.toUpperCase()
    }

    const challenges = await prisma.challenge.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    })

    // Get user's enrollments
    const enrollments = await prisma.challengeEnrollment.findMany({
      where: { userId: user.id },
      include: {
        challenge: true
      },
      orderBy: { startedAt: 'desc' }
    })

    // Calculate progress for each enrollment
    const enrollmentsWithProgress = enrollments.map(enrollment => {
      const progress = (enrollment.progress / enrollment.challenge.targetCount) * 100
      const isCompleted = enrollment.completedAt !== null
      const daysRemaining = Math.ceil(
        (enrollment.startedAt.getTime() + enrollment.challenge.timeframe * 24 * 60 * 60 * 1000 - Date.now()) / (24 * 60 * 60 * 1000)
      )

      return {
        ...enrollment,
        progress,
        isCompleted,
        daysRemaining: Math.max(0, daysRemaining)
      }
    })

    // Add enrollment status to challenges
    const challengesWithStatus = challenges.map(challenge => {
      const enrollment = enrollments.find(e => e.challengeId === challenge.id)
      return {
        ...challenge,
        isEnrolled: !!enrollment,
        enrollment: enrollment ? enrollmentsWithProgress.find(e => e.challengeId === challenge.id) : null
      }
    })

    return NextResponse.json({
      challenges: challengesWithStatus,
      enrollments: enrollmentsWithProgress
    })
  } catch (error) {
    console.error('Challenges fetch error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
