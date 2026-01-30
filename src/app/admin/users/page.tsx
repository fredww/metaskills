import { redirect } from 'next/navigation'
import { requireAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import UsersManagementClient from './users-client'

export default async function UsersManagementPage() {
  await requireAdmin()

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      image: true,
      createdAt: true,
      _count: {
        select: {
          resourceClicks: true,
          resourceRatings: true,
          resourceComments: true,
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  })

  return <UsersManagementClient users={users} />
}
