import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth.config'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params

    // Get completion count for this practice
    const completions = await prisma.practiceCompletion.count({
      where: {
        userId: user.id,
        practiceId: id
      }
    })

    // Get recent completions
    const recentCompletions = await prisma.practiceCompletion.findMany({
      where: {
        userId: user.id,
        practiceId: id
      },
      orderBy: { completedAt: 'desc' },
      take: 5
    })

    return NextResponse.json({
      practiceId: id,
      completionCount: completions,
      recentCompletions: recentCompletions.map(c => ({
        id: c.id,
        completedAt: c.completedAt,
        rating: c.rating,
        notes: c.notes
      }))
    })
  } catch (error) {
    console.error('Practice stats fetch error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
