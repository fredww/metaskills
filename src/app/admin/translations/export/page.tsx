/**
 * Translation Export Page
 * Export translations to various formats for offline editing
 */

'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { ArrowLeft, Download, CheckCircle } from "lucide-react"
import { useState } from "react"

export default function TranslationExportPage() {
  const [exporting, setExporting] = useState(false)
  const [result, setResult] = useState<any>(null)

  async function handleExport(type: string, locale: string, format: string) {
    setExporting(true)
    setResult(null)

    try {
      const params = new URLSearchParams({
        type,
        locale,
        format
      })

      const response = await fetch(`/api/translations/export?${params}`)

      if (!response.ok) {
        throw new Error('导出失败')
      }

      const data = await response.json()

      // Download file
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${type}_${locale}_${new Date().toISOString().split('T')[0]}.${format}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      setResult({
        success: true,
        type,
        locale,
        format,
        total: data.total || data.data?.length || 0
      })
    } catch (error) {
      setResult({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    } finally {
      setExporting(false)
    }
  }

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
            <h1 className="text-3xl font-bold text-gray-900">导出翻译</h1>
            <p className="text-gray-600 mt-2">导出翻译内容用于离线编辑或备份</p>
          </div>
        </div>

        {/* Instructions */}
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            导出的翻译文件可以：
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li>发送给翻译人员进行离线翻译</li>
              <li>导入到专业翻译工具（如 Crowdin, POEditor）</li>
              <li>作为备份保存</li>
              <li>修改后重新导入系统</li>
            </ul>
          </AlertDescription>
        </Alert>

        {/* Export Form */}
        <Card>
          <CardHeader>
            <CardTitle>选择导出内容</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <ExportSection
              title="技能翻译"
              type="skills"
              onExport={handleExport}
              exporting={exporting}
            />

            <ExportSection
              title="练习翻译"
              type="practices"
              onExport={handleExport}
              exporting={exporting}
            />

            <ExportSection
              title="文章翻译"
              type="articles"
              onExport={handleExport}
              exporting={exporting}
            />
          </CardContent>
        </Card>

        {/* Result */}
        {result && (
          <Card className={result.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}>
            <CardContent className="pt-6">
              {result.success ? (
                <div className="flex items-center gap-2 text-green-800">
                  <CheckCircle className="w-5 h-5" />
                  <div>
                    <p className="font-semibold">导出成功！</p>
                    <p className="text-sm">
                      已导出 {result.type} 的 {result.locale} 翻译，
                      共 {result.total} 条记录
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-red-800">
                  <p className="font-semibold">导出失败</p>
                  <p className="text-sm">{result.error}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Format Guide */}
        <Card>
          <CardHeader>
            <CardTitle>文件格式说明</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">JSON 格式（推荐）</h3>
              <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                <li>结构化数据，易于机器处理</li>
                <li>支持完整字段（包括 SEO 字段）</li>
                <li>文件体积小，加载速度快</li>
                <li>可直接修改后重新导入</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">XLSX 格式（即将推出）</h3>
              <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                <li>Excel 表格格式，易于人工编辑</li>
                <li>适合非技术人员使用</li>
                <li>支持批注和评论</li>
                <li>可追踪修改历史</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">CSV 格式（即将推出）</h3>
              <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                <li>通用表格格式</li>
                <li>可在任何表格软件中打开</li>
                <li>适合简单的翻译工作流</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Workflow Tips */}
        <Card>
          <CardHeader>
            <CardTitle>翻译工作流建议</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3 list-decimal list-inside">
              <li>
                <strong>导出</strong> - 选择内容类型和语言，导出为 JSON
              </li>
              <li>
                <strong>翻译</strong> - 将文件发送给翻译团队或使用翻译工具
              </li>
              <li>
                <strong>审核</strong> - 翻译完成后进行质量审核
              </li>
              <li>
                <strong>导入</strong> - 使用导入页面上传翻译后的文件
              </li>
              <li>
                <strong>发布</strong> - 在编辑器中将状态改为"已发布"
              </li>
            </ol>
          </CardContent>
        </Card>

        {/* Professional Translation Platforms */}
        <Card>
          <CardHeader>
            <CardTitle>专业翻译平台集成（计划中）</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-3">
              未来将支持直接集成专业翻译管理平台：
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 border rounded-lg">
                <h4 className="font-semibold">Crowdin</h4>
                <p className="text-sm text-gray-600">专业的云端翻译管理平台</p>
              </div>
              <div className="p-3 border rounded-lg">
                <h4 className="font-semibold">POEditor</h4>
                <p className="text-sm text-gray-600">轻量级翻译管理工具</p>
              </div>
              <div className="p-3 border rounded-lg">
                <h4 className="font-semibold">Lokalise</h4>
                <p className="text-sm text-gray-600">现代化的本地化平台</p>
              </div>
              <div className="p-3 border rounded-lg">
                <h4 className="font-semibold">Phrase</h4>
                <p className="text-sm text-gray-600">企业级翻译管理</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

interface ExportSectionProps {
  title: string
  type: string
  onExport: (type: string, locale: string, format: string) => void
  exporting: boolean
}

function ExportSection({ title, type, onExport, exporting }: ExportSectionProps) {
  const [locale, setLocale] = useState('all')
  const [format, setFormat] = useState('json')

  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <h3 className="font-semibold">{title}</h3>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">语言</label>
          <Select value={locale} onValueChange={setLocale}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">所有语言</SelectItem>
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
          <label className="text-sm font-medium">格式</label>
          <Select value={format} onValueChange={setFormat}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="json">JSON</SelectItem>
              <SelectItem value="xlsx" disabled>XLSX (即将推出)</SelectItem>
              <SelectItem value="csv" disabled>CSV (即将推出)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        onClick={() => onExport(type, locale, format)}
        disabled={exporting}
        className="w-full"
      >
        <Download className="w-4 h-4 mr-2" />
        {exporting ? '导出中...' : '导出'}
      </Button>
    </div>
  )
}
