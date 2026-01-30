"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Shield, ShieldOff, Search } from 'lucide-react'
import AdminLayout from '@/components/admin/AdminLayout'
import Pagination from '@/components/admin/Pagination'

const ITEMS_PER_PAGE = 10

interface User {
  id: string
  name: string | null
  email: string
  role: string
  image: string | null
  createdAt: Date
  _count: {
    resourceClicks: number
    resourceRatings: number
    resourceComments: number
  }
}

interface UsersManagementClientProps {
  users: User[]
}

export default function UsersManagementClient({ users }: UsersManagementClientProps) {
  const [userList, setUserList] = useState(users)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const filteredUsers = userList.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE)
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const toggleUserRole = async (userId: string, currentRole: string) => {
    const newRole = currentRole === 'ADMIN' ? 'USER' : 'ADMIN'

    setLoading(true)
    setMessage(null)

    try {
      const response = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, role: newRole })
      })

      const data = await response.json()

      if (response.ok) {
        setUserList(userList.map(user =>
          user.id === userId ? { ...user, role: newRole } : user
        ))
        setMessage({ type: 'success', text: `用户角色已更新为 ${newRole}` })
      } else {
        setMessage({ type: 'error', text: data.message || '更新失败' })
      }
    } catch (error) {
      console.error('Failed to update user role:', error)
      setMessage({ type: 'error', text: '网络错误，请重试' })
    } finally {
      setLoading(false)
    }
  }

  const stats = {
    total: userList.length,
    admins: userList.filter(u => u.role === 'ADMIN').length,
    regularUsers: userList.filter(u => u.role === 'USER').length
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-[#2D2D2D] mb-2">
            用户管理
          </h1>
          <p className="text-gray-600">
            管理用户角色和权限
          </p>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-[#E5E0D8]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                总用户数
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#2D2D2D]">
                {stats.total}
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#E5E0D8]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                管理员
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#C7826B]">
                {stats.admins}
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#E5E0D8]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                普通用户
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#8DA399]">
                {stats.regularUsers}
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

        {/* Search */}
        <Card className="border-[#E5E0D8] mb-6">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="搜索用户名或邮箱..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
                className="w-full pl-10 pr-4 py-2 border border-[#E5E0D8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8DA399]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Users List */}
        <Card className="border-[#E5E0D8]">
          <CardHeader>
            <CardTitle className="text-xl font-serif text-[#2D2D2D]">
              用户列表 ({filteredUsers.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paginatedUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 bg-[#FDFBF7] rounded-lg hover:bg-[#F3EFE9] transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full bg-[#8DA399] flex items-center justify-center text-white font-bold text-lg">
                      {user.name?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase()}
                    </div>

                    {/* User Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-semibold text-[#2D2D2D]">
                          {user.name || '未命名用户'}
                        </h4>
                        <span className={`px-2 py-1 rounded text-xs ${
                          user.role === 'ADMIN'
                            ? 'bg-[#C7826B]/20 text-[#C7826B]'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {user.role === 'ADMIN' ? '管理员' : '普通用户'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>

                    {/* Stats */}
                    <div className="flex gap-6 text-sm text-gray-600">
                      <div className="text-center">
                        <div className="font-bold text-[#2D2D2D]">
                          {user._count.resourceClicks}
                        </div>
                        <div className="text-xs">点击</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-[#2D2D2D]">
                          {user._count.resourceRatings}
                        </div>
                        <div className="text-xs">评分</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-[#2D2D2D]">
                          {user._count.resourceComments}
                        </div>
                        <div className="text-xs">评论</div>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button
                    onClick={() => toggleUserRole(user.id, user.role)}
                    disabled={loading}
                    variant={user.role === 'ADMIN' ? 'destructive' : 'default'}
                    className={`ml-4 ${
                      user.role === 'ADMIN'
                        ? 'bg-red-500 hover:bg-red-600'
                        : 'bg-[#8DA399] hover:bg-[#6B8379]'
                    } text-white`}
                  >
                    {user.role === 'ADMIN' ? (
                      <>
                        <ShieldOff className="h-4 w-4 mr-2" />
                        设为普通用户
                      </>
                    ) : (
                      <>
                        <Shield className="h-4 w-4 mr-2" />
                        设为管理员
                      </>
                    )}
                  </Button>
                </div>
              ))}

              {filteredUsers.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  未找到匹配的用户
                </div>
              )}
            </div>

            {/* Pagination */}
            {filteredUsers.length > 0 && (
              <div className="mt-6 pt-6 border-t border-[#E5E0D8]">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  totalItems={filteredUsers.length}
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
