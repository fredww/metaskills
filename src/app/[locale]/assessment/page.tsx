import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getTranslations } from 'next-intl/server'

export default async function AssessmentWelcomePage() {
  const t = await getTranslations('assessment.welcome')

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Card className="border-[#E5E0D8]">
          <CardHeader className="space-y-4 text-center pb-8">
            <div className="text-6xl mb-4">🧭</div>
            <CardTitle className="text-4xl font-serif text-[#2D2D2D]">
              {t('title')}
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              {t('subtitle')}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#8DA399]/20 flex items-center justify-center text-2xl">
                  📝
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#2D2D2D] mb-2">
                    {t('features.questions.title')}
                  </h3>
                  <p className="text-gray-600">
                    {t('features.questions.description')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#C7826B]/20 flex items-center justify-center text-2xl">
                  ⏱️
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#2D2D2D] mb-2">
                    {t('features.duration.title')}
                  </h3>
                  <p className="text-gray-600">
                    {t('features.duration.description')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-2xl">
                  📊
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#2D2D2D] mb-2">
                    {t('features.results.title')}
                  </h3>
                  <p className="text-gray-600">
                    {t('features.results.description')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#8DA399]/20 flex items-center justify-center text-2xl">
                  💡
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#2D2D2D] mb-2">
                    {t('features.recommendations.title')}
                  </h3>
                  <p className="text-gray-600">
                    {t('features.recommendations.description')}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#F3EFE9] rounded-2xl p-6 border border-[#E5E0D8]">
              <h4 className="font-semibold text-[#2D2D2D] mb-3">{t('discover.title')}</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="text-[#8DA399]">✓</span>
                  {t('discover.cognitive')}
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#8DA399]">✓</span>
                  {t('discover.interpersonal')}
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#8DA399]">✓</span>
                  {t('discover.self')}
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#8DA399]">✓</span>
                  {t('discover.stage')}
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#8DA399]">✓</span>
                  {t('discover.growth')}
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                asChild
                size="lg"
                className="flex-1 bg-[#8DA399] hover:bg-[#6B8379] text-white text-lg py-6"
              >
                <Link href="/assessment/flow">
                  {t('start')}
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="flex-1 border-[#E5E0D8] text-[#2D2D2D] hover:bg-[#F3EFE9] text-lg py-6"
              >
                <Link href="/dashboard">
                  {t('backToDashboard')}
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
