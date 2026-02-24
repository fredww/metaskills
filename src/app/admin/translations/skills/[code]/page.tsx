/**
 * Skill Translation Editor Page
 * Edit translations for a specific skill across all locales
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { ArrowLeft, Save, Eye, CheckCircle } from "lucide-react"
import { revalidatePath } from "next/cache"

export const dynamic = 'force-dynamic'

interface TranslationEditorProps {
  params: Promise<{ code: string }>
}

const locales = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh-CN', name: '简体中文', flag: '🇨🇳' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' }
]

const statusColors = {
  DRAFT: 'bg-gray-100 text-gray-800',
  PENDING: 'bg-yellow-100 text-yellow-800',
  REVIEWED: 'bg-blue-100 text-blue-800',
  PUBLISHED: 'bg-green-100 text-green-800',
  ARCHIVED: 'bg-red-100 text-red-800'
}

async function updateTranslation(code: string, locale: string, data: any) {
  'use server'

  const skill = await prisma.metaSkill.findUnique({
    where: { code }
  })

  if (!skill) {
    throw new Error('Skill not found')
  }

  await prisma.metaSkillTranslation.upsert({
    where: {
      skillId_locale: {
        skillId: skill.id,
        locale
      }
    },
    update: {
      ...data,
      updatedAt: new Date()
    },
    create: {
      skillId: skill.id,
      locale,
      ...data
    }
  })

  revalidatePath('/[locale]/skills/[code]')
  revalidatePath('/admin/translations')
}

export default async function SkillTranslationEditorPage({
  params
}: TranslationEditorProps) {
  const { code } = await params

  // Fetch skill and all translations
  const skill = await prisma.metaSkill.findUnique({
    where: { code },
    include: {
      translations: true
    }
  })

  if (!skill) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">技能未找到</h1>
            <p className="text-gray-600 mb-4">未找到代码为 {code} 的技能</p>
            <Button variant="outline" asChild>
              <Link href="/admin/translations/skills">
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回列表
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Get English translation as reference
  const englishTranslation = skill.translations.find(t => t.locale === 'en')

  // Create translation map
  const translationMap = new Map(
    skill.translations.map(t => [t.locale, t])
  )

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/translations/skills">
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                {code}
                <Badge variant="outline">{skill.domain}</Badge>
                <Badge variant="outline">{skill.stage}</Badge>
              </h1>
              <p className="text-gray-600 mt-2">
                编辑所有语言的翻译
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href={`/skills/${code}`}>
                <Eye className="w-4 h-4 mr-2" />
                预览
              </Link>
            </Button>
          </div>
        </div>

        {/* English Reference */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🇺🇸 英文原文 (参考)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-blue-900 font-semibold">标题</Label>
              <p className="text-gray-800 mt-1">{englishTranslation?.title || skill.title}</p>
            </div>
            <div>
              <Label className="text-blue-900 font-semibold">描述</Label>
              <p className="text-gray-800 mt-1 whitespace-pre-wrap">
                {englishTranslation?.description || skill.description}
              </p>
            </div>
            <div>
              <Label className="text-blue-900 font-semibold">定义</Label>
              <p className="text-gray-800 mt-1 whitespace-pre-wrap">
                {englishTranslation?.definition || skill.definition}
              </p>
            </div>
            <div>
              <Label className="text-blue-900 font-semibold">重要性</Label>
              <p className="text-gray-800 mt-1 whitespace-pre-wrap">
                {englishTranslation?.whyImportant || skill.whyImportant}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Translation Tabs */}
        <Tabs defaultValue="zh-CN" className="space-y-4">
          <TabsList className="grid grid-cols-7 w-full">
            {locales.filter(l => l.code !== 'en').map(locale => (
              <TabsTrigger key={locale.code} value={locale.code} className="flex items-center gap-2">
                <span>{locale.flag}</span>
                <span className="hidden sm:inline">{locale.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {locales.filter(l => l.code !== 'en').map(locale => {
            const translation = translationMap.get(locale.code)
            const hasTranslation = !!translation

            return (
              <TabsContent key={locale.code} value={locale.code}>
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        {locale.flag} {locale.name}
                      </CardTitle>
                      {hasTranslation && (
                        <Badge className={statusColors[translation.status]}>
                          {translation.status}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <form
                      action={async (formData) => {
                        'use server'
                        const data = {
                          title: formData.get('title') as string,
                          description: formData.get('description') as string,
                          definition: formData.get('definition') as string,
                          whyImportant: formData.get('whyImportant') as string,
                          metaTitle: formData.get('metaTitle') as string || null,
                          metaDescription: formData.get('metaDescription') as string || null,
                          ogTitle: formData.get('ogTitle') as string || null,
                          ogDescription: formData.get('ogDescription') as string || null,
                          status: (formData.get('status') as string) || 'DRAFT',
                          translatedBy: formData.get('translatedBy') as string || null,
                          reviewedBy: formData.get('reviewedBy') as string || null
                        }

                        await updateTranslation(code, locale.code, data)
                      }}
                      className="space-y-6"
                    >
                      {/* Main Content */}
                      <div className="space-y-4">
                        <h3 className="font-semibold text-lg">内容翻译</h3>

                        <div>
                          <Label htmlFor={`title-${locale.code}`}>标题 *</Label>
                          <Input
                            id={`title-${locale.code}`}
                            name="title"
                            defaultValue={translation?.title || ''}
                            placeholder={englishTranslation?.title}
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor={`description-${locale.code}`}>描述 *</Label>
                          <Textarea
                            id={`description-${locale.code}`}
                            name="description"
                            defaultValue={translation?.description || ''}
                            placeholder={englishTranslation?.description}
                            rows={3}
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor={`definition-${locale.code}`}>定义 *</Label>
                          <Textarea
                            id={`definition-${locale.code}`}
                            name="definition"
                            defaultValue={translation?.definition || ''}
                            placeholder={englishTranslation?.definition}
                            rows={4}
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor={`whyImportant-${locale.code}`}>重要性说明 *</Label>
                          <Textarea
                            id={`whyImportant-${locale.code}`}
                            name="whyImportant"
                            defaultValue={translation?.whyImportant || ''}
                            placeholder={englishTranslation?.whyImportant}
                            rows={3}
                            required
                          />
                        </div>
                      </div>

                      {/* SEO Fields */}
                      <div className="space-y-4 pt-4 border-t">
                        <h3 className="font-semibold text-lg">SEO 字段</h3>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor={`metaTitle-${locale.code}`}>Meta Title</Label>
                            <Input
                              id={`metaTitle-${locale.code}`}
                              name="metaTitle"
                              defaultValue={translation?.metaTitle || ''}
                            />
                          </div>

                          <div>
                            <Label htmlFor={`translatedBy-${locale.code}`}>翻译者</Label>
                            <Input
                              id={`translatedBy-${locale.code}`}
                              name="translatedBy"
                              defaultValue={translation?.translatedBy || ''}
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor={`metaDescription-${locale.code}`}>Meta Description</Label>
                          <Textarea
                            id={`metaDescription-${locale.code}`}
                            name="metaDescription"
                            defaultValue={translation?.metaDescription || ''}
                            rows={2}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor={`ogTitle-${locale.code}`}>OG Title</Label>
                            <Input
                              id={`ogTitle-${locale.code}`}
                              name="ogTitle"
                              defaultValue={translation?.ogTitle || ''}
                            />
                          </div>

                          <div>
                            <Label htmlFor={`reviewedBy-${locale.code}`}>审核者</Label>
                            <Input
                              id={`reviewedBy-${locale.code}`}
                              name="reviewedBy"
                              defaultValue={translation?.reviewedBy || ''}
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor={`ogDescription-${locale.code}`}>OG Description</Label>
                          <Textarea
                            id={`ogDescription-${locale.code}`}
                            name="ogDescription"
                            defaultValue={translation?.ogDescription || ''}
                            rows={2}
                          />
                        </div>
                      </div>

                      {/* Status */}
                      <div className="space-y-4 pt-4 border-t">
                        <h3 className="font-semibold text-lg">工作流状态</h3>

                        <div className="flex items-center gap-4">
                          <div className="flex-1">
                            <Label htmlFor={`status-${locale.code}`}>当前状态</Label>
                            <Select name="status" defaultValue={translation?.status || 'DRAFT'}>
                              <SelectTrigger id={`status-${locale.code}`}>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="DRAFT">草稿 (DRAFT)</SelectItem>
                                <SelectItem value="PENDING">待审核 (PENDING)</SelectItem>
                                <SelectItem value="REVIEWED">已审核 (REVIEWED)</SelectItem>
                                <SelectItem value="PUBLISHED">已发布 (PUBLISHED)</SelectItem>
                                <SelectItem value="ARCHIVED">已归档 (ARCHIVED)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        {hasTranslation && (
                          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                            <div>
                              创建时间: {new Date(translation.createdAt).toLocaleString('zh-CN')}
                            </div>
                            <div>
                              更新时间: {new Date(translation.updatedAt).toLocaleString('zh-CN')}
                            </div>
                            {translation.publishedAt && (
                              <div>
                                发布时间: {new Date(translation.publishedAt).toLocaleString('zh-CN')}
                              </div>
                            )}
                            {translation.approvedAt && (
                              <div>
                                审核时间: {new Date(translation.approvedAt).toLocaleString('zh-CN')}
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex justify-end gap-3 pt-4 border-t">
                        <Button type="submit" size="lg">
                          <Save className="w-4 h-4 mr-2" />
                          保存翻译
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            )
          })}
        </Tabs>
      </div>
    </div>
  )
}
