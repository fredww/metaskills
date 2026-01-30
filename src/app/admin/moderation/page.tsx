import { redirect } from 'next/navigation'
import { requireAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getResourcesBySkill } from '@/lib/skill-resources'
import ModerationClient from './moderation-client'

export default async function ModerationPage() {
  await requireAdmin()

  const [comments, ratings] = await Promise.all([
    prisma.resourceComment.findMany({
      take: 50,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        content: true,
        createdAt: true,
        resourceType: true,
        resourceUrl: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    }),
    prisma.resourceRating.findMany({
      take: 50,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        rating: true,
        createdAt: true,
        resourceType: true,
        resourceUrl: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })
  ])

  // Helper function to find resource by URL
  const findResource = (resourceType: string, resourceUrl: string) => {
    const skillCodes = ['learning-to-learn', 'critical-thinking', 'self-awareness', 'mindfulness', 'resilience', 'communication', 'emotional-intelligence', 'empathy']

    for (const skillCode of skillCodes) {
      const skillResources = getResourcesBySkill(skillCode)
      if (!skillResources) continue

      if (resourceType === 'BOOK') {
        const book = skillResources.books.find((b: any) => b.url === resourceUrl)
        if (book) {
          return { title: book.title, url: book.url }
        }
      } else if (resourceType === 'TOOL') {
        const tool = skillResources.tools.find((t: any) => t.url === resourceUrl)
        if (tool) {
          return { name: tool.name, url: tool.url }
        }
      }
    }
    return null
  }

  // Add resource details to comments
  const commentsWithResources = comments.map(comment => ({
    ...comment,
    resource: findResource(comment.resourceType, comment.resourceUrl)
  }))

  // Add resource details to ratings
  const ratingsWithResources = ratings.map(rating => ({
    ...rating,
    resource: findResource(rating.resourceType, rating.resourceUrl)
  }))

  return <ModerationClient comments={commentsWithResources} ratings={ratingsWithResources} />
}
