"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { Globe, Download, Upload, FileText, CheckCircle, Clock, AlertCircle } from "lucide-react"
import AdminLayout from "@/components/admin/AdminLayout"

interface OverallStats {
  overallPercentage: number
  translatedSkills: number
  totalSkills: number
  translatedPractices: number
  totalPractices: number
  translatedArticles: number
  totalArticles: number
}

interface LocaleStats {
  locale: string
  translatedSkills: number
  totalSkills: number
  translatedPractices: number
  totalPractices: number
  translatedArticles: number
  totalArticles: number
  percentage: number
}

interface TranslationData {
  overall: OverallStats
  skillsProgress: LocaleStats[]
  practicesProgress: LocaleStats[]
  articlesProgress: LocaleStats[]
}

interface TranslationsClientProps {
  data: TranslationData
}

export default function TranslationsClient({ data }: TranslationsClientProps) {
  const { overall, skillsProgress, practicesProgress, articlesProgress } = data

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
    <AdminLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-serif font-bold text-[#2D2D2D]">
              翻译管理仪表板
            </h1>
            <p className="text-gray-600 mt-2">
              管理所有内容的翻译进度和质量
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" asChild className="border-[#8DA399] text-[#8DA399] hover:bg-[#F3EFE9]">
              <Link href="/admin/translations/export">
                <Download className="w-4 h-4 mr-2" />
                导出翻译
              </Link>
            </Button>
            <Button variant="outline" asChild className="border-[#8DA399] text-[#8DA399] hover:bg-[#F3EFE9]">
              <Link href="/admin/translations/import">
                <Upload className="w-4 h-4 mr-2" />
                导入翻译
              </Link>
            </Button>
          </div>
        </div>

        {/* Overall Progress Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-[#E5E0D8]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">总进度</CardTitle>
              <Globe className="w-4 h-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#2D2D2D]">{overall.overallPercentage}%</div>
              <Progress value={overall.overallPercentage} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="border-[#E5E0D8]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">技能</CardTitle>
              <FileText className="w-4 h-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#8DA399]">{overall.translatedSkills}/{overall.totalSkills}</div>
              <p className="text-xs text-gray-600 mt-2">已翻译</p>
            </CardContent>
          </Card>

          <Card className="border-[#E5E0D8]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">练习</CardTitle>
              <FileText className="w-4 h-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#C7826B]">{overall.translatedPractices}/{overall.totalPractices}</div>
              <p className="text-xs text-gray-600 mt-2">已翻译</p>
            </CardContent>
          </Card>

          <Card className="border-[#E5E0D8]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">文章</CardTitle>
              <FileText className="w-4 h-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#6B9BD1]">{overall.translatedArticles}/{overall.totalArticles}</div>
              <p className="text-xs text-gray-600 mt-2">已翻译</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <Button
            asChild
            className="bg-[#8DA399] hover:bg-[#6B8379] text-white h-24 flex-col"
          >
            <Link href="/admin/translations/skills">
              <FileText className="w-8 h-8 mb-2" />
              <span className="text-lg font-semibold">管理技能翻译</span>
            </Link>
          </Button>

          <Button
            asChild
            className="bg-[#C7826B] hover:bg-[#A66A55] text-white h-24 flex-col"
          >
            <Link href="/admin/translations/practices">
              <FileText className="w-8 h-8 mb-2" />
              <span className="text-lg font-semibold">管理练习翻译</span>
            </Link>
          </Button>

          <Button
            asChild
            className="bg-[#6B9BD1] hover:bg-[#4A7BB0] text-white h-24 flex-col"
          >
            <Link href="/admin/translations/articles">
              <FileText className="w-8 h-8 mb-2" />
              <span className="text-lg font-semibold">管理文章翻译</span>
            </Link>
          </Button>
        </div>

        {/* Language Progress Table */}
        <Card className="border-[#E5E0D8]">
          <CardHeader>
            <CardTitle className="text-xl font-serif text-[#2D2D2D]">
              各语言翻译进度
            </CardTitle>
            <CardDescription>
              查看每种语言的翻译完成情况
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">全部</TabsTrigger>
                <TabsTrigger value="skills">技能</TabsTrigger>
                <TabsTrigger value="practices">练习</TabsTrigger>
                <TabsTrigger value="articles">文章</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6">
                <div className="space-y-4">
                  {locales.map((locale) => {
                    const skillStats = skillsProgress.find(s => s.locale === locale.code)
                    const practiceStats = practicesProgress.find(p => p.locale === locale.code)
                    const articleStats = articlesProgress.find(a => a.locale === locale.code)

                    const totalTranslated = (skillStats?.translatedSkills || 0) +
                                         (practiceStats?.translatedPractices || 0) +
                                         (articleStats?.translatedArticles || 0)
                    const totalItems = (skillStats?.totalSkills || 0) +
                                     (practiceStats?.totalPractices || 0) +
                                     (articleStats?.totalArticles || 0)
                    const percentage = totalItems > 0 ? Math.round((totalTranslated / totalItems) * 100) : 0

                    return (
                      <div key={locale.code} className="flex items-center gap-4 p-4 bg-[#FDFBF7] rounded-lg hover:bg-[#F3EFE9] transition-colors">
                        <div className="text-2xl">{locale.flag}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-[#2D2D2D]">{locale.name}</span>
                            <span className="text-sm text-gray-600">{totalTranslated}/{totalItems} ({percentage}%)</span>
                          </div>
                          <Progress value={percentage} className="h-2" />
                        </div>
                        <Badge
                          variant={percentage === 100 ? "default" : "secondary"}
                          className={percentage === 100 ? "bg-[#8DA399]" : ""}
                        >
                          {percentage === 100 ? "完成" : percentage > 50 ? "进行中" : "待开始"}
                        </Badge>
                      </div>
                    )
                  })}
                </div>
              </TabsContent>

              <TabsContent value="skills" className="mt-6">
                <div className="space-y-4">
                  {skillsProgress.map((stat) => {
                    const locale = locales.find(l => l.code === stat.locale)
                    return (
                      <div key={stat.locale} className="flex items-center gap-4 p-4 bg-[#FDFBF7] rounded-lg hover:bg-[#F3EFE9] transition-colors">
                        <div className="text-2xl">{locale?.flag}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-[#2D2D2D]">{locale?.name}</span>
                            <span className="text-sm text-gray-600">{stat.translatedSkills}/{stat.totalSkills} ({stat.percentage}%)</span>
                          </div>
                          <Progress value={stat.percentage} className="h-2" />
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="border-[#8DA399] text-[#8DA399] hover:bg-[#F3EFE9]"
                        >
                          <Link href={`/admin/translations/skills?locale=${stat.locale}`}>
                            管理
                          </Link>
                        </Button>
                      </div>
                    )
                  })}
                </div>
              </TabsContent>

              <TabsContent value="practices" className="mt-6">
                <div className="space-y-4">
                  {practicesProgress.map((stat) => {
                    const locale = locales.find(l => l.code === stat.locale)
                    return (
                      <div key={stat.locale} className="flex items-center gap-4 p-4 bg-[#FDFBF7] rounded-lg hover:bg-[#F3EFE9] transition-colors">
                        <div className="text-2xl">{locale?.flag}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-[#2D2D2D]">{locale?.name}</span>
                            <span className="text-sm text-gray-600">{stat.translatedPractices}/{stat.totalPractices} ({stat.percentage}%)</span>
                          </div>
                          <Progress value={stat.percentage} className="h-2" />
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="border-[#C7826B] text-[#C7826B] hover:bg-[#F3EFE9]"
                        >
                          <Link href="/admin/translations/practices">
                            管理
                          </Link>
                        </Button>
                      </div>
                    )
                  })}
                </div>
              </TabsContent>

              <TabsContent value="articles" className="mt-6">
                <div className="space-y-4">
                  {articlesProgress.map((stat) => {
                    const locale = locales.find(l => l.code === stat.locale)
                    return (
                      <div key={stat.locale} className="flex items-center gap-4 p-4 bg-[#FDFBF7] rounded-lg hover:bg-[#F3EFE9] transition-colors">
                        <div className="text-2xl">{locale?.flag}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-[#2D2D2D]">{locale?.name}</span>
                            <span className="text-sm text-gray-600">{stat.translatedArticles}/{stat.totalArticles} ({stat.percentage}%)</span>
                          </div>
                          <Progress value={stat.percentage} className="h-2" />
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="border-[#6B9BD1] text-[#6B9BD1] hover:bg-[#F3EFE9]"
                        >
                          <Link href="/admin/translations/articles">
                            管理
                          </Link>
                        </Button>
                      </div>
                    )
                  })}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
