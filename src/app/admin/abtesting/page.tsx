import { redirect } from 'next/navigation'
import { requireAdmin } from '@/lib/auth'
import ABTestingClient from './abtesting-client'

export default async function ABTestingDashboard() {
  // Check admin permissions on server
  await requireAdmin()

  return <ABTestingClient />
}
