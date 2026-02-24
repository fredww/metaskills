"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Challenge {
  id: string
  title: string
  description: string
  type: string
  targetCount: number
  timeframe: number
  skillCode?: string
  badgeTitle: string
  badgeUrl: string
  isEnrolled: boolean
  enrollment?: any
}

interface ChallengesResponse {
  challenges: Challenge[]
  enrollments: any[]
}

const challengeTypeLabels = {
  READING_CHALLENGE: { label: 'Reading Challenge', icon: '📚', color: 'bg-[#8DA399]/20 text-[#8DA399]' },
  SKILL_MASTERY: { label: 'Skill Mastery', icon: '🎯', color: 'bg-[#D4AF37]/20 text-[#D4AF37]' },
  TOOL_EXPLORATION: { label: 'Tool Exploration', icon: '🛠️', color: 'bg-[#C7826B]/20 text-[#C7826B]' },
  LEARNING_STREAK: { label: 'Learning Streak', icon: '🔥', color: 'bg-purple-100 text-purple-700' }
}

export default function ChallengesPage() {
  const { data: session } = useSession()
  const [data, setData] = useState<ChallengesResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")

  useEffect(() => {
    if (session) {
      fetchChallenges()
    }
  }, [session, selectedType])

  const fetchChallenges = async () => {
    try {
      const url = selectedType === 'all'
        ? '/api/challenges'
        : `/api/challenges?type=${selectedType}`
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        setData(data)
      }
    } catch (error) {
      console.error('Failed to fetch challenges:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEnroll = async (challengeId: string) => {
    if (!session) {
      setMessage("Please sign in to enroll in challenges")
      return
    }

    try {
      const response = await fetch('/api/challenges/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ challengeId })
      })

      const result = await response.json()

      if (!response.ok) {
        setMessage(result.message || "Failed to enroll in challenge")
        return
      }

      setMessage(`Successfully enrolled in ${result.enrollment.challenge.title}! 🎉`)
      fetchChallenges()

      setTimeout(() => setMessage(""), 3000)
    } catch (error) {
      setMessage("An error occurred. Please try again.")
    }
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-serif font-bold text-[#2D2D2D] mb-4">
            Learning Challenges
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Please sign in to view and enroll in challenges
          </p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600">Loading challenges...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#2D2D2D] mb-4">
            Learning Challenges 🏆
          </h1>
          <p className="text-xl text-gray-600">
            Push yourself to the next level with structured learning challenges
          </p>
        </div>

        {/* Message */}
        {message && (
          <Alert className={`mb-8 ${message.includes("Successfully") || message.includes("🎉") ? "border-green-200 bg-green-50" : "border-[#C7826B]/50 bg-[#C7826B]/10"}`}>
            <AlertDescription className={message.includes("Successfully") || message.includes("🎉") ? "text-green-800" : "text-[#C7826B]"}>
              {message}
            </AlertDescription>
          </Alert>
        )}

        {/* Filter Tabs */}
        <div className="flex gap-3 mb-8 overflow-x-auto">
          <button
            onClick={() => setSelectedType('all')}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              selectedType === 'all'
                ? 'bg-[#8DA399] text-white'
                : 'bg-white text-gray-600 hover:bg-[#F3EFE9]'
            }`}
          >
            All Challenges
          </button>
          <button
            onClick={() => setSelectedType('READING_CHALLENGE')}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              selectedType === 'READING_CHALLENGE'
                ? 'bg-[#8DA399] text-white'
                : 'bg-white text-gray-600 hover:bg-[#F3EFE9]'
            }`}
          >
            📚 Reading
          </button>
          <button
            onClick={() => setSelectedType('SKILL_MASTERY')}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              selectedType === 'SKILL_MASTERY'
                ? 'bg-[#8DA399] text-white'
                : 'bg-white text-gray-600 hover:bg-[#F3EFE9]'
            }`}
          >
            🎯 Skill Mastery
          </button>
          <button
            onClick={() => setSelectedType('TOOL_EXPLORATION')}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              selectedType === 'TOOL_EXPLORATION'
                ? 'bg-[#8DA399] text-white'
                : 'bg-white text-gray-600 hover:bg-[#F3EFE9]'
            }`}
          >
            🛠️ Tools
          </button>
          <button
            onClick={() => setSelectedType('LEARNING_STREAK')}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              selectedType === 'LEARNING_STREAK'
                ? 'bg-[#8DA399] text-white'
                : 'bg-white text-gray-600 hover:bg-[#F3EFE9]'
            }`}
          >
            🔥 Streaks
          </button>
        </div>

        {/* My Active Challenges */}
        {data?.enrollments && data.enrollments.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-serif font-bold text-[#2D2D2D] mb-6">
              My Active Challenges
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {data.enrollments.map((enrollment) => (
                <Card key={enrollment.id} className="border-[#8DA399] bg-[#8DA399]/5">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-4xl">{enrollment.challenge.badgeUrl}</span>
                        <div>
                          <h3 className="font-bold text-xl text-[#2D2D2D]">
                            {enrollment.challenge.title}
                          </h3>
                          <span className={`px-2 py-1 rounded text-xs ${challengeTypeLabels[enrollment.challenge.type as keyof typeof challengeTypeLabels].color}`}>
                            {challengeTypeLabels[enrollment.challenge.type as keyof typeof challengeTypeLabels].icon} {challengeTypeLabels[enrollment.challenge.type as keyof typeof challengeTypeLabels].label}
                          </span>
                        </div>
                      </div>
                      {enrollment.completedAt && (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                          ✓ Completed!
                        </span>
                      )}
                    </div>

                    <p className="text-gray-700 mb-4">{enrollment.challenge.description}</p>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium text-[#2D2D2D]">
                          {enrollment.progress}/{enrollment.challenge.targetCount}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-[#8DA399] h-3 rounded-full transition-all"
                          style={{ width: `${enrollment.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>⏱️ {enrollment.challenge.timeframe} days</span>
                      {!enrollment.completedAt && (
                        <span>{enrollment.daysRemaining} days remaining</span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Available Challenges */}
        <div>
          <h2 className="text-3xl font-serif font-bold text-[#2D2D2D] mb-6">
            Available Challenges
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {data?.challenges.map((challenge) => (
              <Card key={challenge.id} className="border-[#E5E0D8] hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{challenge.badgeUrl}</span>
                      <div>
                        <h3 className="font-bold text-xl text-[#2D2D2D] mb-1">
                          {challenge.title}
                        </h3>
                        <span className={`px-2 py-1 rounded text-xs ${challengeTypeLabels[challenge.type as keyof typeof challengeTypeLabels].color}`}>
                          {challengeTypeLabels[challenge.type as keyof typeof challengeTypeLabels].icon} {challengeTypeLabels[challenge.type as keyof typeof challengeTypeLabels].label}
                        </span>
                      </div>
                    </div>
                    {challenge.isEnrolled && (
                      <span className="px-3 py-1 bg-[#8DA399]/20 text-[#8DA399] rounded-full text-sm font-medium">
                        Enrolled
                      </span>
                    )}
                  </div>

                  <p className="text-gray-700 mb-4">{challenge.description}</p>

                  <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                    <span>🎯 {challenge.targetCount} {challenge.type === 'READING_CHALLENGE' ? 'books' : challenge.type === 'LEARNING_STREAK' ? 'days' : 'resources'}</span>
                    <span>⏱️ {challenge.timeframe} days</span>
                    {challenge.badgeTitle && (
                      <span>🏅 {challenge.badgeTitle}</span>
                    )}
                  </div>

                  {!challenge.isEnrolled && (
                    <Button
                      onClick={() => handleEnroll(challenge.id)}
                      className="w-full bg-[#8DA399] hover:bg-[#6B8379] text-white"
                    >
                      Accept Challenge →
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {data?.challenges.length === 0 && (
            <Card className="border-[#E5E0D8]">
              <CardContent className="p-12 text-center text-gray-500">
                No challenges available in this category
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
