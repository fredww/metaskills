/**
 * Articles Translation List Page
 * Lists all articles with their translation status
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Search, Edit, Eye } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function ArticlesTranslationsPage({
  searchParams,
}: {
  searchParams: Promise<{ locale?: string; type?: string }>
}) {
  const params = await searchParams
  const locale = params.locale || 'all'
  const type = params.type

  // Build where clause
  const where: any = {}
  if (locale !== 'all') where.locale = locale
  if (type) {
    where.article = {
      type: type
    }
  }

  // Fetch all articles with their translations
  const articles = await prisma.article.findMany({
    include: {
      translations: {
        select: {
          locale: true,
          status: true
        }
      }
    },
    orderBy: [
      { type: 'asc' },
      { skillCode: 'asc' },
      { slug: 'asc' }
    ]
  })

  // Group articles by type
  const articlesByType = articles.reduce((acc, article) => {
    const articleType = article.type || 'uncategorized'
    if (!acc[articleType]) {
      acc[articleType] = {
        type: articleType,
        articles: []
      }
    }
    acc[articleType].articles.push(article)
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

  const typeNames: Record<string, string> = {
    'guide': '指南',
    'blog': '博客',
    'research': '研究',
    'case-study': '案例研究',
    'uncategorized': '其他'
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">文章翻译管理</h1>
            <p className="text-gray-600 mt-2">管理和编辑所有文章的翻译</p>
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
                    placeholder="搜索文章..."
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
              <select
                className="px-4 py-2 border rounded-lg bg-white"
              >
                <option value="">所有类型</option>
                <option value="guide">指南</option>
                <option value="blog">博客</option>
                <option value="research">研究</option>
                <option value="case-study">案例研究</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Articles List Grouped by Type */}
        <div className="space-y-6">
          {Object.entries(articlesByType).map(([articleType, group]: [string, any]) => (
            <Card key={articleType}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Badge>{typeNames[articleType] || articleType}</Badge>
                  <span className="text-sm font-normal text-gray-600">
                    {group.articles.length} 篇文章
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {group.articles.map((article: any) => {
                    // Calculate translation progress
                    const translationCounts = {
                      en: article.translations.find((t: any) => t.locale === 'en')?.status || null,
                      'zh-CN': article.translations.find((t: any) => t.locale === 'zh-CN')?.status || null,
                      de: article.translations.find((t: any) => t.locale === 'de')?.status || null,
                      ja: article.translations.find((t: any) => t.locale === 'ja')?.status || null,
                      fr: article.translations.find((t: any) => t.locale === 'fr')?.status || null,
                      es: article.translations.find((t: any) => t.locale === 'es')?.status || null,
                      ko: article.translations.find((t: any) => t.locale === 'ko')?.status || null
                    }

                    const publishedCount = Object.values(translationCounts).filter(
                      status => status === 'PUBLISHED'
                    ).length
                    const percentage = Math.round((publishedCount / 7) * 100)

                    return (
                      <div
                        key={article.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-base font-semibold">{article.title}</h3>
                            <Badge variant={percentage === 100 ? "default" : "secondary"}>
                              {percentage}% 完成
                            </Badge>
                            {article.skillCode && (
                              <Badge variant="outline" className="text-xs">
                                {article.skillCode}
                              </Badge>
                            )}
                            {article.isPublished && (
                              <Badge variant="outline" className="text-xs bg-green-50">
                                <Eye className="w-3 h-3 mr-1" />
                                已发布
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2 line-clamp-1">
                            {article.excerpt}
                          </p>
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
