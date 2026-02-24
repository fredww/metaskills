"use client"

import { useState, use, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useSession } from "next-auth/react"
import { getBookRecommendations, getToolRecommendations, BookRecommendation, ToolRecommendation } from "@/lib/skill-resources"
import { trackBookClick, trackToolClick } from "@/lib/resource-tracking"

interface Practice {
  id: string
  title: string
  description: string
  duration: number
  instructions: string[]
  benefits: string[]
  tips: string[]
}

// TODO: Replace with database data
const practicesData: Record<string, Practice> = {
  "1": {
    id: "1",
    title: "Morning Check-In",
    description: "Start each day with 5 minutes of self-awareness practice",
    duration: 5,
    instructions: [
      "Find a quiet space where you won't be disturbed",
      "Sit comfortably and close your eyes",
      "Notice how your body feels - any tension, comfort, sensations",
      "Identify your emotions - name what you're feeling",
      "Set an intention for your day - what do you want to focus on?"
    ],
    benefits: ["Increases self-awareness", "Sets positive tone for the day", "Reduces morning stress"],
    tips: ["Consistency is key", "Don't judge your thoughts", "It's okay if your mind wanders"]
  },
  "2": {
    id: "2",
    title: "Active Listening",
    description: "Listen for 5 minutes without interrupting or planning response",
    duration: 5,
    instructions: [
      "Find a willing partner (friend, colleague, family member)",
      "Set a timer for 5 minutes",
      "One person speaks first about a topic of their choice",
      "The listener only listens - no interrupting, no advice",
      "When the timer goes off, switch roles"
    ],
    benefits: ["Improves relationships", "Enhances empathy", "Reduces misunderstandings"],
    tips: ["Notice when you want to interrupt", "Ask curious questions when it's your turn", "Practice regularly"]
  },
  "3": {
    id: "3",
    title: "Body Scan",
    description: "10-minute systematic awareness of body sensations",
    duration: 10,
    instructions: [
      "Find a comfortable position sitting or lying down",
      "Close your eyes and take three deep breaths",
      "Bring attention to the top of your head",
      "Slowly scan down through your body, noticing sensations",
      "Move to your face, neck, shoulders, arms, chest, back, hips, legs, and feet",
      "Notice any tension, warmth, coolness, or comfort",
      "When complete, take three deep breaths and open your eyes"
    ],
    benefits: ["Reduces physical tension", "Improves body awareness", "Calms the nervous system"],
    tips: ["Don't try to relax - just notice", "It's okay to fall asleep", "Practice daily for best results"]
  },
  "4": {
    id: "4",
    title: "The 5 Whys",
    description: "Ask 'why' five times to find root causes of problems",
    duration: 10,
    instructions: [
      "Identify a problem you're facing",
      "Write it down clearly",
      "Ask why this problem exists and write the answer",
      "Ask why of that answer - dig deeper",
      "Continue asking 'why' five times total",
      "The fifth answer often reveals the root cause"
    ],
    benefits: ["Uncovers root issues", "Prevents surface-level solutions", "Develops analytical thinking"],
    tips: ["Be honest with yourself", "Don't stop at the obvious answer", "Use this for both personal and work problems"]
  },
  "5": {
    id: "5",
    title: "The Feynman Technique",
    description: "Explain a concept simply as if teaching someone else",
    duration: 15,
    instructions: [
      "Choose a concept you want to understand better",
      "Write the concept name at the top of a blank page",
      "Explain it in simple terms as if teaching a beginner",
      "When you get stuck, identify what you don't understand",
      "Go back to the source material to fill the gaps",
      "Simplify your explanation and use analogies"
    ],
    benefits: ["Accelerates learning", "Reveals knowledge gaps", "Improves communication"],
    tips: ["Use simple language", "Include examples", "Test your explanation on a real beginner"]
  },
  "6": {
    id: "6",
    title: "Comfort Zone Stretch",
    description: "Do one small thing that makes you slightly uncomfortable",
    duration: 10,
    instructions: [
      "Identify something that makes you slightly uncomfortable",
      "Choose something small - not dangerous, just uncomfortable",
      "Commit to doing it today",
      "Notice how you feel before, during, and after",
      "After completing, reflect on what you learned about yourself",
      "Celebrate your courage regardless of the outcome"
    ],
    benefits: ["Builds resilience", "Expands comfort zone", "Creates growth", "Reduces fear"],
    tips: ["Start small", "Consistent small stretches work best", "Celebrate attempts, not just success"]
  }
}

