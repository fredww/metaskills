"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Book, Wrench, ExternalLink, TrendingUp } from 'lucide-react'
import Image from 'next/image'
import AdminLayout from '@/components/admin/AdminLayout'
import Pagination from '@/components/admin/Pagination'
import { AffiliateLink } from '@/components/resources/AffiliateLink'

const ITEMS_PER_PAGE = 10

interface Book {
  url: string
  title: string
  author: string
  coverUrl: string
  skillCode: string
  _count: {
    resourceClicks: number
    resourceRatings: number
  }
}

interface Tool {
  url: string
  name: string
  category: string
  websiteUrl: string
  logoUrl: string
  skillCode: string
  _count: {
    resourceClicks: number
    resourceRatings: number
  }
}

interface ResourcesManagementClientProps {
  books: Book[]
  tools: Tool[]
  stats: {
    totalClicks: number
    totalRatings: number
  }
}

type TabType = 'books' | 'tools'

export default function ResourcesManagementClient({
  books,
  tools,
  stats
}: ResourcesManagementClientProps) {
  const [activeTab, setActiveTab] = useState<TabType>('books')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredTools = tools.filter(tool =>
    tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const currentResources = activeTab === 'books' ? filteredBooks : filteredTools

  // Pagination
  const totalPages = Math.ceil(currentResources.length / ITEMS_PER_PAGE)
  const paginatedResources = currentResources.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Reset page when tab or search changes
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab)
    setCurrentPage(1)
  }

  return (
    <AdminLayout>
      <div className="w-full overflow-x-hidden">
        {/* Header */}
        <div className="mb-8 max-w-full">
          <h1 className="text-3xl font-serif font-bold text-[#2D2D2D] mb-2">
            资源管理
          </h1>
          <p className="text-gray-600">
            管理平台上的书籍和工具资源
          </p>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8 max-w-full">
          <Card className="border-[#E5E0D8]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Book className="h-4 w-4" />
                书籍总数
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#2D2D2D]">
                {books.length}
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#E5E0D8]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Wrench className="h-4 w-4" />
                工具总数
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#2D2D2D]">
                {tools.length}
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#E5E0D8]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                总点击数
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#8DA399]">
                {stats.totalClicks.toLocaleString()}
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#E5E0D8]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                总评分数
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#C7826B]">
                {stats.totalRatings.toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs and Search */}
        <Card className="border-[#E5E0D8] mb-6 max-w-full">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex gap-2">
                <Button
                  onClick={() => handleTabChange('books')}
                  variant={activeTab === 'books' ? 'default' : 'outline'}
                  className={activeTab === 'books' ? 'bg-[#8DA399] hover:bg-[#6B8379]' : 'border-[#8DA399] text-[#8DA399]'}
                >
                  <Book className="h-4 w-4 mr-2" />
                  书籍 ({books.length})
                </Button>
                <Button
                  onClick={() => handleTabChange('tools')}
                  variant={activeTab === 'tools' ? 'default' : 'outline'}
                  className={activeTab === 'tools' ? 'bg-[#8DA399] hover:bg-[#6B8379]' : 'border-[#8DA399] text-[#8DA399]'}
                >
                  <Wrench className="h-4 w-4 mr-2" />
                  工具 ({tools.length})
                </Button>
              </div>
              <input
                type="text"
                placeholder={`搜索${activeTab === 'books' ? '书名或作者' : '工具名称或分类'}...`}
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
                className="w-full md:w-96 px-4 py-2 border border-[#E5E0D8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8DA399]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Resources List */}
        <Card className="border-[#E5E0D8] max-w-full">
          <CardHeader>
            <CardTitle className="text-xl font-serif text-[#2D2D2D]">
              {activeTab === 'books' ? '书籍列表' : '工具列表'} ({currentResources.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paginatedResources.map((resource) => {
                if (activeTab === 'books') {
                  const book = resource as Book
                  return (
                    <div
                      key={book.url}
                      className="flex items-center gap-4 p-4 bg-[#FDFBF7] rounded-lg hover:bg-[#F3EFE9] transition-colors min-w-0"
                    >
                      {/* Cover */}
                      <div className="w-16 h-20 rounded bg-gray-200 overflow-hidden flex-shrink-0">
                        {book.coverUrl && (
                          <Image
                            src={book.coverUrl}
                            alt={book.title}
                            width={64}
                            height={80}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0 overflow-hidden">
                        <h4 className="font-semibold text-[#2D2D2D] mb-1" title={book.title}>
                          {book.title.length > 80 ? book.title.substring(0, 80) + '...' : book.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2 truncate" title={book.author}>
                          {book.author}
                        </p>
                        <div className="flex gap-4 text-xs text-gray-500">
                          <span className="truncate">{book.skillCode.replace('-', ' ')}</span>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex gap-6 text-sm text-gray-600 flex-shrink-0">
                        <div className="text-center">
                          <div className="font-bold text-[#2D2D2D]">
                            {book._count.resourceClicks}
                          </div>
                          <div className="text-xs">点击</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-[#2D2D2D]">
                            {book._count.resourceRatings}
                          </div>
                          <div className="text-xs">评分</div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 flex-shrink-0">
                        <AffiliateLink
                          href={book.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-[#8DA399] text-[#8DA399] hover:bg-[#F3EFE9]"
                          >
                            查看详情
                          </Button>
                        </AffiliateLink>
                      </div>
                    </div>
                  )
                } else {
                  const tool = resource as Tool
                  return (
                    <div
                      key={tool.url}
                      className="flex items-center gap-4 p-4 bg-[#FDFBF7] rounded-lg hover:bg-[#F3EFE9] transition-colors min-w-0"
                    >
                      {/* Logo */}
                      <div className="w-16 h-16 rounded bg-gray-200 overflow-hidden flex-shrink-0">
                        {tool.logoUrl && (
                          <Image
                            src={tool.logoUrl}
                            alt={tool.name}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0 overflow-hidden">
                        <h4 className="font-semibold text-[#2D2D2D] mb-1 truncate" title={tool.name}>
                          {tool.name}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2 truncate" title={tool.category}>
                          {tool.category}
                        </p>
                        <a
                          href={tool.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs text-[#8DA399] hover:underline truncate"
                          title={tool.websiteUrl}
                        >
                          <ExternalLink className="h-3 w-3 flex-shrink-0" />
                          <span className="truncate">访问网站</span>
                        </a>
                      </div>

                      {/* Stats */}
                      <div className="flex gap-6 text-sm text-gray-600 flex-shrink-0">
                        <div className="text-center">
                          <div className="font-bold text-[#2D2D2D]">
                            {tool._count.resourceClicks}
                          </div>
                          <div className="text-xs">点击</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-[#2D2D2D]">
                            {tool._count.resourceRatings}
                          </div>
                          <div className="text-xs">评分</div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 flex-shrink-0">
                        <AffiliateLink
                          href={tool.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-[#8DA399] text-[#8DA399] hover:bg-[#F3EFE9]"
                          >
                            查看详情
                          </Button>
                        </AffiliateLink>
                      </div>
                    </div>
                  )
                }
              })}

              {currentResources.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  未找到匹配的资源
                </div>
              )}
            </div>

            {/* Pagination */}
            {currentResources.length > 0 && (
              <div className="mt-6 pt-6 border-t border-[#E5E0D8]">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  totalItems={currentResources.length}
                  itemsPerPage={ITEMS_PER_PAGE}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
