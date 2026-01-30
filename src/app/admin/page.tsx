import { redirect } from 'next/navigation'
import { requireAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getResourcesBySkill } from '@/lib/skill-resources'
import AdminDashboardClient from './admin-client'

export default async function AdminDashboard() {
  const user = await requireAdmin()

  // Count total resources from skill-resources data
  const skillCodes = ['learning-to-learn', 'critical-thinking', 'self-awareness', 'mindfulness', 'resilience', 'communication', 'emotional-intelligence', 'empathy']
  let totalBooks = 0
  let totalTools = 0

  for (const skillCode of skillCodes) {
    const skillResources = getResourcesBySkill(skillCode)
    if (skillResources) {
      totalBooks += skillResources.books.length
      totalTools += skillResources.tools.length
    }
  }

  // Fetch dashboard statistics
  const [
    totalUsers,
    totalClicks,
    totalRatings,
    totalComments,
    recentUsers,
    activeTests,
    userGrowthData,
    clickTrendData,
    topResources
  ] = await Promise.all([
    prisma.user.count(),
    prisma.resourceClick.count(),
    prisma.resourceRating.count(),
    prisma.resourceComment.count(),
    prisma.user.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        _count: {
          select: {
            resourceClicks: true,
            resourceRatings: true,
            resourceComments: true
          }
        }
      }
    }),
    prisma.aBTest.count({
      where: { isActive: true }
    }),
    // User growth over last 30 days
    prisma.$queryRaw`
      SELECT
        DATE("createdAt") as date,
        COUNT(*) as count
      FROM users
      WHERE "createdAt" >= NOW() - INTERVAL '30 days'
      GROUP BY DATE("createdAt")
      ORDER BY date ASC
    `,
    // Click trend over last 30 days
    prisma.$queryRaw`
      SELECT
        DATE("clickedAt") as date,
        COUNT(*) as count
      FROM resource_clicks
      WHERE "clickedAt" >= NOW() - INTERVAL '30 days'
      GROUP BY DATE("clickedAt")
      ORDER BY date ASC
    `,
    // Top 10 resources by clicks
    prisma.resourceClick.groupBy({
      by: ['resourceUrl', 'resourceTitle', 'resourceType'],
      _count: true,
      orderBy: {
        _count: {
          resourceUrl: 'desc'
        }
      },
      take: 10
    })
  ])

  const stats = {
    totalUsers,
    totalResources: totalBooks + totalTools,
    totalClicks,
    totalRatings,
    totalComments,
    activeTests
  }

  return (
    <AdminDashboardClient
      stats={stats}
      recentUsers={recentUsers}
      userGrowthData={userGrowthData as any[]}
      clickTrendData={clickTrendData as any[]}
      topResources={topResources as any[]}
    />
  )
}
