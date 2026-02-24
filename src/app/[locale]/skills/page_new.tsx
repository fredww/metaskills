/**
 * Skills page with database translations
 * This replaces the hardcoded sample data with database queries
 */

import Link from "next/link"
import { getTranslations } from 'next-intl/server'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getSkills, type Locale } from "../data-service"

interface SkillsPageProps {
  params: Promise<{ locale: string }>
}

export default async function SkillsPage({ params }: SkillsPageProps) {
  const { locale } = await params
  const t = await getTranslations()

  // Fetch skills from database with translations
  const skills = await getSkills(locale as Locale)

  const domainColors = {
    COGNITIVE: "border-[#8DA399] bg-[#8DA399]/5",
    INTERPERSONAL: "border-[#C7826B] bg-[#C7826B]/5",
    SELF: "border-[#D4AF37] bg-[#D4AF37]/5"
  }

  const stageLabels = {
    1: t('skills.stage.beginner'),
    2: t('skills.stage.developing'),
    3: t('skills.stage.proficient'),
    4: t('skills.stage.advanced'),
    5: t('skills.stage.master')
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#2D2D2D] mb-4">
            {t('skills.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('skills.subtitle')}
          </p>
        </div>

        {/* Domain Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          <Button variant="outline" className="border-[#E5E0D8] text-[#2D2D2D] hover:bg-[#F3EFE9]">
            {t('skills.filter.all')}
          </Button>
          <Button variant="outline" className="border-[#8DA399] text-[#8DA399] hover:bg-[#8DA399]/10">
            {t('skills.filter.cognitive')}
          </Button>
          <Button variant="outline" className="border-[#C7826B] text-[#C7826B] hover:bg-[#C7826B]/10">
            {t('skills.filter.interpersonal')}
          </Button>
          <Button variant="outline" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10">
            {t('skills.filter.self')}
          </Button>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill) => (
            <Card
              key={skill.code}
              className={`border-2 ${domainColors[skill.domain as keyof typeof domainColors]} hover:shadow-lg transition-all cursor-pointer`}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-serif text-[#2D2D2D]">
                      {skill.title}
                    </CardTitle>
                    <span className="inline-block mt-2 text-xs px-2 py-1 rounded-full bg-white/60 text-gray-700">
                      {skill.domain}
                    </span>
                  </div>
                </div>
                <CardDescription className="text-sm">
                  {skill.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <p className="text-xs text-gray-600 mb-2">
                    {t('skills.stage.label')}: {stageLabels[skill.stage as keyof typeof stageLabels]}
                  </p>
                  <div className="w-full bg-white/60 rounded-full h-2">
                    <div
                      className="bg-[#8DA399] h-2 rounded-full"
                      style={{ width: `${(skill.stage / 5) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="space-y-1 mb-4">
                  <p className="text-xs font-medium text-gray-700">{t('skills.benefits')}:</p>
                  {skill.benefits.slice(0, 2).map((benefit, idx) => (
                    <p key={idx} className="text-xs text-gray-600">✓ {benefit}</p>
                  ))}
                </div>
                <Button
                  asChild
                  size="sm"
                  className="w-full bg-[#8DA399] hover:bg-[#6B8379] text-white"
                >
                  <Link href={`/${locale}/skills/${skill.code}`}>
                    {t('skills.learnMore')}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Coming Soon Notice */}
        <Card className="mt-12 border-[#E5E0D8] bg-[#F3EFE9]">
          <CardContent className="p-8 text-center">
            <p className="text-lg text-gray-700 mb-4">
              {t('skills.comingSoon')}
            </p>
            <Button
              asChild
              variant="outline"
              className="border-[#E5E0D8] text-[#2D2D2D] hover:bg-[#F3EFE9]"
            >
              <Link href={`/${locale}/dashboard`}>{t('skills.backToDashboard')}</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Generate static params for all locales
export function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'zh-CN' },
    { locale: 'de' },
    { locale: 'ja' },
    { locale: 'fr' },
    { locale: 'es' },
    { locale: 'ko' },
  ]
}
