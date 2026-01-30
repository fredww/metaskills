import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth.config'

// Helper function to get max value from object values
function maxFromObject(obj: Record<string, number>): number {
  return Math.max(...Object.values(obj), 0)
}

interface RecommendationScore {
  resourceUrl: string
  resourceType: string
  score: number
  reasons: string[]
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
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      )
    }

    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '6')
    const resourceType = searchParams.get('resourceType') || 'all' // 'all', 'book', 'tool'

    // Get user's data for personalization
    const [
      userProgress,
      practiceCompletions,
      resourceClicks,
      resourceRatings
    ] = await Promise.all([
      // User's skill levels
      prisma.userProgress.findMany({
        where: { userId: user.id },
        include: { skill: true }
      }),

      // Completed practices (shows active skills)
      prisma.practiceCompletion.findMany({
        where: { userId: user.id },
        include: {
          practice: {
            include: { skill: true }
          }
        },
        orderBy: { completedAt: 'desc' },
        take: 50
      }),

      // Resource click history
      prisma.resourceClick.findMany({
        where: { userId: user.id },
        orderBy: { clickedAt: 'desc' },
        take: 100
      }),

      // User's ratings
      prisma.resourceRating.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' }
      })
    ])

    // Calculate skill affinity scores based on user activity
    const skillAffinity: Record<string, number> = {}

    // From user progress (40% weight)
    userProgress.forEach(progress => {
      const overallScore = (progress.awareness + progress.stability + progress.practice + progress.growth) / 4
      skillAffinity[progress.skill.code] = (skillAffinity[progress.skill.code] || 0) + overallScore * 0.4
    })

    // From practice completions (30% weight)
    const practiceCounts: Record<string, number> = {}
    practiceCompletions.forEach(completion => {
      const skillCode = completion.practice.skill.code
      practiceCounts[skillCode] = (practiceCounts[skillCode] || 0) + 1
    })

    const maxPracticeCount = maxFromObject(practiceCounts)
    Object.entries(practiceCounts).forEach(([skillCode, count]) => {
      skillAffinity[skillCode] = (skillAffinity[skillCode] || 0) + (count / maxPracticeCount) * 0.3
    })

    // From resource clicks (20% weight)
    const clickCounts: Record<string, number> = {}
    resourceClicks.forEach(click => {
      clickCounts[click.skillCode] = (clickCounts[click.skillCode] || 0) + 1
    })

    const maxClickCount = maxFromObject(clickCounts)
    Object.entries(clickCounts).forEach(([skillCode, count]) => {
      skillAffinity[skillCode] = (skillAffinity[skillCode] || 0) + (count / maxClickCount) * 0.2
    })

    // From ratings (10% weight - positive ratings only)
    resourceRatings.forEach(rating => {
      if (rating.rating >= 4) {
        skillAffinity[rating.skillCode] = (skillAffinity[rating.skillCode] || 0) + 0.1
      }
    })

    // Get top skills for this user
    const topSkills = Object.entries(skillAffinity)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([skillCode]) => skillCode)

    // Fetch resource data (using our skill-resources data)
    const { getResourcesBySkill } = await import('@/lib/skill-resources')

    const recommendations: RecommendationScore[] = []

    // Score resources from top skills
    for (const skillCode of topSkills) {
      const skillResources = getResourcesBySkill(skillCode)
      if (!skillResources) continue

      // Add books
      skillResources.books.forEach((book: any) => {
        // Skip if already clicked/rated
        if (resourceClicks.some(c => c.resourceUrl === book.url)) return
        if (resourceRatings.some(r => r.resourceUrl === book.url)) return

        let score = skillAffinity[skillCode] || 0

        // Boost for beginner difficulty if user is new to this skill
        const userSkillLevel = userProgress.find(p => p.skill.code === skillCode)
        if (userSkillLevel && userSkillLevel.stage <= 2 && book.difficulty === 'Beginner') {
          score += 0.5
        }

        // Boost for highly rated books
        if (book.rating && book.rating >= 4.6) {
          score += 0.3
        }

        const reasons: string[] = []
        reasons.push(`Based on your interest in ${skillCode.replace('-', ' ')}`)
        if (book.difficulty === 'Beginner') reasons.push('Great for beginners')
        if (book.rating && book.rating >= 4.6) reasons.push('Highly rated by community')

        recommendations.push({
          resourceUrl: book.url,
          resourceType: 'BOOK',
          score,
          reasons
        })
      })

      // Add tools
      skillResources.tools.forEach((tool: any) => {
        // Skip if already clicked/rated
        if (resourceClicks.some(c => c.resourceUrl === tool.url)) return
        if (resourceRatings.some(r => r.resourceUrl === tool.url)) return

        let score = (skillAffinity[skillCode] || 0) * 0.9 // Tools slightly lower priority

        // Boost for free tools
        if (tool.pricing === 'Free') {
          score += 0.2
        }

        // Boost for popular tools
        if (tool.popularity && tool.popularity >= 85) {
          score += 0.3
        }

        const reasons: string[] = []
        reasons.push(`Tool for ${skillCode.replace('-', ' ')}`)
        if (tool.pricing === 'Free') reasons.push('Free to use')
        if (tool.popularity && tool.popularity >= 85) reasons.push('Popular choice')

        recommendations.push({
          resourceUrl: tool.url,
          resourceType: 'TOOL',
          score,
          reasons
        })
      })
    }

    // Sort by score and filter by type
    let filtered = recommendations.sort((a, b) => b.score - a.score)

    if (resourceType !== 'all') {
      filtered = filtered.filter(r => r.resourceType.toLowerCase() === resourceType.toLowerCase())
    }

    // Get full resource data for top recommendations
    const { findBookByUrl, findToolByUrl } = await import('@/lib/skill-resources')

    const finalRecommendations = filtered.slice(0, limit).map(rec => {
      if (rec.resourceType === 'BOOK') {
        const found = findBookByUrl(rec.resourceUrl)
        if (found) {
          return {
            ...found.book,
            type: 'book',
            score: rec.score,
            reasons: rec.reasons
          }
        }
      } else {
        const found = findToolByUrl(rec.resourceUrl)
        if (found) {
          return {
            ...found.tool,
            type: 'tool',
            score: rec.score,
            reasons: rec.reasons
          }
        }
      }
      return null
    }).filter(Boolean)

    return NextResponse.json({
      recommendations: finalRecommendations,
      topSkills,
      totalSkills: Object.keys(skillAffinity).length
    })
  } catch (error) {
    console.error('Personalized recommendations error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
