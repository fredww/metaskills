"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'

export default function AboutPage() {
  const t = useTranslations('about')

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#8DA399]/10 via-[#D4AF37]/10 to-[#C7826B]/10 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#2D2D2D] mb-6">
            {t('hero.title')}
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
            {t('hero.subtitle')}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Mission */}
        <section className="mb-16">
          <h2 className="text-3xl font-serif font-bold text-[#2D2D2D] mb-6">
            {t('mission.title')}
          </h2>
          <div className="bg-white rounded-3xl p-8 border border-[#E5E0D8]">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              {t('mission.paragraph1')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t('mission.paragraph2')}
            </p>
          </div>
        </section>

        {/* What We Offer */}
        <section className="mb-16">
          <h2 className="text-3xl font-serif font-bold text-[#2D2D2D] mb-6">
            {t('whatWeOffer.title')}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-[#E5E0D8] hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">{t('whatWeOffer.assessment.emoji')}</div>
                <h3 className="font-semibold text-[#2D2D2D] mb-2">
                  {t('whatWeOffer.assessment.title')}
                </h3>
                <p className="text-sm text-gray-600">
                  {t('whatWeOffer.assessment.description')}
                </p>
              </CardContent>
            </Card>
            <Card className="border-[#E5E0D8] hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">{t('whatWeOffer.practices.emoji')}</div>
                <h3 className="font-semibold text-[#2D2D2D] mb-2">
                  {t('whatWeOffer.practices.title')}
                </h3>
                <p className="text-sm text-gray-600">
                  {t('whatWeOffer.practices.description')}
                </p>
              </CardContent>
            </Card>
            <Card className="border-[#E5E0D8] hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">{t('whatWeOffer.tracking.emoji')}</div>
                <h3 className="font-semibold text-[#2D2D2D] mb-2">
                  {t('whatWeOffer.tracking.title')}
                </h3>
                <p className="text-sm text-gray-600">
                  {t('whatWeOffer.tracking.description')}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* The 8 Meta-Skills */}
        <section className="mb-16">
          <h2 className="text-3xl font-serif font-bold text-[#2D2D2D] mb-6">
            {t('metaSkills.title')}
          </h2>
          <div className="bg-white rounded-3xl p-8 border border-[#E5E0D8]">
            <p className="text-gray-700 mb-6">
              {t('metaSkills.intro')}
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <span className="text-[#8DA399] text-xl">✓</span>
                <div>
                  <h4 className="font-semibold text-[#2D2D2D]">{t('metaSkills.learning.title')}</h4>
                  <p className="text-sm text-gray-600">{t('metaSkills.learning.description')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#8DA399] text-xl">✓</span>
                <div>
                  <h4 className="font-semibold text-[#2D2D2D]">{t('metaSkills.thinking.title')}</h4>
                  <p className="text-sm text-gray-600">{t('metaSkills.thinking.description')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#C7826B] text-xl">✓</span>
                <div>
                  <h4 className="font-semibold text-[#2D2D2D]">{t('metaSkills.communication.title')}</h4>
                  <p className="text-sm text-gray-600">{t('metaSkills.communication.description')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#C7826B] text-xl">✓</span>
                <div>
                  <h4 className="font-semibold text-[#2D2D2D]">{t('metaSkills.empathy.title')}</h4>
                  <p className="text-sm text-gray-600">{t('metaSkills.empathy.description')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#D4AF37] text-xl">✓</span>
                <div>
                  <h4 className="font-semibold text-[#2D2D2D]">{t('metaSkills.awareness.title')}</h4>
                  <p className="text-sm text-gray-600">{t('metaSkills.awareness.description')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#D4AF37] text-xl">✓</span>
                <div>
                  <h4 className="font-semibold text-[#2D2D2D]">{t('metaSkills.mindfulness.title')}</h4>
                  <p className="text-sm text-gray-600">{t('metaSkills.mindfulness.description')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#D4AF37] text-xl">✓</span>
                <div>
                  <h4 className="font-semibold text-[#2D2D2D]">{t('metaSkills.resilience.title')}</h4>
                  <p className="text-sm text-gray-600">{t('metaSkills.resilience.description')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#C7826B] text-xl">✓</span>
                <div>
                  <h4 className="font-semibold text-[#2D2D2D]">{t('metaSkills.emotional.title')}</h4>
                  <p className="text-sm text-gray-600">{t('metaSkills.emotional.description')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Approach */}
        <section className="mb-16">
          <h2 className="text-3xl font-serif font-bold text-[#2D2D2D] mb-6">
            {t('approach.title')}
          </h2>
          <div className="space-y-4">
            <Card className="border-[#8DA399] bg-[#8DA399]/5">
              <CardContent className="p-6">
                <h3 className="font-semibold text-[#2D2D2D] mb-2">{t('approach.science.emoji')} {t('approach.science.title')}</h3>
                <p className="text-gray-700">
                  {t('approach.science.description')}
                </p>
              </CardContent>
            </Card>
            <Card className="border-[#D4AF37] bg-[#D4AF37]/5">
              <CardContent className="p-6">
                <h3 className="font-semibold text-[#2D2D2D] mb-2">{t('approach.action.emoji')} {t('approach.action.title')}</h3>
                <p className="text-gray-700">
                  {t('approach.action.description')}
                </p>
              </CardContent>
            </Card>
            <Card className="border-[#C7826B] bg-[#C7826B]/5">
              <CardContent className="p-6">
                <h3 className="font-semibold text-[#2D2D2D] mb-2">{t('approach.progress.emoji')} {t('approach.progress.title')}</h3>
                <p className="text-gray-700">
                  {t('approach.progress.description')}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <Card className="border-[#8DA399] bg-[#8DA399]/5">
            <CardContent className="p-12">
              <h2 className="text-3xl font-serif font-bold text-[#2D2D2D] mb-4">
                {t('cta.title')}
              </h2>
              <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                {t('cta.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#8DA399] hover:bg-[#6B8379] text-white"
                >
                  <Link href="/assessment">
                    {t('cta.assessment')}
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-[#E5E0D8] text-[#2D2D2D] hover:bg-[#F3EFE9]"
                >
                  <Link href="/skills">
                    {t('cta.skills')}
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
