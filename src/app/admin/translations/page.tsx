import { redirect } from 'next/navigation'
import { requireAdmin } from '@/lib/auth'
import { getOverallTranslationStatus, getTranslationProgress } from "@/lib/translations"
import TranslationsClient from './translations-client'

export const dynamic = 'force-dynamic'

// Transform TranslationProgress to LocaleStats format
function transformToLocaleStats(progressItems: any[]): any[] {
  const locales = [
    { code: 'en', name: 'English' },
    { code: 'zh-CN', name: '简体中文' },
    { code: 'de', name: 'Deutsch' },
    { code: 'ja', name: '日本語' },
    { code: 'fr', name: 'Français' },
    { code: 'es', name: 'Español' },
    { code: 'ko', name: '한국어' }
  ]

  return locales.map(locale => {
    const translatedCount = progressItems.filter(item => {
      const hasLocale = locale.code === 'en' ? item.hasEn :
                       locale.code === 'zh-CN' ? item.hasZhCn :
                       locale.code === 'de' ? item.hasDe :
                       locale.code === 'ja' ? item.hasJa :
                       locale.code === 'fr' ? item.hasFr :
                       locale.code === 'es' ? item.hasEs :
                       item.hasKo
      return hasLocale > 0
    }).length

    return {
      locale: locale.code,
      translatedSkills: 0, // This would need to be calculated based on content type
      totalSkills: 0,
      translatedPractices: 0,
      totalPractices: 0,
      translatedArticles: 0,
      totalArticles: 0,
      percentage: progressItems.length > 0 ? Math.round((translatedCount / progressItems.length) * 100) : 0
    }
  })
}

export default async function TranslationDashboardPage() {
  await requireAdmin()

  const overall = await getOverallTranslationStatus()
  const skillsProgress = await getTranslationProgress('meta_skills')
  const practicesProgress = await getTranslationProgress('practices')
  const articlesProgress = await getTranslationProgress('articles')

  // Transform data to match expected format
  const data = {
    overall,
    skillsProgress: transformToLocaleStats(skillsProgress),
    practicesProgress: transformToLocaleStats(practicesProgress),
    articlesProgress: transformToLocaleStats(articlesProgress)
  }

  return <TranslationsClient data={data} />
}
