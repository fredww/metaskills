import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth.config'

// Temporary mapping of practice IDs to skill codes
const PRACTICE_SKILL_MAPPING: Record<string, string> = {
  "1": "self-awareness",      // Morning Check-In
  "2": "communication",       // Active Listening
  "3": "mindfulness",         // Body Scan
  "4": "critical-thinking",   // The 5 Whys
  "5": "learning-to-learn",   // The Feynman Technique
  "6": "resilience",          // Comfort Zone Stretch
  "7": "emotional-intelligence" // Gratitude Letter
}

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
    const { practiceId, notes, rating } = body

    if (!practiceId) {
      return NextResponse.json(
        { message: 'Practice ID is required' },
        { status: 400 }
      )
    }

    // Get the skill code from the practice ID
    const skillCode = PRACTICE_SKILL_MAPPING[practiceId]

    if (!skillCode) {
      return NextResponse.json(
        { message: 'Invalid practice ID' },
        { status: 400 }
      )
    }

    // Find the skill in the database
    const skill = await prisma.metaSkill.findFirst({
      where: { code: skillCode }
    })

    if (!skill) {
      return NextResponse.json(
        { message: 'Associated skill not found' },
        { status: 404 }
      )
    }

    // Check if practice exists in database, if not create it
    let practice = await prisma.practice.findFirst({
      where: { id: practiceId }
    })

    if (!practice) {
      // Create a temporary practice record for tracking
      const PRACTICE_TITLES: Record<string, { title: string; description: string; duration: number }> = {
        "1": { title: "Morning Check-In", description: "Start each day with 5 minutes of self-awareness", duration: 5 },
        "2": { title: "Active Listening", description: "Listen for 5 minutes without interrupting", duration: 5 },
        "3": { title: "Body Scan", description: "10-minute systematic awareness of body sensations", duration: 10 },
        "4": { title: "The 5 Whys", description: "Ask 'why' five times to find root causes", duration: 10 },
        "5": { title: "The Feynman Technique", description: "Explain a concept simply as if teaching", duration: 15 },
        "6": { title: "Comfort Zone Stretch", description: "Do one small thing that makes you uncomfortable", duration: 10 },
        "7": { title: "Gratitude Letter", description: "Write a letter expressing gratitude", duration: 15 }
      }

      const practiceInfo = PRACTICE_TITLES[practiceId]

      if (!practiceInfo) {
        return NextResponse.json(
          { message: 'Practice information not found' },
          { status: 404 }
        )
      }

      practice = await prisma.practice.create({
        data: {
          id: practiceId,
          title: practiceInfo.title,
          description: practiceInfo.description,
          duration: practiceInfo.duration,
          difficulty: "BEGINNER",
          emotionTone: "CALM",
          instructions: {},
          benefits: [],
          tips: [],
          skillId: skill.id
        }
      })
    }

    // Create practice completion record
    const completion = await prisma.practiceCompletion.create({
      data: {
        userId: user.id,
        practiceId: practiceId,
        notes: notes || null,
        rating: rating || null
      }
    })

    // Update user progress for the associated skill
    const existingProgress = await prisma.userProgress.findUnique({
      where: {
        userId_skillId: {
          userId: user.id,
          skillId: skill.id
        }
      }
    })

    // Increment practice score based on completion
    const practiceIncrement = 0.3 // Each completion adds 0.3 to practice score
    const growthIncrement = 0.2 // Each completion adds 0.2 to growth score

    if (existingProgress) {
      await prisma.userProgress.update({
        where: { id: existingProgress.id },
        data: {
          practice: Math.min(5, existingProgress.practice + practiceIncrement),
          growth: Math.min(5, existingProgress.growth + growthIncrement),
          updatedAt: new Date()
        }
      })
    } else {
      await prisma.userProgress.create({
        data: {
          userId: user.id,
          skillId: skill.id,
          stage: 1,
          awareness: 1,
          stability: 1,
          practice: practiceIncrement,
          growth: growthIncrement
        }
      })
    }

    return NextResponse.json(
      {
        message: 'Practice completed successfully',
        completion: {
          id: completion.id,
          practiceId: completion.practiceId,
          completedAt: completion.completedAt,
          skillTitle: skill.title
        }
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Practice completion error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Get practice completions for a user
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

    const completions = await prisma.practiceCompletion.findMany({
      where: { userId: user.id },
      include: {
        practice: {
          include: { skill: true }
        }
      },
      orderBy: { completedAt: 'desc' },
      take: 50
    })

    return NextResponse.json({ completions })
  } catch (error) {
    console.error('Practice completions fetch error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
