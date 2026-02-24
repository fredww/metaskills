"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { calculateAssessmentResults, type AssessmentResult } from "@/lib/assessment-calculator"
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend
} from "recharts"

export default function AssessmentResultsPage() {
  const router = useRouter()
  const [result, setResult] = useState<AssessmentResult | null>(null)

  useEffect(() => {
    const saveResult = async () => {
      const answersJson = sessionStorage.getItem("assessmentAnswers")
      if (!answersJson) {
        router.push("/assessment")
        return
      }

      const answers = JSON.parse(answersJson)
      const calculatedResult = calculateAssessmentResults(answers)
      setResult(calculatedResult)

      // Save to database
      try {
        await fetch('/api/assessments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ result: calculatedResult })
        })
      } catch (error) {
        console.error('Failed to save assessment:', error)
      }
    }

    saveResult()
  }, [router])

  if (!result) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <p className="text-gray-600">Loading results...</p>
      </div>
    )
  }

  const radarData = [
    { subject: "Cognitive", value: result.domains.cognitive, fullMark: 5 },
    { subject: "Interpersonal", value: result.domains.interpersonal, fullMark: 5 },
    { subject: "Self", value: result.domains.self, fullMark: 5 }
  ]

  const stageColors = {
    Beginner: "bg-[#C7826B]/20 text-[#C7826B]",
    Developing: "bg-[#D4AF37]/20 text-[#D4AF37]",
    Proficient: "bg-[#8DA399]/20 text-[#8DA399]",
    Advanced: "bg-[#6B8379]/20 text-[#6B8379]"
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#2D2D2D] mb-4">
            Your Meta-Skills Profile
          </h1>
          <p className="text-xl text-gray-600">
            Here's a comprehensive view of your current capabilities
          </p>
        </div>

        {/* Overall Score and Stage */}
        <Card className="mb-8 border-[#E5E0D8]">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center justify-around gap-8">
              <div className="text-center">
                <p className="text-gray-600 mb-2">Overall Score</p>
                <div className="text-6xl font-bold text-[#8DA399]">
                  {(result.overall * 2).toFixed(1)}
                  <span className="text-2xl text-gray-500">/10</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-gray-600 mb-2">Development Stage</p>
                <div className={`inline-block px-6 py-3 rounded-full text-xl font-semibold ${stageColors[result.stage as keyof typeof stageColors]}`}>
                  {result.stage}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Radar Chart */}
        <Card className="mb-8 border-[#E5E0D8]">
          <CardHeader>
            <CardTitle className="text-2xl font-serif text-[#2D2D2D] text-center">
              Domain Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#E5E0D8" />
                <PolarAngleAxis dataKey="subject" className="text-[#2D2D2D]" />
                <PolarRadiusAxis angle={90} domain={[0, 5]} className="text-gray-500" />
                <Radar
                  name="Your Score"
                  dataKey="value"
                  stroke="#8DA399"
                  fill="#8DA399"
                  fillOpacity={0.6}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Domain Breakdown */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-[#E5E0D8]">
            <CardHeader>
              <CardTitle className="text-lg font-serif text-[#2D2D2D]">
                Cognitive
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-[#8DA399] mb-4">
                {result.domains.cognitive.toFixed(1)}
              </div>
              <p className="text-sm text-gray-600">
                Learning, critical thinking, and problem-solving abilities
              </p>
            </CardContent>
          </Card>

          <Card className="border-[#E5E0D8]">
            <CardHeader>
              <CardTitle className="text-lg font-serif text-[#2D2D2D]">
                Interpersonal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-[#C7826B] mb-4">
                {result.domains.interpersonal.toFixed(1)}
              </div>
              <p className="text-sm text-gray-600">
                Communication, empathy, and relationship skills
              </p>
            </CardContent>
          </Card>

          <Card className="border-[#E5E0D8]">
            <CardHeader>
              <CardTitle className="text-lg font-serif text-[#2D2D2D]">
                Self
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-[#D4AF37] mb-4">
                {result.domains.self.toFixed(1)}
              </div>
              <p className="text-sm text-gray-600">
                Self-awareness, mindfulness, and resilience
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Top Skills */}
        <Card className="mb-8 border-[#E5E0D8]">
          <CardHeader>
            <CardTitle className="text-xl font-serif text-[#2D2D2D]">
              Your Strength Areas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(result.skills)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 5)
                .map(([skill, score]) => (
                  <div key={skill} className="flex items-center justify-between">
                    <span className="text-[#2D2D2D] font-medium">{skill}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-48 bg-[#E5E0D8] rounded-full h-2">
                        <div
                          className="bg-[#8DA399] h-2 rounded-full"
                          style={{ width: `${(score / 5) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-600 w-12 text-right">
                        {score.toFixed(1)}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Growth Vectors */}
        <Card className="mb-8 border-[#E5E0D8]">
          <CardHeader>
            <CardTitle className="text-xl font-serif text-[#2D2D2D]">
              4D Growth Vectors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-[#2D2D2D]">Awareness</span>
                  <span className="text-[#8DA399] font-semibold">
                    {result.vectors.awareness.toFixed(1)}
                  </span>
                </div>
                <div className="w-full bg-[#E5E0D8] rounded-full h-2">
                  <div
                    className="bg-[#8DA399] h-2 rounded-full"
                    style={{ width: `${(result.vectors.awareness / 5) * 100}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-[#2D2D2D]">Stability</span>
                  <span className="text-[#C7826B] font-semibold">
                    {result.vectors.stability.toFixed(1)}
                  </span>
                </div>
                <div className="w-full bg-[#E5E0D8] rounded-full h-2">
                  <div
                    className="bg-[#C7826B] h-2 rounded-full"
                    style={{ width: `${(result.vectors.stability / 5) * 100}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-[#2D2D2D]">Practice</span>
                  <span className="text-[#D4AF37] font-semibold">
                    {result.vectors.practice.toFixed(1)}
                  </span>
                </div>
                <div className="w-full bg-[#E5E0D8] rounded-full h-2">
                  <div
                    className="bg-[#D4AF37] h-2 rounded-full"
                    style={{ width: `${(result.vectors.practice / 5) * 100}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-[#2D2D2D]">Growth</span>
                  <span className="text-[#8DA399] font-semibold">
                    {result.vectors.growth.toFixed(1)}
                  </span>
                </div>
                <div className="w-full bg-[#E5E0D8] rounded-full h-2">
                  <div
                    className="bg-[#8DA399] h-2 rounded-full"
                    style={{ width: `${(result.vectors.growth / 5) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            asChild
            size="lg"
            className="flex-1 bg-[#8DA399] hover:bg-[#6B8379] text-white"
          >
            <a href="/practices">Browse Practices</a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="flex-1 border-[#E5E0D8] text-[#2D2D2D] hover:bg-[#F3EFE9]"
          >
            <a href="/dashboard">Back to Dashboard</a>
          </Button>
          <Button
            onClick={() => {
              sessionStorage.removeItem("assessmentAnswers")
              router.push("/assessment")
            }}
            variant="outline"
            size="lg"
            className="flex-1 border-[#E5E0D8] text-[#2D2D2D] hover:bg-[#F3EFE9]"
          >
            Retake Assessment
          </Button>
        </div>
      </div>
    </div>
  )
}
