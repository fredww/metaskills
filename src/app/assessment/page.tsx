import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AssessmentWelcomePage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Card className="border-[#E5E0D8]">
          <CardHeader className="space-y-4 text-center pb-8">
            <div className="text-6xl mb-4">🧭</div>
            <CardTitle className="text-4xl font-serif text-[#2D2D2D]">
              Discover Your Meta-Skills Profile
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Take our comprehensive assessment to uncover your unique capability landscape
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
                    24 Thoughtful Questions
                  </h3>
                  <p className="text-gray-600">
                    Carefully designed questions exploring your cognitive, interpersonal, and self-development skills
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#C7826B]/20 flex items-center justify-center text-2xl">
                  ⏱️
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#2D2D2D] mb-2">
                    Takes 10-15 Minutes
                  </h3>
                  <p className="text-gray-600">
                    Complete at your own pace with our intuitive single-question flow
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-2xl">
                  📊
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#2D2D2D] mb-2">
                    Personalized Results Map
                  </h3>
                  <p className="text-gray-600">
                    Get a detailed visualization of your capabilities across 8 meta-skills domains
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#8DA399]/20 flex items-center justify-center text-2xl">
                  💡
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#2D2D2D] mb-2">
                    Tailored Practice Recommendations
                  </h3>
                  <p className="text-gray-600">
                    Receive personalized practice suggestions based on your unique profile
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#F3EFE9] rounded-2xl p-6 border border-[#E5E0D8]">
              <h4 className="font-semibold text-[#2D2D2D] mb-3">What You'll Discover:</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="text-[#8DA399]">✓</span>
                  Your cognitive capability levels (Learning, Critical Thinking)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#8DA399]">✓</span>
                  Interpersonal skills strengths (Communication, Empathy)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#8DA399]">✓</span>
                  Self-development areas (Self-Awareness, Mindfulness, Resilience)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#8DA399]">✓</span>
                  Your current development stage (Beginner → Master)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#8DA399]">✓</span>
                  Growth vectors showing your focus areas
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
                  Start Assessment
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="flex-1 border-[#E5E0D8] text-[#2D2D2D] hover:bg-[#F3EFE9] text-lg py-6"
              >
                <Link href="/dashboard">
                  Back to Dashboard
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
