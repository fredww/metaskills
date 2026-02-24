"use client"

import { Button } from "@/components/ui/button"
import { useSession, signOut } from "next-auth/react"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Link } from "@/i18n/routing"
import { useTranslations } from 'next-intl'

export function Header() {
  const { data: session } = useSession()
  const t = useTranslations('nav')

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl mx-auto px-6 lg:px-8 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          {/* Logo Icon */}
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10 transition-transform group-hover:scale-110"
          >
            <defs>
              <linearGradient id="iconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: "#8DA399", stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: "#C7826B", stopOpacity: 1}} />
              </linearGradient>
            </defs>

            {/* Outer hexagon */}
            <path
              d="M24 4.8 L41.57 14.4 L41.57 33.6 L24 43.2 L6.43 33.6 L6.43 14.4 Z"
              stroke="url(#iconGrad)"
              strokeWidth="1.5"
              fill="none"
              opacity="0.3"
            />
            {/* Middle hexagon */}
            <path
              d="M24 9.6 L36.85 17.2 L36.85 31.8 L24 39.4 L11.15 31.8 L11.15 17.2 Z"
              stroke="url(#iconGrad)"
              strokeWidth="1.5"
              fill="none"
              opacity="0.6"
            />
            {/* Inner hexagon - solid */}
            <path
              d="M24 14.4 L32.12 19.2 L32.12 28.8 L24 33.6 L15.88 28.8 L15.88 19.2 Z"
              fill="url(#iconGrad)"
            />
            {/* Center dot */}
            <circle cx="24" cy="24" r="2" fill="#FDFBF7" />
          </svg>

          {/* Brand Name */}
          <span className="text-2xl font-bold font-serif tracking-tight text-[#2D2D2D] group-hover:text-[#8DA399] transition-colors">
            MetaSkills<span className="text-[#C7826B]">.ai</span>
          </span>
        </Link>

        {/* Centered Navigation */}
        <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex gap-6">
          <Link
            href="/skills"
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
          >
            {t('skills')}
          </Link>
          <Link
            href="/assessment"
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
          >
            {t('assessment')}
          </Link>
          <Link
            href="/practices"
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
          >
            {t('practices')}
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
          >
            {t('about')}
          </Link>
        </nav>

        {/* Right Section: Language Switcher + Auth Buttons */}
        <div className="flex items-center gap-4">
          {/* Language Switcher */}
          <LanguageSwitcher />
          {session?.user ? (
            <>
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  {t('dashboard')}
                </Button>
              </Link>
              <Link href="/profile">
                <Button variant="outline" size="sm" className="border-[#E5E0D8] text-[#2D2D2D] hover:bg-[#F3EFE9]">
                  {t('profile')}
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => signOut({ callbackUrl: '/' })}
              >
                {t('logout')}
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  {t('login')}
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm" className="bg-[#8DA399] hover:bg-[#6B8379]">
                  {t('signup')}
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
