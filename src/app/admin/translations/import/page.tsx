/**
 * Translation Import Page
 * Upload translation files for bulk import
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { ArrowLeft, Upload, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

async function importTranslations(formData: FormData) {
  'use server'

  const file = formData.get('file') as File
  const type = formData.get('type') as string
  const locale = formData.get('locale') as string

  if (!file) {
    redirect('/admin/translations/import?error=no_file')
  }

  // Create form data for API
  const apiFormData = new FormData()
  apiFormData.append('file', file)
  apiFormData.append('type', type)
  apiFormData.append('locale', locale)

  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/api/translations/import`, {
      method: 'POST',
      body: apiFormData
    })

    const result = await response.json()

    if (!response.ok) {
      redirect(`/admin/translations/import?error=${encodeURIComponent(result.error || '导入失败')}`)
    }

    redirect('/admin/translations/import?success=true')
  } catch (error) {
    redirect('/admin/translations/import?error=' + encodeURIComponent('网络错误: ' + (error instanceof Error ? error.message : 'Unknown error')))
  }
}

export default function TranslationImportPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/translations">
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">导入翻译</h1>
            <p className="text-gray-600 mt-2">从文件批量导入翻译内容</p>
          </div>
        </div>

        {/* Instructions */}
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>文件格式说明：</strong>
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li>支持 JSON 格式文件（推荐）</li>
              <li>文件必须是有效的 JSON 数组</li>
              <li>每个对象必须包含标识符（code/practiceId/slug）和翻译字段</li>
              <li>示例格式见下方说明</li>
            </ul>
          </AlertDescription>
        </Alert>

        {/* Import Form */}
        <Card>
          <CardHeader>
            <CardTitle>上传翻译文件</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={importTranslations} className="space-y-6">
              <div>
                <Label htmlFor="type">内容类型 *</Label>
                <Select name="type" required>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="选择要导入的内容类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="skills">技能 (Skills)</SelectItem>
                    <SelectItem value="practices">练习 (Practices)</SelectItem>
                    <SelectItem value="articles">文章 (Articles)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="locale">目标语言 *</Label>
                <Select name="locale" required>
                  <SelectTrigger id="locale">
                    <SelectValue placeholder="选择目标语言" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">🇺🇸 English</SelectItem>
                    <SelectItem value="zh-CN">🇨🇳 简体中文</SelectItem>
                    <SelectItem value="de">🇩🇪 Deutsch</SelectItem>
                    <SelectItem value="ja">🇯🇵 日本語</SelectItem>
                    <SelectItem value="fr">🇫🇷 Français</SelectItem>
                    <SelectItem value="es">🇪🇸 Español</SelectItem>
                    <SelectItem value="ko">🇰🇷 한국어</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="file">翻译文件 *</Label>
                <Input
                  id="file"
                  name="file"
                  type="file"
                  accept=".json,.xlsx,.csv"
                  required
                  className="cursor-pointer"
                />
                <p className="text-sm text-gray-500 mt-2">
                  支持 .json, .xlsx, .csv 格式
                </p>
              </div>

              <Button type="submit" size="lg" className="w-full">
                <Upload className="w-4 h-4 mr-2" />
                开始导入
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* File Format Examples */}
        <Card>
          <CardHeader>
            <CardTitle>文件格式示例</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">技能翻译 (Skills) - JSON</h3>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`[
  {
    "code": "active-listening",
    "title": "积极倾听",
    "description": "全神贯注地倾听他人...",
    "definition": "积极倾听是指...",
    "whyImportant": "这项技能很重要因为...",
    "metaTitle": "积极倾听技能 | MetaSkills",
    "metaDescription": "学习如何通过积极倾听提升沟通效果"
  },
  {
    "code": "critical-thinking",
    "title": "批判性思维",
    ...
  }
]`}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold mb-2">练习翻译 (Practices) - JSON</h3>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`[
  {
    "practiceId": "practice-123",
    "title": "每日冥想练习",
    "instructions": "找一个安静的地方...",
    "tips": "保持呼吸平稳...",
    "metaTitle": "每日冥想练习指南"
  }
]`}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold mb-2">文章翻译 (Articles) - JSON</h3>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`[
  {
    "slug": "how-to-practice-mindfulness",
    "title": "如何练习正念",
    "content": "正念练习是一种...",
    "excerpt": "正念可以帮助我们...",
    "metaTitle": "如何练习正念 | MetaSkills 博客"
  }
]`}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Import Process */}
        <Card>
          <CardHeader>
            <CardTitle>导入流程说明</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3 list-decimal list-inside">
              <li>
                <strong>准备文件</strong> - 按照上述格式准备翻译文件
              </li>
              <li>
                <strong>选择类型</strong> - 选择要导入的内容类型（技能/练习/文章）
              </li>
              <li>
                <strong>选择语言</strong> - 选择翻译的目标语言
              </li>
              <li>
                <strong>上传文件</strong> - 点击上传按钮选择文件
              </li>
              <li>
                <strong>系统处理</strong> - 系统会自动：
                <ul className="ml-6 mt-1 space-y-1 list-disc list-inside text-sm text-gray-600">
                  <li>验证文件格式</li>
                  <li>查找对应的内容记录</li>
                  <li>创建或更新翻译</li>
                  <li>清除相关缓存</li>
                </ul>
              </li>
              <li>
                <strong>查看结果</strong> - 导入完成后显示成功/失败统计
              </li>
            </ol>
          </CardContent>
        </Card>

        {/* Important Notes */}
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>重要提示：</strong>
            <ul className="mt-2 space-y-1 list-disc list-inside text-sm">
              <li>导入操作会更新已存在的翻译，创建不存在的翻译</li>
              <li>如果内容记录不存在（code/slug 无效），该条翻译将被跳过</li>
              <li>导入后会自动清除相关缓存，新翻译会立即生效</li>
              <li>建议先导出现有翻译，在此基础上修改后再导入</li>
            </ul>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}
