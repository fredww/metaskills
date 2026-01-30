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
    const { result } = body

    if (!result) {
      return NextResponse.json(
        { message: 'Missing result data' },
        { status: 400 }
      )
    }

    // Save assessment
    const assessment = await prisma.assessment.create({
      data: {
        userId: user.id,
        responses: {}, // Would contain actual responses
        result: result
      }
    })

    // Update or create user progress for each skill
    if (result.skills) {
      const skillMap = {
        "Learning to Learn": "Learning to Learn",
        "Critical Thinking": "Critical Thinking",
        "Communication": "Communication",
        "Empathy": "Empathy",
        "Emotional Intelligence": "Emotional Intelligence",
        "Self-Awareness": "Self-Awareness",
        "Mindfulness": "Mindfulness",
        "Resilience": "Resilience"
      }

      for (const [skillName, score] of Object.entries(result.skills)) {
        const dbSkillName = skillMap[skillName as keyof typeof skillMap]
        if (!dbSkillName) continue

        const skill = await prisma.metaSkill.findFirst({
          where: { title: dbSkillName }
        })

        if (skill) {
          const existingProgress = await prisma.userProgress.findUnique({
            where: {
              userId_skillId: {
                userId: user.id,
                skillId: skill.id
              }
            }
          })

          // Calculate stage from score
          let stage = 1
          const scoreValue = typeof score === 'number' ? score : parseFloat(score as string)
          if (scoreValue >= 4) stage = 3
          else if (scoreValue >= 3) stage = 2

          // Calculate 4D vectors (simplified)
          const awareness = Math.min(5, scoreValue * 1.2)
          const stability = Math.min(5, scoreValue * 1.1)
          const practice = Math.min(5, scoreValue * 1.15)
          const growth = Math.min(5, scoreValue * 1.1)

          if (existingProgress) {
            await prisma.userProgress.update({
              where: { id: existingProgress.id },
              data: {
                stage,
                awareness,
                stability,
                practice,
                growth,
                lastAssessedAt: new Date()
              }
            })
          } else {
            await prisma.userProgress.create({
              data: {
                userId: user.id,
                skillId: skill.id,
                stage,
                awareness,
                stability,
                practice,
                growth,
                lastAssessedAt: new Date()
              }
            })
          }
        }
      }
    }

    return NextResponse.json(
      {
        message: 'Assessment saved successfully',
        assessmentId: assessment.id
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Assessment save error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

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
      where: { email: session.user.email },
      include: {
        assessments: {
          orderBy: { completedAt: 'desc' },
          take: 10
        }
      }
    })

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ assessments: user.assessments })
  } catch (error) {
    console.error('Assessment fetch error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
