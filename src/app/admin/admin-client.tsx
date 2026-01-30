"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, Book, Wrench, MousePointerClick, Star, MessageSquare, FlaskConical, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import AdminLayout from '@/components/admin/AdminLayout'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts'

interface Stats {
  totalUsers: number
  totalResources: number
  totalClicks: number
  totalRatings: number
  totalComments: number
  activeTests: number
}

interface RecentUser {
  id: string
  name: string | null
  email: string
  role: string
  createdAt: Date
  _count: {
    resourceClicks: number
    resourceRatings: number
    resourceComments: number
  }
}

interface AdminDashboardClientProps {
  stats: Stats
  recentUsers: RecentUser[]
  userGrowthData: any[]
  clickTrendData: any[]
  topResources: any[]
}

export default function AdminDashboardClient({
  stats,
  recentUsers,
  userGrowthData,
  clickTrendData,
  topResources
}: AdminDashboardClientProps) {
  const statCards = [
    {
      title: '总用户数',
      value: stats.totalUsers,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      href: '/admin/users'
    },
    {
      title: '总资源数',
      value: stats.totalResources,
      icon: Book,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      href: '/admin/resources'
    },
    {
      title: '总点击数',
      value: stats.totalClicks,
      icon: MousePointerClick,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      href: '/admin/resources'
    },
    {
      title: '总评分数',
      value: stats.totalRatings,
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      href: '/admin/moderation'
    },
    {
      title: '总评论数',
      value: stats.totalComments,
      icon: MessageSquare,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      href: '/admin/moderation'
    },
    {
      title: '活跃测试',
      value: stats.activeTests,
      icon: FlaskConical,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      href: '/admin/abtesting'
    }
  ]

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-[#2D2D2D] mb-2">
            仪表板
          </h1>
          <p className="text-gray-600">
            欢迎回来！这里是 MetaSkills 平台数据总览
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statCards.map((stat) => {
            const Icon = stat.icon
            return (
              <Link key={stat.title} href={stat.href}>
                <Card className="border-[#E5E0D8] hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </CardTitle>
                    <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                      <Icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-[#2D2D2D]">
                      {stat.value.toLocaleString()}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        {/* Quick Actions */}
        <Card className="border-[#E5E0D8] mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-serif text-[#2D2D2D]">
              快速操作
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <Button
                asChild
                className="bg-[#8DA399] hover:bg-[#6B8379] text-white"
              >
                <Link href="/admin/users">管理用户</Link>
              </Button>
              <Button
                asChild
                className="bg-[#8DA399] hover:bg-[#6B8379] text-white"
              >
                <Link href="/admin/resources">管理资源</Link>
              </Button>
              <Button
                asChild
                className="bg-[#8DA399] hover:bg-[#6B8379] text-white"
              >
                <Link href="/admin/moderation">内容审核</Link>
              </Button>
              <Button
                asChild
                className="bg-[#C7826B] hover:bg-[#A66A55] text-white"
              >
                <Link href="/admin/abtesting">A/B 测试</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* User Growth Chart */}
          <Card className="border-[#E5E0D8]">
            <CardHeader>
              <CardTitle className="text-lg font-serif text-[#2D2D2D] flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-[#8DA399]" />
                用户增长趋势（近30天）
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E0D8" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(value) => new Date(value).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })}
                    stroke="#666"
                    fontSize={12}
                  />
                  <YAxis stroke="#666" fontSize={12} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#FDFBF7', border: '1px solid #E5E0D8', borderRadius: '8px' }}
                    labelFormatter={(value) => new Date(value).toLocaleDateString('zh-CN')}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#8DA399"
                    strokeWidth={2}
                    dot={{ fill: '#8DA399', r: 4 }}
                    activeDot={{ r: 6 }}
                    name="新用户数"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Click Trend Chart */}
          <Card className="border-[#E5E0D8]">
            <CardHeader>
              <CardTitle className="text-lg font-serif text-[#2D2D2D] flex items-center gap-2">
                <MousePointerClick className="h-5 w-5 text-[#C7826B]" />
                资源点击趋势（近30天）
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={clickTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E0D8" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(value) => new Date(value).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })}
                    stroke="#666"
                    fontSize={12}
                  />
                  <YAxis stroke="#666" fontSize={12} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#FDFBF7', border: '1px solid #E5E0D8', borderRadius: '8px' }}
                    labelFormatter={(value) => new Date(value).toLocaleDateString('zh-CN')}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#C7826B"
                    strokeWidth={2}
                    dot={{ fill: '#C7826B', r: 4 }}
                    activeDot={{ r: 6 }}
                    name="点击数"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Top Resources Chart */}
        <Card className="border-[#E5E0D8] mb-8">
          <CardHeader>
            <CardTitle className="text-lg font-serif text-[#2D2D2D] flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-600" />
              热门资源 TOP 10
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={topResources} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E0D8" />
                <XAxis type="number" stroke="#666" fontSize={12} />
                <YAxis
                  type="category"
                  dataKey="resourceTitle"
                  width={150}
                  tick={{ fontSize: 11 }}
                  stroke="#666"
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#FDFBF7', border: '1px solid #E5E0D8', borderRadius: '8px' }}
                  formatter={(value: any) => [`${value} 次点击`, '点击数']}
                />
                <Bar dataKey="_count" radius={[0, 4, 4, 0]}>
                  {topResources.map((entry: any, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.resourceType === 'BOOK' ? '#8DA399' : '#C7826B'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Users */}
        <Card className="border-[#E5E0D8]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-serif text-[#2D2D2D]">
                最新用户
              </CardTitle>
              <Button
                asChild
                variant="outline"
                className="border-[#8DA399] text-[#8DA399] hover:bg-[#F3EFE9]"
              >
                <Link href="/admin/users">查看全部</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 bg-[#FDFBF7] rounded-lg hover:bg-[#F3EFE9] transition-colors"
                >
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
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
