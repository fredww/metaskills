import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// TODO: Replace with database data
const samplePractices = [
  {
    id: "1",
    title: "Morning Check-In",
    description: "Start each day with 5 minutes of self-awareness practice",
    duration: 5,
    difficulty: "BEGINNER" as const,
    emotion: "CALM" as const,
    skillName: "Self-Awareness"
  },
  {
    id: "2",
    title: "Active Listening",
    description: "Listen for 5 minutes without interrupting or planning your response",
    duration: 5,
    difficulty: "BEGINNER" as const,
    emotion: "CALM" as const,
    skillName: "Communication"
  },
  {
    id: "3",
    title: "Body Scan",
    description: "10-minute systematic awareness of body sensations",
    duration: 10,
    difficulty: "BEGINNER" as const,
    emotion: "CALM" as const,
    skillName: "Mindfulness"
  },
  {
    id: "4",
    title: "The 5 Whys",
    description: "Ask 'why' five times to find root causes of problems",
    duration: 10,
    difficulty: "INTERMEDIATE" as const,
    emotion: "REFLECTIVE" as const,
    skillName: "Critical Thinking"
  },
  {
    id: "5",
    title: "The Feynman Technique",
    description: "Explain a concept simply as if teaching someone else",
    duration: 15,
    difficulty: "INTERMEDIATE" as const,
    emotion: "CURIOUS" as const,
    skillName: "Learning to Learn"
  },
  {
    id: "6",
    title: "Comfort Zone Stretch",
    description: "Do one small thing that makes you slightly uncomfortable",
    duration: 10,
    difficulty: "INTERMEDIATE" as const,
    emotion: "COURAGEOUS" as const,
    skillName: "Resilience"
  }
]

const difficultyColors = {
  BEGINNER: "bg-[#8DA399]/20 text-[#8DA399]",
  INTERMEDIATE: "bg-[#D4AF37]/20 text-[#D4AF37]",
  ADVANCED: "bg-[#C7826B]/20 text-[#C7826B]"
}

export default function PracticesPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#2D2D2D] mb-4">
            Practice Library
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Evidence-based exercises to develop your meta-skills. Each practice is designed to fit into your daily routine.
          </p>
        </div>

        {/* Practice Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {samplePractices.map((practice) => (
            <Card key={practice.id} className="border-[#E5E0D8] hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <CardTitle className="text-xl font-serif text-[#2D2D2D] mb-1">
                      {practice.title}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {practice.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm text-gray-600">
                    ⏱️ {practice.duration} min
                  </span>
                  <span className="text-sm text-gray-600">
                    •
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${difficultyColors[practice.difficulty]}`}>
                    {practice.difficulty}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#8DA399] font-medium">
                    {practice.skillName}
                  </span>
                  <Button
                    asChild
                    size="sm"
                    className="bg-[#8DA399] hover:bg-[#6B8379] text-white"
                  >
                    <Link href={`/practices/${practice.id}`}>
                      Start Practice
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Coming Soon Notice */}
        <Card className="mt-12 border-[#E5E0D8] bg-[#F3EFE9]">
          <CardContent className="p-8 text-center">
            <p className="text-lg text-gray-700 mb-4">
              🚧 More practices coming soon! We're building a comprehensive library with 50+ practices across all meta-skills.
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
