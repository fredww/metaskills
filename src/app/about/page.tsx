import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#8DA399]/10 via-[#D4AF37]/10 to-[#C7826B]/10 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#2D2D2D] mb-6">
            About MetaSkills
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
            Empowering individuals to master the fundamental skills that unlock all other capabilities
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Mission */}
        <section className="mb-16">
          <h2 className="text-3xl font-serif font-bold text-[#2D2D2D] mb-6">
            Our Mission
          </h2>
          <div className="bg-white rounded-3xl p-8 border border-[#E5E0D8]">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              At MetaSkills, we believe that the most valuable skills you can develop are the ones that help you learn everything else. These meta-skills—learning to learn, critical thinking, emotional intelligence, and more—are the foundation of personal and professional growth.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our platform provides personalized assessments, guided practices, and progress tracking to help you master these fundamental capabilities and apply them in every area of your life.
            </p>
          </div>
        </section>

        {/* What We Offer */}
        <section className="mb-16">
          <h2 className="text-3xl font-serif font-bold text-[#2D2D2D] mb-6">
            What We Offer
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-[#E5E0D8] hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="font-semibold text-[#2D2D2D] mb-2">
                  Personalized Assessment
                </h3>
                <p className="text-sm text-gray-600">
                  Discover your current meta-skills profile with our comprehensive assessment
                </p>
              </CardContent>
            </Card>
            <Card className="border-[#E5E0D8] hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="font-semibold text-[#2D2D2D] mb-2">
                  Guided Practices
                </h3>
                <p className="text-sm text-gray-600">
                  Access proven exercises and techniques to develop each meta-skill
                </p>
              </CardContent>
            </Card>
            <Card className="border-[#E5E0D8] hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">📈</div>
                <h3 className="font-semibold text-[#2D2D2D] mb-2">
                  Progress Tracking
                </h3>
                <p className="text-sm text-gray-600">
                  Monitor your growth over time with detailed insights and analytics
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* The 8 Meta-Skills */}
        <section className="mb-16">
          <h2 className="text-3xl font-serif font-bold text-[#2D2D2D] mb-6">
            The 8 Meta-Skills
          </h2>
          <div className="bg-white rounded-3xl p-8 border border-[#E5E0D8]">
            <p className="text-gray-700 mb-6">
              Our platform focuses on eight fundamental meta-skills that form the foundation of personal effectiveness:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <span className="text-[#8DA399] text-xl">✓</span>
                <div>
                  <h4 className="font-semibold text-[#2D2D2D]">Learning to Learn</h4>
                  <p className="text-sm text-gray-600">Acquire new knowledge and skills efficiently</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#8DA399] text-xl">✓</span>
                <div>
                  <h4 className="font-semibold text-[#2D2D2D]">Critical Thinking</h4>
                  <p className="text-sm text-gray-600">Analyze information and make sound judgments</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#C7826B] text-xl">✓</span>
                <div>
                  <h4 className="font-semibold text-[#2D2D2D]">Communication</h4>
                  <p className="text-sm text-gray-600">Exchange ideas effectively and build understanding</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#C7826B] text-xl">✓</span>
                <div>
                  <h4 className="font-semibold text-[#2D2D2D]">Empathy</h4>
                  <p className="text-sm text-gray-600">Understand and share the feelings of others</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#D4AF37] text-xl">✓</span>
                <div>
                  <h4 className="font-semibold text-[#2D2D2D]">Self-Awareness</h4>
                  <p className="text-sm text-gray-600">Understand your own thoughts and behaviors</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#D4AF37] text-xl">✓</span>
                <div>
                  <h4 className="font-semibold text-[#2D2D2D]">Mindfulness</h4>
                  <p className="text-sm text-gray-600">Stay present and focused in the moment</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#D4AF37] text-xl">✓</span>
                <div>
                  <h4 className="font-semibold text-[#2D2D2D]">Resilience</h4>
                  <p className="text-sm text-gray-600">Bounce back from setbacks and challenges</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#C7826B] text-xl">✓</span>
                <div>
                  <h4 className="font-semibold text-[#2D2D2D]">Emotional Intelligence</h4>
                  <p className="text-sm text-gray-600">Recognize and manage emotions effectively</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Approach */}
        <section className="mb-16">
          <h2 className="text-3xl font-serif font-bold text-[#2D2D2D] mb-6">
            Our Approach
          </h2>
          <div className="space-y-4">
            <Card className="border-[#8DA399] bg-[#8DA399]/5">
              <CardContent className="p-6">
                <h3 className="font-semibold text-[#2D2D2D] mb-2">🔬 Science-Based</h3>
                <p className="text-gray-700">
                  Our framework is grounded in psychological research and learning science, ensuring techniques that are proven to work.
                </p>
              </CardContent>
            </Card>
            <Card className="border-[#D4AF37] bg-[#D4AF37]/5">
              <CardContent className="p-6">
                <h3 className="font-semibold text-[#2D2D2D] mb-2">🎯 Action-Oriented</h3>
                <p className="text-gray-700">
                  We focus on practical exercises and real-world applications, not just theory. Every skill comes with actionable practices.
                </p>
              </CardContent>
            </Card>
            <Card className="border-[#C7826B] bg-[#C7826B]/5">
              <CardContent className="p-6">
                <h3 className="font-semibold text-[#2D2D2D] mb-2">📊 Progress-Focused</h3>
                <p className="text-gray-700">
                  Development is a journey, not a destination. We help you track progress and celebrate growth over time.
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
                Start Your Journey Today
              </h2>
              <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                Discover your meta-skills profile and begin your personalized development journey
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#8DA399] hover:bg-[#6B8379] text-white"
                >
                  <Link href="/assessment">
                    Take Assessment
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-[#E5E0D8] text-[#2D2D2D] hover:bg-[#F3EFE9]"
                >
                  <Link href="/skills">
                    Explore Skills
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
