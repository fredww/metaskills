"use client"

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  LayoutDashboard,
  Users,
  BookOpen,
  MessageSquare,
  FlaskConical,
  LogOut,
  Shield
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSession, signOut } from 'next-auth/react'

interface NavItem {
  title: string
  href: string
  icon: React.ElementType
  description?: string
}

const navItems: NavItem[] = [
  {
    title: '仪表板',
    href: '/admin',
    icon: LayoutDashboard,
    description: '平台总览和统计'
  },
  {
    title: '用户管理',
    href: '/admin/users',
    icon: Users,
    description: '管理用户和权限'
  },
  {
    title: '资源管理',
    href: '/admin/resources',
    icon: BookOpen,
    description: '管理书籍和工具'
  },
  {
    title: '内容审核',
    href: '/admin/moderation',
    icon: MessageSquare,
    description: '评论和评分审核'
  },
  {
    title: 'A/B 测试',
    href: '/admin/abtesting',
    icon: FlaskConical,
    description: '实验和优化'
  }
]

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Top Bar */}
      <div className="bg-white border-b border-[#E5E0D8] sticky top-0 z-50">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Shield className="h-8 w-8 text-[#8DA399]" />
            <div>
              <h1 className="text-xl font-serif font-bold text-[#2D2D2D]">
                MetaSkills 管理后台
              </h1>
              <p className="text-sm text-gray-600">
                {session?.user?.email}
              </p>
            </div>
          </div>
          <Button
            onClick={() => signOut({ callbackUrl: '/login' })}
            variant="outline"
            className="border-[#8DA399] text-[#8DA399] hover:bg-[#F3EFE9]"
          >
            <LogOut className="h-4 w-4 mr-2" />
            退出登录
          </Button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-[#E5E0D8] min-h-[calc(100vh-73px)] sticky top-[73px] self-start">
          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href ||
                              (item.href !== '/admin' && pathname.startsWith(item.href))

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                    ${isActive
                      ? 'bg-[#8DA399] text-white shadow-md'
                      : 'text-gray-700 hover:bg-[#F3EFE9] hover:text-[#2D2D2D]'
                    }
                  `}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">
                      {item.title}
                    </div>
                    {item.description && (
                      <div className={`text-xs mt-0.5 ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
                        {item.description}
                      </div>
                    )}
                  </div>
                </Link>
              )
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#E5E0D8]">
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-[#8DA399] transition-colors"
            >
              <Shield className="h-4 w-4" />
              返回前台
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
