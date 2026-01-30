import { redirect } from 'next/navigation'
import { requireAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getResourcesBySkill } from '@/lib/skill-resources'
import ResourcesManagementClient from './resources-client'

export default async function ResourcesManagementPage() {
  await requireAdmin()

  // Fetch all resources from skill-resources data
  const skillCodes = ['learning-to-learn', 'critical-thinking', 'self-awareness', 'mindfulness', 'resilience', 'communication', 'emotional-intelligence', 'empathy']

  const allBooks: any[] = []
  const allTools: any[] = []

  for (const skillCode of skillCodes) {
    const skillResources = getResourcesBySkill(skillCode)
    if (!skillResources) continue

    // Add books with skill code
    skillResources.books.forEach((book: any) => {
      allBooks.push({
        ...book,
        skillCode
      })
    })

    // Add tools with skill code
    skillResources.tools.forEach((tool: any) => {
      allTools.push({
        ...tool,
        skillCode
      })
    })
  }

  // Get click counts for each resource
  const bookUrls = allBooks.map(b => b.url)
  const toolUrls = allTools.map(t => t.url)

  const [bookClicks, toolClicks, bookRatings, toolRatings, totalClicks, totalRatings] = await Promise.all([
    prisma.resourceClick.groupBy({
      by: ['resourceUrl'],
      where: {
        resourceUrl: { in: bookUrls },
        resourceType: 'BOOK'
      },
      _count: true
    }),
    prisma.resourceClick.groupBy({
      by: ['resourceUrl'],
      where: {
        resourceUrl: { in: toolUrls },
        resourceType: 'TOOL'
      },
      _count: true
    }),
    prisma.resourceRating.groupBy({
      by: ['resourceUrl'],
      where: {
        resourceUrl: { in: bookUrls },
        resourceType: 'BOOK'
      },
      _count: true
    }),
    prisma.resourceRating.groupBy({
      by: ['resourceUrl'],
      where: {
        resourceUrl: { in: toolUrls },
        resourceType: 'TOOL'
      },
      _count: true
    }),
    prisma.resourceClick.count(),
    prisma.resourceRating.count()
  ])

  // Create maps for easy lookup
  const bookClicksMap = new Map(bookClicks.map(c => [c.resourceUrl, c._count]))
  const toolClicksMap = new Map(toolClicks.map(c => [c.resourceUrl, c._count]))
  const bookRatingsMap = new Map(bookRatings.map(r => [r.resourceUrl, r._count]))
  const toolRatingsMap = new Map(toolRatings.map(r => [r.resourceUrl, r._count]))

  // Add stats to books
  const booksWithStats = allBooks.map(book => ({
    url: book.url,
    title: book.title,
    author: book.author,
    coverUrl: book.coverUrl,
    skillCode: book.skillCode,
    _count: {
      resourceClicks: bookClicksMap.get(book.url) || 0,
      resourceRatings: bookRatingsMap.get(book.url) || 0
    }
  }))

  // Add stats to tools
  const toolsWithStats = allTools.map(tool => ({
    url: tool.url,
    name: tool.name,
    category: tool.type,
    websiteUrl: tool.url,
    logoUrl: tool.coverUrl,
    skillCode: tool.skillCode,
    _count: {
      resourceClicks: toolClicksMap.get(tool.url) || 0,
      resourceRatings: toolRatingsMap.get(tool.url) || 0
    }
  }))

  return (
    <ResourcesManagementClient
      books={booksWithStats}
      tools={toolsWithStats}
      stats={{ totalClicks, totalRatings }}
    />
  )
}
