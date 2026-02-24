import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// TODO: Replace with database data
const sampleSkills = [
  {
    code: "learning-to-learn",
    title: "Learning to Learn",
    description: "The ability to learn new things quickly and effectively",
    domain: "COGNITIVE" as const,
    stage: 2,
    benefits: ["Faster skill acquisition", "Adaptability", "Growth mindset"]
  },
  {
    code: "critical-thinking",
    title: "Critical Thinking",
    description: "Objective analysis and evaluation to form judgments",
    domain: "COGNITIVE" as const,
    stage: 3,
    benefits: ["Better decisions", "Reduced bias", "Problem-solving"]
  },
  {
    code: "communication",
    title: "Communication",
    description: "Effective exchange of information and feelings",
    domain: "INTERPERSONAL" as const,
    stage: 1,
    benefits: ["Clearer understanding", "Stronger relationships", "Success"]
  },
  {
    code: "empathy",
    title: "Empathy",
    description: "Understand and feel what another person is experiencing",
    domain: "INTERPERSONAL" as const,
    stage: 2,
    benefits: ["Deeper connections", "Reduced conflict", "Collaboration"]
  },
  {
    code: "self-awareness",
    title: "Self-Awareness",
    description: "Conscious knowledge of your character, feelings, motives, and desires",
    domain: "SELF" as const,
    stage: 1,
    benefits: ["Better life choices", "Authentic living", "Emotional regulation"]
  },
  {
    code: "mindfulness",
    title: "Mindfulness",
    description: "Present-moment awareness without judgment",
    domain: "SELF" as const,
    stage: 1,
    benefits: ["Reduced stress", "Improved focus", "Life satisfaction"]
  },
  {
    code: "resilience",
    title: "Resilience",
    description: "Recover quickly from difficulties and adversity",
    domain: "SELF" as const,
    stage: 2,
    benefits: ["Bounce back from setbacks", "Stress tolerance", "Long-term success"]
  },
  {
    code: "emotional-intelligence",
    title: "Emotional Intelligence",
    description: "Recognize and understand emotions in yourself and others",
    domain: "INTERPERSONAL" as const,
    stage: 3,
    benefits: ["Better relationships", "Conflict resolution", "Leadership"]
  }
]

const domainColors = {
  COGNITIVE: "border-[#8DA399] bg-[#8DA399]/5",
  INTERPERSONAL: "border-[#C7826B] bg-[#C7826B]/5",
  SELF: "border-[#D4AF37] bg-[#D4AF37]/5"
}

const stageLabels = {
  1: "Beginner",
  2: "Developing",
  3: "Proficient",
  4: "Advanced",
  5: "Master"
}

export default function SkillsPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#2D2D2D] mb-4">
            Explore Meta-Skills
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the 8 fundamental meta-skills that form the foundation of personal and professional growth
          </p>
        </div>

        {/* Domain Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          <Button variant="outline" className="border-[#E5E0D8] text-[#2D2D2D] hover:bg-[#F3EFE9]">
            All Skills
          </Button>
          <Button variant="outline" className="border-[#8DA399] text-[#8DA399] hover:bg-[#8DA399]/10">
            Cognitive
          </Button>
          <Button variant="outline" className="border-[#C7826B] text-[#C7826B] hover:bg-[#C7826B]/10">
            Interpersonal
          </Button>
          <Button variant="outline" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10">
            Self
          </Button>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sampleSkills.map((skill) => (
            <Card
              key={skill.code}
              className={`border-2 ${domainColors[skill.domain]} hover:shadow-lg transition-all cursor-pointer`}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-serif text-[#2D2D2D]">
                      {skill.title}
                    </CardTitle>
                    <span className="inline-block mt-2 text-xs px-2 py-1 rounded-full bg-white/60 text-gray-700">
                      {skill.domain}
                    </span>
                  </div>
                </div>
                <CardDescription className="text-sm">
                  {skill.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <p className="text-xs text-gray-600 mb-2">Stage: {stageLabels[skill.stage as keyof typeof stageLabels]}</p>
                  <div className="w-full bg-white/60 rounded-full h-2">
                    <div
                      className="bg-[#8DA399] h-2 rounded-full"
                      style={{ width: `${(skill.stage / 5) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="space-y-1 mb-4">
                  <p className="text-xs font-medium text-gray-700">Benefits:</p>
                  {skill.benefits.slice(0, 2).map((benefit, idx) => (
                    <p key={idx} className="text-xs text-gray-600">✓ {benefit}</p>
                  ))}
                </div>
                <Button
                  asChild
                  size="sm"
                  className="w-full bg-[#8DA399] hover:bg-[#6B8379] text-white"
                >
                  <Link href={`/skills/${skill.code}`}>
                    Learn More
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Coming Soon Notice */}
        <Card className="mt-12 border-[#E5E0D8] bg-[#F3EFE9]">
          <CardContent className="p-8 text-center">
            <p className="text-lg text-gray-700 mb-4">
              🚧 More content coming soon! Each skill will have detailed guides, progress tracking, and personalized practice recommendations.
            </p>
            <Button
              asChild
              variant="outline"
              className="border-[#E5E0D8] text-[#2D2D2D] hover:bg-[#F3EFE9]"
            >
              <Link href="/dashboard">Back to Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
