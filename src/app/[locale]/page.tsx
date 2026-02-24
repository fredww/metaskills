"use client"

import { Link } from "@/i18n/routing"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect } from "react"
import { useTranslations } from 'next-intl'

export default function HomePage() {
  const t = useTranslations('hero')
  const tFramework = useTranslations('framework')
  const tWhy = useTranslations('why')
  const tApproach = useTranslations('approach')
  const tStart = useTranslations('start')
  const tPhilosophy = useTranslations('philosophy')
  useEffect(() => {
    // Intersection Observer for scroll animations
    const reveals = document.querySelectorAll('.reveal')

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active')
        }
      })
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    })

    reveals.forEach(reveal => {
      revealObserver.observe(reveal)
    })

    return () => {
      reveals.forEach(reveal => revealObserver.unobserve(reveal))
    }
  }, [])

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Decorative blobs */}
        <div className="gradient-blob w-96 h-96 bg-[#8DA399] top-0 -right-48"></div>
        <div className="gradient-blob w-80 h-80 bg-[#C7826B] animation-delay-200" style={{bottom: '180px', left: '-160px'}}></div>
        <div className="gradient-blob w-64 h-64 bg-[#D4AF37] animation-delay-400" style={{top: 'calc(50% + 100px)', left: 'calc(50% + 20px)'}}></div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center" style={{marginTop: '-70px'}}>
          {/* Badge */}
          <div className="animate-fade-up inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-[#E5E0D8] mb-8">
            <span className="w-2 h-2 rounded-full bg-[#8DA399] animate-pulse"></span>
            <span className="text-sm font-medium text-gray-600">{t('badge')}</span>
          </div>

          {/* Headline */}
          <h1 className="animate-fade-up animation-delay-100 text-5xl md:text-7xl font-bold font-serif leading-tight mb-8 text-[#2D2D2D]">
            {t('title')}
            <span className="gradient-text block mt-2">{t('titleHighlight')}</span>
          </h1>

          {/* Subheadline */}
          <p className="animate-fade-up animation-delay-200 text-xl md:text-2xl text-gray-600 font-light max-w-3xl mx-auto mb-12 leading-relaxed">
            {t('subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="animate-fade-up animation-delay-300 flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/assessment" className="btn-primary px-8 py-4 rounded-full text-base font-semibold inline-flex items-center space-x-2">
              <span>{t('cta.primary')}</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="/skills" className="btn-secondary px-8 py-4 rounded-full text-base font-semibold">
              {t('cta.secondary')}
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="animate-fade-up animation-delay-400 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-[#8DA399]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{t('trust.evidence')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-[#C7826B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>{t('trust.privacy')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>{t('trust.human')}</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Meta-Skills Framework Section */}
      <section id="framework" className="py-24 lg:py-32 bg-[#F3EFE9]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="reveal text-center max-w-3xl mx-auto mb-20">
            <span className="inline-block text-sm font-semibold tracking-wide uppercase text-[#C7826B] mb-4">{tFramework('label')}</span>
            <h2 className="text-4xl md:text-5xl font-bold font-serif text-[#2D2D2D] mb-6">
              {tFramework('title')}
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              {tFramework('subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Cognitive System */}
            <div className="reveal card-hover bg-white rounded-3xl p-8 border border-[#E5E0D8]">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8DA399] to-[#6B8379] flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold font-serif text-[#2D2D2D] mb-4">{tFramework('cognitive.title')}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {tFramework('cognitive.description')}
              </p>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-[#8DA399] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{tFramework('cognitive.skills.learning')}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-[#8DA399] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{tFramework('cognitive.skills.thinking')}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-[#8DA399] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{tFramework('cognitive.skills.systems')}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-[#8DA399] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{tFramework('cognitive.skills.decision')}</span>
                </li>
              </ul>
            </div>

            {/* Interpersonal System */}
            <div className="reveal card-hover bg-white rounded-3xl p-8 border border-[#E5E0D8] animation-delay-100">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#C7826B] to-[#A56550] flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold font-serif text-[#2D2D2D] mb-4">{tFramework('interpersonal.title')}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {tFramework('interpersonal.description')}
              </p>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-[#C7826B] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{tFramework('interpersonal.skills.emotional')}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-[#C7826B] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{tFramework('interpersonal.skills.communication')}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-[#C7826B] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{tFramework('interpersonal.skills.empathy')}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-[#C7826B] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{tFramework('interpersonal.skills.collaboration')}</span>
                </li>
              </ul>
            </div>

            {/* Self System */}
            <div className="reveal card-hover bg-white rounded-3xl p-8 border border-[#E5E0D8] animation-delay-200">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6B7C93] to-[#4A5A6D] flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold font-serif text-[#2D2D2D] mb-4">{tFramework('self.title')}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {tFramework('self.description')}
              </p>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-[#6B7C93] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{tFramework('self.skills.awareness')}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-[#6B7C93] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{tFramework('self.skills.regulation')}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-[#6B7C93] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{tFramework('self.skills.resilience')}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-[#6B7C93] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{tFramework('self.skills.mindfulness')}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="reveal text-center mt-16">
            <Link href="/skills" className="inline-flex items-center space-x-2 text-[#8DA399] font-semibold hover:text-[#6B8379] transition-colors">
              <span>{tFramework('viewComplete')}</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Meta-Skills Section */}
      <section id="why" className="py-24 lg:py-32 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              <span className="inline-block text-sm font-semibold tracking-wide uppercase text-[#C7826B] mb-4">{tWhy('label')}</span>
              <h2 className="text-4xl md:text-5xl font-bold font-serif text-[#2D2D2D] mb-6">
                {tWhy('title')}<br />{tWhy('titleHighlight')}
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {tWhy('subtitle')}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {tWhy('description')}
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-[#E8F4F0] flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[#8DA399]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#2D2D2D] mb-2">{tWhy('benefits.automation.title')}</h4>
                    <p className="text-gray-600">{tWhy('benefits.automation.description')}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-[#FBECE8] flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[#C7826B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#2D2D2D] mb-2">{tWhy('benefits.wellbeing.title')}</h4>
                    <p className="text-gray-600">{tWhy('benefits.wellbeing.description')}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F5F3EF] flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#2D2D2D] mb-2">{tWhy('benefits.universal.title')}</h4>
                    <p className="text-gray-600">{tWhy('benefits.universal.description')}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="reveal relative">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-[#E5E0D8]">
                <h3 className="text-xl font-bold font-serif text-[#2D2D2D] mb-6">{tWhy('chart.title')}</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-gray-600">{tWhy('chart.technical.label')}</span>
                      <span className="text-gray-500">{tWhy('chart.technical.trend')}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3">
                      <div className="bg-gradient-to-r from-[#6B7C93] to-[#8DA399] h-3 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{tWhy('chart.technical.description')}</p>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-gray-600">{tWhy('chart.meta.label')}</span>
                      <span className="text-[#8DA399] font-semibold">{tWhy('chart.meta.trend')}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3">
                      <div className="bg-gradient-to-r from-[#8DA399] to-[#C7826B] h-3 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{tWhy('chart.meta.description')}</p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[#E5E0D8]">
                  <p className="text-sm text-gray-600 italic">
                    "{tWhy('chart.quote')}"
                  </p>
                  <p className="text-xs text-gray-500 mt-2">{tWhy('chart.attribution')}</p>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br from-[#8DA399]/20 to-[#C7826B]/20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* How You Learn Section */}
      <section className="py-24 lg:py-32 bg-[#2D2D2D] text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="reveal text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-sm font-semibold tracking-wide uppercase text-[#8DA399] mb-4">{tApproach('label')}</span>
            <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6">
              {tApproach('title')}
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              {tApproach('subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="reveal bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="text-3xl mb-4">{tApproach('microlearning.emoji')}</div>
              <h4 className="text-xl font-bold mb-3">{tApproach('microlearning.title')}</h4>
              <p className="text-gray-400 text-sm">{tApproach('microlearning.description')}</p>
            </div>

            <div className="reveal bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 animation-delay-100">
              <div className="text-3xl mb-4">{tApproach('nonLinear.emoji')}</div>
              <h4 className="text-xl font-bold mb-3">{tApproach('nonLinear.title')}</h4>
              <p className="text-gray-400 text-sm">{tApproach('nonLinear.description')}</p>
            </div>

            <div className="reveal bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 animation-delay-200">
              <div className="text-3xl mb-4">{tApproach('practice.emoji')}</div>
              <h4 className="text-xl font-bold mb-3">{tApproach('practice.title')}</h4>
              <p className="text-gray-400 text-sm">{tApproach('practice.description')}</p>
            </div>

            <div className="reveal bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="text-3xl mb-4">{tApproach('ai.emoji')}</div>
              <h4 className="text-xl font-bold mb-3">{tApproach('ai.title')}</h4>
              <p className="text-gray-400 text-sm">{tApproach('ai.description')}</p>
            </div>

            <div className="reveal bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 animation-delay-100">
              <div className="text-3xl mb-4">{tApproach('calm.emoji')}</div>
              <h4 className="text-xl font-bold mb-3">{tApproach('calm.title')}</h4>
              <p className="text-gray-400 text-sm">{tApproach('calm.description')}</p>
            </div>

            <div className="reveal bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 animation-delay-200">
              <div className="text-3xl mb-4">{tApproach('longterm.emoji')}</div>
              <h4 className="text-xl font-bold mb-3">{tApproach('longterm.title')}</h4>
              <p className="text-gray-400 text-sm">{tApproach('longterm.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Get Started Section */}
      <section id="start" className="py-24 lg:py-32 bg-[#F3EFE9]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="reveal text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-sm font-semibold tracking-wide uppercase text-[#C7826B] mb-4">{tStart('label')}</span>
            <h2 className="text-4xl md:text-5xl font-bold font-serif text-[#2D2D2D] mb-6">
              {tStart('title')}
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              {tStart('subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="reveal card-hover bg-white rounded-3xl p-8 border border-[#E5E0D8]">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#C7826B] to-[#A56550] flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold font-serif text-[#2D2D2D] mb-3">{tStart('assessment.title')}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {tStart('assessment.description')}
              </p>
              <Link href="/assessment" className="inline-flex items-center space-x-2 text-[#C7826B] font-semibold hover:text-[#A56550] transition-colors">
                <span>{tStart('assessment.cta')}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="reveal card-hover bg-white rounded-3xl p-8 border border-[#E5E0D8] animation-delay-100">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#8DA399] to-[#6B8379] flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold font-serif text-[#2D2D2D] mb-3">{tStart('practice.title')}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {tStart('practice.description')}
              </p>
              <Link href="/practices" className="inline-flex items-center space-x-2 text-[#8DA399] font-semibold hover:text-[#6B8379] transition-colors">
                <span>{tStart('practice.cta')}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="reveal card-hover bg-white rounded-3xl p-8 border border-[#E5E0D8] animation-delay-200">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6B7C93] to-[#4A5A6D] flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold font-serif text-[#2D2D2D] mb-3">{tStart('calm.title')}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {tStart('calm.description')}
              </p>
              <Link href="#" className="inline-flex items-center space-x-2 text-[#6B7C93] font-semibold hover:text-[#4A5A6D] transition-colors">
                <span>{tStart('calm.cta')}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" className="py-24 lg:py-32 bg-[#FDFBF7]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="reveal">
            <span className="inline-block text-sm font-semibold tracking-wide uppercase text-[#C7826B] mb-4">{tPhilosophy('label')}</span>
            <h2 className="text-4xl md:text-5xl font-bold font-serif text-[#2D2D2D] mb-8">
              {tPhilosophy('title')}
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-12">
              {tPhilosophy('subtitle')}
            </p>

            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div className="bg-[#F3EFE9] rounded-2xl p-6">
                <h4 className="text-lg font-bold text-[#2D2D2D] mb-3">{tPhilosophy('believe.title')}</h4>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start space-x-2">
                    <svg className="w-5 h-5 text-[#8DA399] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{tPhilosophy('believe.awareness')}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <svg className="w-5 h-5 text-[#8DA399] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{tPhilosophy('believe.development')}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <svg className="w-5 h-5 text-[#8DA399] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{tPhilosophy('believe.structure')}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <svg className="w-5 h-5 text-[#8DA399] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{tPhilosophy('believe.longterm')}</span>
                  </li>
                </ul>
              </div>

              <div className="bg-[#F3EFE9] rounded-2xl p-6">
                <h4 className="text-lg font-bold text-[#2D2D2D] mb-3">{tPhilosophy('reject.title')}</h4>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start space-x-2">
                    <svg className="w-5 h-5 text-[#C7826B] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>{tPhilosophy('reject.hustle')}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <svg className="w-5 h-5 text-[#C7826B] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>{tPhilosophy('reject.gamification')}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <svg className="w-5 h-5 text-[#C7826B] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>{tPhilosophy('reject.ranking')}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <svg className="w-5 h-5 text-[#C7826B] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>{tPhilosophy('reject.optimization')}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
