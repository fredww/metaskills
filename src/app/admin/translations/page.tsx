/**
 * Translation Dashboard - Main Overview
 * Displays overall translation progress and statistics
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { getOverallTranslationStatus, getTranslationProgress } from "@/lib/translations"
import { Globe, Download, Upload, FileText, CheckCircle, Clock, AlertCircle } from "lucide-react"

export const dynamic = 'force-dynamic'

async function getTranslationData() {
  const overall = await getOverallTranslationStatus()
  const skillsProgress = await getTranslationProgress('meta_skills')
  const practicesProgress = await getTranslationProgress('practices')
  const articlesProgress = await getTranslationProgress('articles')

  return { overall, skillsProgress, practicesProgress, articlesProgress }
}

export default async function TranslationDashboardPage() {
  const { overall, skillsProgress, practicesProgress, articlesProgress } = await getTranslationData()

  const locales = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'zh-CN', name: '简体中文', flag: '🇨🇳' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">翻译管理仪表板</h1>
            <p className="text-gray-600 mt-2">管理所有内容的翻译进度和质量</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <Link href="/admin/translations/export">
                <Download className="w-4 h-4 mr-2" />
                导出翻译
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin/translations/import">
                <Upload className="w-4 h-4 mr-2" />
                导入翻译
              </Link>
            </Button>
          </div>
        </div>

        {/* Overall Progress Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">总进度</CardTitle>
              <Globe className="w-4 h-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overall.overallPercentage}%</div>
              <Progress value={overall.overallPercentage} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">技能</CardTitle>
              <FileText className="w-4 h-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overall.translatedSkills}/{overall.totalSkills}</div>
              <p className="text-xs text-gray-600 mt-2">已翻译</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">练习</CardTitle>
              <FileText className="w-4 h-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overall.translatedPractices}/{overall.totalPractices}</div>
              <p className="text-xs text-gray-600 mt-2">已翻译</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">文章</CardTitle>
              <FileText className="w-4 h-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overall.translatedArticles}/{overall.totalArticles}</div>
              <p className="text-xs text-gray-600 mt-2">已翻译</p>
            </CardContent>
          </Card>
        </div>

        {/* Language Progress Table */}
        <Card>
          <CardHeader>
            <CardTitle>语言翻译进度</CardTitle>
            <CardDescription>每种语言的翻译完成度</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {locales.map((locale) => {
                const skillsCount = skillsProgress.filter(s =>
                  s.itemCode && (
                    locale.code === 'en' ? s.hasEn :
                    locale.code === 'zh-CN' ? s.hasZhCn :
                    locale.code === 'de' ? s.hasDe :
                    locale.code === 'ja' ? s.hasJa :
                    locale.code === 'fr' ? s.hasFr :
                    locale.code === 'es' ? s.hasEs :
                    locale.code === 'ko' ? s.hasKo : 0
                  ) > 0
                ).length

                const percentage = Math.round((skillsCount / overall.totalSkills) * 100)

                return (
                  <div key={locale.code} className="flex items-center gap-4">
                    <div className="w-32 flex items-center gap-2">
                      <span className="text-xl">{locale.flag}</span>
                      <span className="text-sm font-medium">{locale.name}</span>
                    </div>
                    <div className="flex-1">
                      <Progress value={percentage} className="h-2" />
                    </div>
                    <div className="w-24 text-right">
                      <span className="text-sm font-medium">{percentage}%</span>
                      <span className="text-xs text-gray-600 ml-2">({skillsCount}/{overall.totalSkills})</span>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/admin/translations/skills?locale=${locale.code}`}>
                        管理
                      </Link>
                    </Button>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Content Type Tabs */}
        <Tabs defaultValue="skills" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="skills">技能</TabsTrigger>
            <TabsTrigger value="practices">练习</TabsTrigger>
            <TabsTrigger value="articles">文章</TabsTrigger>
          </TabsList>

          <TabsContent value="skills">
            <Card>
              <CardHeader>
                <CardTitle>技能翻译详情</CardTitle>
                <CardDescription>每个技能的翻译状态</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {skillsProgress.map((skill) => (
                    <div key={skill.itemCode} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition">
                      <div className="flex-1">
                        <div className="font-medium">{skill.itemCode}</div>
                        <div className="text-sm text-gray-600 mt-1">
                          {skill.totalTranslations}/{skill.requiredTranslations} 种语言
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-32">
                          <Progress value={skill.percentage} className="h-2" />
                        </div>
                        <Badge variant={skill.percentage === 100 ? "default" : "secondary"}>
                          {skill.percentage}%
                        </Badge>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/admin/translations/skills/${skill.itemCode}`}>
                            编辑
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="practices">
            <Card>
              <CardHeader>
                <CardTitle>练习翻译详情</CardTitle>
                <CardDescription>每个练习的翻译状态</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {practicesProgress.slice(0, 10).map((practice) => (
                    <div key={practice.itemCode} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium">{practice.itemCode}</div>
                        <div className="text-sm text-gray-600 mt-1">
                          {practice.totalTranslations}/{practice.requiredTranslations} 种语言
                        </div>
                      </div>
                      <Badge variant={practice.percentage === 100 ? "default" : "secondary"}>
                        {practice.percentage}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="articles">
            <Card>
              <CardHeader>
                <CardTitle>文章翻译详情</CardTitle>
                <CardDescription>每篇文章的翻译状态</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {articlesProgress.map((article) => (
                    <div key={article.itemCode} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium">{article.itemCode}</div>
                        <div className="text-sm text-gray-600 mt-1">
                          {article.totalTranslations}/{article.requiredTranslations} 种语言
                        </div>
                      </div>
                      <Badge variant={article.percentage === 100 ? "default" : "secondary"}>
                        {article.percentage}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>快速操作</CardTitle>
            <CardDescription>常用的翻译管理操作</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center" asChild>
                <Link href="/admin/translations/skills">
                  <FileText className="w-6 h-6 mb-2" />
                  管理技能翻译
                </Link>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center" asChild>
                <Link href="/admin/translations/export">
                  <Download className="w-6 h-6 mb-2" />
                  导出所有翻译
                </Link>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center" asChild>
                <Link href="/admin/translations/import">
                  <Upload className="w-6 h-6 mb-2" />
                  批量导入翻译
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
