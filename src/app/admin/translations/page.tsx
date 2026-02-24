import { redirect } from 'next/navigation'
import { requireAdmin } from '@/lib/auth'
import { getOverallTranslationStatus, getTranslationProgress } from "@/lib/translations"
import TranslationsClient from './translations-client'

export const dynamic = 'force-dynamic'

export default async function TranslationDashboardPage() {
  await requireAdmin()

  const overall = await getOverallTranslationStatus()
  const skillsProgress = await getTranslationProgress('meta_skills')
  const practicesProgress = await getTranslationProgress('practices')
  const articlesProgress = await getTranslationProgress('articles')

  const data = { overall, skillsProgress, practicesProgress, articlesProgress }

  return <TranslationsClient data={data} />
}
