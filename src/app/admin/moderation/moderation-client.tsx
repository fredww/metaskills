"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { MessageSquare, Star, Trash2, ExternalLink } from 'lucide-react'
import AdminLayout from '@/components/admin/AdminLayout'
import Pagination from '@/components/admin/Pagination'

const ITEMS_PER_PAGE = 10

interface Comment {
  id: string
  content: string
  createdAt: Date
  resourceType: string
  resourceUrl: string
  user: {
    id: string
    name: string | null
    email: string
  }
  resource: {
    title?: string | null
    name?: string | null
    url: string
  } | null
}

interface Rating {
  id: string
  rating: number
  createdAt: Date
  resourceType: string
  resourceUrl: string
  user: {
    id: string
    name: string | null
    email: string
  }
  resource: {
    title?: string | null
    name?: string | null
    url: string
  } | null
}

interface ModerationClientProps {
  comments: Comment[]
  ratings: Rating[]
}

type TabType = 'comments' | 'ratings'

export default function ModerationClient({
  comments,
  ratings
}: ModerationClientProps) {
  const [activeTab, setActiveTab] = useState<TabType>('comments')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const filteredComments = comments.filter(comment =>
    comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    comment.user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    comment.user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredRatings = ratings.filter(rating =>
    rating.user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rating.user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Pagination
  const currentItems = activeTab === 'comments' ? filteredComments : filteredRatings
  const totalPages = Math.ceil(currentItems.length / ITEMS_PER_PAGE)
  const paginatedItems = currentItems.slice(
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

  const deleteComment = async (commentId: string) => {
    if (!confirm('确定要删除这条评论吗？')) return

    setLoading(true)
    setMessage(null)

    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setMessage({ type: 'success', text: '评论已删除' })
        // 刷新页面以更新列表
        setTimeout(() => window.location.reload(), 1000)
      } else {
        setMessage({ type: 'error', text: '删除失败，请重试' })
      }
    } catch (error) {
      console.error('Failed to delete comment:', error)
      setMessage({ type: 'error', text: '网络错误，请重试' })
    } finally {
      setLoading(false)
    }
  }

  const deleteRating = async (ratingId: string) => {
    if (!confirm('确定要删除这条评分吗？')) return

    setLoading(true)
    setMessage(null)

    try {
      const response = await fetch(`/api/ratings/${ratingId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setMessage({ type: 'success', text: '评分已删除' })
        // 刷新页面以更新列表
        setTimeout(() => window.location.reload(), 1000)
      } else {
        setMessage({ type: 'error', text: '删除失败，请重试' })
      }
    } catch (error) {
      console.error('Failed to delete rating:', error)
      setMessage({ type: 'error', text: '网络错误，请重试' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-[#2D2D2D] mb-2">
            内容审核
          </h1>
          <p className="text-gray-600">
            管理用户评论和评分
          </p>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="border-[#E5E0D8]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                总评论数
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#8DA399]">
                {comments.length}
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#E5E0D8]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Star className="h-4 w-4" />
                总评分数
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#C7826B]">
                {ratings.length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success'
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {message.text}
          </div>
        )}

        {/* Tabs and Search */}
        <Card className="border-[#E5E0D8] mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex gap-2">
                <Button
                  onClick={() => handleTabChange('comments')}
                  variant={activeTab === 'comments' ? 'default' : 'outline'}
                  className={activeTab === 'comments' ? 'bg-[#8DA399] hover:bg-[#6B8379]' : 'border-[#8DA399] text-[#8DA399]'}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  评论 ({comments.length})
                </Button>
                <Button
                  onClick={() => handleTabChange('ratings')}
                  variant={activeTab === 'ratings' ? 'default' : 'outline'}
                  className={activeTab === 'ratings' ? 'bg-[#8DA399] hover:bg-[#6B8379]' : 'border-[#8DA399] text-[#8DA399]'}
                >
                  <Star className="h-4 w-4 mr-2" />
                  评分 ({ratings.length})
                </Button>
              </div>
              <input
                type="text"
                placeholder="搜索用户、内容..."
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

        {/* Content List */}
        <Card className="border-[#E5E0D8]">
          <CardHeader>
            <CardTitle className="text-xl font-serif text-[#2D2D2D]">
              {activeTab === 'comments' ? '评论列表' : '评分列表'} (
                {activeTab === 'comments' ? filteredComments.length : filteredRatings.length}
              )
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeTab === 'comments' ? (
                // Comments List
                (paginatedItems as Comment[]).map((comment) => (
                  <div
                    key={comment.id}
                    className="p-4 bg-[#FDFBF7] rounded-lg hover:bg-[#F3EFE9] transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-full bg-[#8DA399] flex items-center justify-center text-white font-bold">
                            {comment.user.name?.charAt(0).toUpperCase() || comment.user.email.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h4 className="font-semibold text-[#2D2D2D]">
                              {comment.user.name || '未命名用户'}
                            </h4>
                            <p className="text-xs text-gray-500">{comment.user.email}</p>
                          </div>
                        </div>
                        <p className="text-gray-700 bg-white p-3 rounded-lg">
                          {comment.content}
                        </p>
                        {comment.resource && (
                          <Link
                            href={`/resources/${comment.resourceType.toLowerCase()}/${comment.resource.url}`}
                            className="inline-flex items-center gap-1 mt-2 text-sm text-[#8DA399] hover:underline"
                          >
                            <ExternalLink className="h-3 w-3" />
                            {comment.resource.title || comment.resource.name}
                          </Link>
                        )}
                        <p className="text-xs text-gray-500 mt-2">
                          {new Date(comment.createdAt).toLocaleString('zh-CN')}
                        </p>
                      </div>
                      <Button
                        onClick={() => deleteComment(comment.id)}
                        disabled={loading}
                        variant="destructive"
                        size="sm"
                        className="ml-4 bg-red-500 hover:bg-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                // Ratings List
                (paginatedItems as Rating[]).map((rating) => (
                  <div
                    key={rating.id}
                    className="p-4 bg-[#FDFBF7] rounded-lg hover:bg-[#F3EFE9] transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        {/* User Avatar */}
                        <div className="w-10 h-10 rounded-full bg-[#C7826B] flex items-center justify-center text-white font-bold">
                          {rating.user.name?.charAt(0).toUpperCase() || rating.user.email.charAt(0).toUpperCase()}
                        </div>

                        {/* User Info */}
                        <div className="flex-1">
                          <h4 className="font-semibold text-[#2D2D2D]">
                            {rating.user.name || '未命名用户'}
                          </h4>
                          <p className="text-xs text-gray-500">{rating.user.email}</p>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg">
                          <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                          <span className="text-2xl font-bold text-[#2D2D2D]">
                            {rating.rating}
                          </span>
                          <span className="text-sm text-gray-500">/ 5</span>
                        </div>

                        {/* Resource */}
                        <div className="flex-1">
                          {rating.resource && (
                            <Link
                              href={`/resources/${rating.resourceType.toLowerCase()}/${rating.resource.url}`}
                              className="text-[#8DA399] hover:underline"
                            >
                              {rating.resource.title || rating.resource.name}
                            </Link>
                          )}
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(rating.createdAt).toLocaleString('zh-CN')}
                          </p>
                        </div>
                      </div>

                      {/* Delete Button */}
                      <Button
                        onClick={() => deleteRating(rating.id)}
                        disabled={loading}
                        variant="destructive"
                        size="sm"
                        className="ml-4 bg-red-500 hover:bg-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}

              {(activeTab === 'comments' ? filteredComments : filteredRatings).length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  未找到匹配的内容
                </div>
              )}
            </div>

            {/* Pagination */}
            {currentItems.length > 0 && (
              <div className="mt-6 pt-6 border-t border-[#E5E0D8]">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  totalItems={currentItems.length}
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
