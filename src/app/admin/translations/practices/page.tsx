/**
 * Practices Translation List Page
 * Lists all practices with their translation status
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Search, Edit } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function PracticesTranslationsPage({
  searchParams,
}: {
  searchParams: Promise<{ locale?: string; skillCode?: string }>
}) {
  const params = await searchParams
  const locale = params.locale || 'all'
  const skillCode = params.skillCode

  // Build where clause
  const where: any = {}
  if (locale !== 'all') where.locale = locale
  if (skillCode) {
    const skill = await prisma.metaSkill.findUnique({
      where: { code: skillCode }
    })
    if (skill) {
      where.practice = {
        skillId: skill.id
      }
    }
  }

  // Fetch all practices with their translations
  const practices = await prisma.practice.findMany({
    include: {
      skill: {
        select: {
          code: true,
          title: true
        }
      },
      translations: {
        select: {
          locale: true,
          status: true
        }
      }
    },
    orderBy: [
      { skill: { code: 'asc' } },
      { id: 'asc' }
    ]
  })

  // Group practices by skill and calculate translation status
  const practicesBySkill = practices.reduce((acc, practice) => {
    const skillCode = practice.skill.code
    if (!acc[skillCode]) {
      acc[skillCode] = {
        skillCode,
        skillTitle: practice.skill.title,
        practices: []
      }
    }
    acc[skillCode].practices.push(practice)
    return acc
  }, {} as Record<string, any>)

  const localeNames: Record<string, string> = {
    'en': 'English',
    'zh-CN': '简体中文',
    'de': 'Deutsch',
    'ja': '日本語',
    'fr': 'Français',
    'es': 'Español',
    'ko': '한국어'
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">练习翻译管理</h1>
            <p className="text-gray-600 mt-2">管理和编辑所有练习的翻译</p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/admin/translations">
              返回概览
            </Link>
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="搜索练习..."
                    className="pl-10"
                  />
                </div>
              </div>
              <select
                className="px-4 py-2 border rounded-lg bg-white"
                defaultValue={locale}
              >
                <option value="all">所有语言</option>
                <option value="en">English</option>
                <option value="zh-CN">简体中文</option>
                <option value="de">Deutsch</option>
                <option value="ja">日本語</option>
                <option value="fr">Français</option>
                <option value="es">Español</option>
                <option value="ko">한국어</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Practices List Grouped by Skill */}
        <div className="space-y-6">
          {Object.entries(practicesBySkill).map(([skillCode, group]: [string, any]) => (
            <Card key={skillCode}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Badge variant="outline">{skillCode}</Badge>
                  {group.skillTitle}
                  <Badge variant="secondary">{group.practices.length} 个练习</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {group.practices.map((practice: any) => {
                    // Calculate translation progress
                    const translationCounts = {
                      en: practice.translations.find((t: any) => t.locale === 'en')?.status || null,
                      'zh-CN': practice.translations.find((t: any) => t.locale === 'zh-CN')?.status || null,
                      de: practice.translations.find((t: any) => t.locale === 'de')?.status || null,
                      ja: practice.translations.find((t: any) => t.locale === 'ja')?.status || null,
                      fr: practice.translations.find((t: any) => t.locale === 'fr')?.status || null,
                      es: practice.translations.find((t: any) => t.locale === 'es')?.status || null,
                      ko: practice.translations.find((t: any) => t.locale === 'ko')?.status || null
                    }

                    const publishedCount = Object.values(translationCounts).filter(
                      status => status === 'PUBLISHED'
                    ).length
                    const percentage = Math.round((publishedCount / 7) * 100)

                    return (
                      <div
                        key={practice.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-base font-semibold">{practice.title}</h3>
                            <Badge variant={percentage === 100 ? "default" : "secondary"}>
                              {percentage}% 完成
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {practice.duration}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {practice.difficulty}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-7 gap-2 text-xs">
                            {Object.entries(translationCounts).map(([code, status]) => (
                              <div
                                key={code}
                                className={`text-center p-2 rounded ${
                                  status === 'PUBLISHED'
                                    ? 'bg-green-100 text-green-800'
                                    : status
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-gray-100 text-gray-400'
                                }`}
                              >
                                <div className="font-medium">{localeNames[code]}</div>
                                <div className="text-xs">
                                  {status === 'PUBLISHED' ? '✓' : status ? '◐' : '○'}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4 mr-2" />
                            编辑
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