const difficultyColors = {
  BEGINNER: "bg-[#8DA399]/20 text-[#8DA399]",
  INTERMEDIATE: "bg-[#D4AF37]/20 text-[#D4AF37]",
  ADVANCED: "bg-[#C7826B]/20 text-[#C7826B]"
}

// Practice to skill mapping (matches the API route)
const PRACTICE_SKILL_MAPPING: Record<string, string> = {
  "1": "self-awareness",
  "2": "communication",
  "3": "mindfulness",
  "4": "critical-thinking",
  "5": "learning-to-learn",
  "6": "resilience"
}

export default function PracticeDetailPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const practice = practicesData[id]
  const session = useSession()
  const [showComplete, setShowComplete] = useState(false)
  const [message, setMessage] = useState("")
  const [completionCount, setCompletionCount] = useState(0)
  const [isLoadingStats, setIsLoadingStats] = useState(true)
  const [showResourceModal, setShowResourceModal] = useState(false)
  const practiceId = id // Store for use in handleMarkComplete

  // Fetch practice stats when component mounts
  useEffect(() => {
    if (session.data?.user && practiceId) {
      fetchPracticeStats()
    }
  }, [session.data, practiceId])

  const fetchPracticeStats = async () => {
    try {
      const response = await fetch(`/api/practices/${practiceId}/stats`)
      if (response.ok) {
        const data = await response.json()
        setCompletionCount(data.completionCount || 0)
      }
    } catch (error) {
      console.error('Failed to fetch practice stats:', error)
    } finally {
      setIsLoadingStats(false)
    }
  }

  if (!practice) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#2D2D2D] mb-4">
            Practice Not Found
          </h1>
          <Button
            onClick={() => window.history.back()}
            className="bg-[#8DA399] hover:bg-[#6B8379] text-white"
          >
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  const handleMarkComplete = async () => {
    if (!session.data) {
      setMessage("Please sign in to track your progress")
      return
    }

    try {
      const response = await fetch('/api/practices/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          practiceId: practiceId,
          rating: null,
          notes: null
        })
      })

      const data = await response.json()

      if (!response.ok) {
        setMessage(data.message || "Failed to mark practice as complete")
        return
      }

      // Refresh stats after completing
      await fetchPracticeStats()

      const newCount = completionCount + 1
      setMessage(`Practice completed! 🎉 You've done this practice ${newCount} time${newCount > 1 ? 's' : ''}.`)
      setShowComplete(true)

      // Show resource recommendation modal after 1.5 seconds
      setTimeout(() => {
        setShowResourceModal(true)
      }, 1500)

      // Reset completion message after 5 seconds
      setTimeout(() => {
        setShowComplete(false)
        setMessage("")
      }, 5000)
    } catch (error) {
      setMessage("An error occurred. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center text-[#8DA399] hover:text-[#6B8379] mb-8"
        >
          ← Back to Practices
        </button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">⏱️</span>
              <span className="text-lg text-gray-600">{practice.duration} minutes</span>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-[#F3EFE9] text-[#2D2D2D]">
                Self-paced
              </span>
            </div>
            {!isLoadingStats && completionCount > 0 && (
              <div className="flex items-center gap-2 px-4 py-2 bg-[#8DA399]/10 rounded-full">
                <span className="text-2xl">✓</span>
                <span className="text-sm font-medium text-[#8DA399]">
                  Completed {completionCount} time{completionCount > 1 ? 's' : ''}
                </span>
              </div>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#2D2D2D] mb-4">
            {practice.title}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            {practice.description}
          </p>
        </div>

        {/* Instructions */}
        <Card className="mb-8 border-[#E5E0D8]">
          <CardHeader>
            <CardTitle className="text-2xl font-serif text-[#2D2D2D]">
              How to Do This Practice
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-4">
              {practice.instructions.map((instruction, idx) => (
                <li key={idx} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#8DA399] text-white flex items-center justify-center font-bold text-sm">
                    {idx + 1}
                  </span>
                  <span className="text-gray-700 pt-1">{instruction}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        {/* Benefits */}
        <Card className="mb-8 border-[#E5E0D8]">
          <CardHeader>
            <CardTitle className="text-2xl font-serif text-[#2D2D2D]">
              Benefits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid md:grid-cols-3 gap-3">
              {practice.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#8DA399]">✓</span>
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card className="mb-8 border-[#E5E0D8]">
          <CardHeader>
            <CardTitle className="text-2xl font-serif text-[#2D2D2D]">
              Tips for Success
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {practice.tips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#D4AF37]">💡</span>
                  <span className="text-gray-700">{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Message */}
        {message && (
          <Alert className={`mb-8 ${message.includes("complete") ? "border-green-200 bg-green-50" : "border-[#C7826B]/50 bg-[#C7826B]/10"}`}>
            <AlertDescription className={message.includes("complete") ? "text-green-800" : "text-[#C7826B]"}>
              {message}
            </AlertDescription>
          </Alert>
        )}

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={handleMarkComplete}
            size="lg"
            disabled={showComplete}
            className="flex-1 bg-[#8DA399] hover:bg-[#6B8379] text-white"
          >
            {showComplete
              ? "✓ Complete!"
              : completionCount > 0
                ? `Practice Again (${completionCount + 1})`
                : "Mark as Complete"
            }
          </Button>
          <Button
            onClick={() => window.history.back()}
            variant="outline"
            size="lg"
            className="border-[#E5E0D8] text-[#2D2D2D] hover:bg-[#F3EFE9]"
          >
            Browse More Practices
          </Button>
        </div>

        {/* Resource Recommendation Modal */}
        <Dialog open={showResourceModal} onOpenChange={setShowResourceModal}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-serif font-bold text-[#2D2D2D]">
                🎉 Continue Your Learning Journey
              </DialogTitle>
              <DialogDescription className="text-base text-gray-600">
                Great job completing {practice?.title}! Here are some resources to help you deepen your {PRACTICE_SKILL_MAPPING[practiceId]?.replace('-', ' ')} skills.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Book Recommendations */}
              {getBookRecommendations(PRACTICE_SKILL_MAPPING[practiceId] || '').slice(0, 2).map((book, idx) => (
                <div key={idx} className="border border-[#E5E0D8] rounded-lg p-4 bg-white">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-28 bg-gradient-to-br from-[#8DA399] to-[#6B8379] rounded flex items-center justify-center text-white text-2xl">
                        📖
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-[#2D2D2D] mb-1">{book.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
                      <p className="text-sm text-gray-700 mb-3 line-clamp-2">{book.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            book.difficulty === 'Beginner' ? 'bg-[#8DA399]/20 text-[#8DA399]' :
                            book.difficulty === 'Intermediate' ? 'bg-[#D4AF37]/20 text-[#D4AF37]' :
                            'bg-[#C7826B]/20 text-[#C7826B]'
                          }`}>
                            {book.difficulty}
                          </span>
                          {book.rating && (
                            <span className="text-sm text-[#D4AF37]">⭐ {book.rating}</span>
                          )}
                        </div>
                        <Button
                          asChild
                          size="sm"
                          variant="outline"
                          className="border-[#8DA399] text-[#8DA399] hover:bg-[#8DA399]/10"
                        >
                          <a
                            href={book.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => {
                              const skillCode = PRACTICE_SKILL_MAPPING[practiceId]
                              trackBookClick(book.title, book.url, skillCode, 'PRACTICE_MODAL', { practiceId })
                            }}
                          >
                            View Book →
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Tool Recommendations */}
              {getToolRecommendations(PRACTICE_SKILL_MAPPING[practiceId] || '').slice(0, 1).map((tool, idx) => (
                <div key={idx} className="border border-[#E5E0D8] rounded-lg p-4 bg-white">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-bold text-[#2D2D2D]">{tool.name}</h4>
                        <span className="px-2 py-1 bg-[#F3EFE9] text-[#2D2D2D] rounded text-xs">
                          {tool.type}
                        </span>
                        <span className="px-2 py-1 bg-[#8DA399]/20 text-[#8DA399] rounded text-xs">
                          {tool.pricing}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{tool.description}</p>
                      <p className="text-xs text-gray-600">{tool.whyRecommended}</p>
                    </div>
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="border-[#8DA399] text-[#8DA399] hover:bg-[#8DA399]/10 ml-4"
                    >
                      <a
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                          const skillCode = PRACTICE_SKILL_MAPPING[practiceId]
                          trackToolClick(tool.name, tool.url, skillCode, 'PRACTICE_MODAL', { practiceId })
                        }}
                      >
                        Try Tool →
                      </a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <DialogFooter className="flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                onClick={() => setShowResourceModal(false)}
                className="flex-1 border-[#E5E0D8] text-[#2D2D2D] hover:bg-[#F3EFE9]"
              >
                View Later
              </Button>
              <Button
                asChild
                onClick={() => setShowResourceModal(false)}
                className="flex-1 bg-[#8DA399] hover:bg-[#6B8379] text-white"
              >
                <Link href={`/skills/${PRACTICE_SKILL_MAPPING[practiceId]}`}>
                  Explore This Skill →
                </Link>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
