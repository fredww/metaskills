/**
 * Skills Translation List Page
 * Lists all skills with their translation status
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { getTranslationProgress } from "@/lib/translations"
import { Search, Globe, Edit } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function SkillsTranslationsPage({
  searchParams,
}: {
  searchParams: Promise<{ locale?: string }>
}) {
  const params = await searchParams
  const locale = params.locale || 'all'

  const skillsProgress = await getTranslationProgress('meta_skills')

  const filteredSkills = locale !== 'all'
    ? skillsProgress.filter(s => {
        if (locale === 'en') return s.hasEn > 0
        if (locale === 'zh-CN') return s.hasZhCn > 0
        if (locale === 'de') return s.hasDe > 0
        if (locale === 'ja') return s.hasJa > 0
        if (locale === 'fr') return s.hasFr > 0
        if (locale === 'es') return s.hasEs > 0
        if (locale === 'ko') return s.hasKo > 0
        return false
      })
    : skillsProgress

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
            <h1 className="text-3xl font-bold text-gray-900">技能翻译管理</h1>
            <p className="text-gray-600 mt-2">管理和编辑所有技能的翻译</p>
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
                    placeholder="搜索技能..."
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

        {/* Skills List */}
        <div className="grid gap-4">
          {filteredSkills.map((skill) => (
            <Card key={skill.itemCode}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{skill.itemCode}</h3>
                      <Badge variant={skill.percentage === 100 ? "default" : "secondary"}>
                        {skill.percentage}% 完成
                      </Badge>
                    </div>
                    <div className="grid grid-cols-7 gap-2 text-sm">
                      {Object.entries({
                        en: skill.hasEn,
                        'zh-CN': skill.hasZhCn,
                        de: skill.hasDe,
                        ja: skill.hasJa,
                        fr: skill.hasFr,
                        es: skill.hasEs,
                        ko: skill.hasKo
                      }).map(([code, count]) => (
                        <div key={code} className={`text-center p-2 rounded ${
                          count > 0 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-400'
                        }`}>
                          <div className="font-medium">{localeNames[code]}</div>
                          <div className="text-xs">{count > 0 ? '✓' : '○'}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/translations/skills/${skill.itemCode}`}>
                        <Edit className="w-4 h-4 mr-2" />
                        编辑
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
