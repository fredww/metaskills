"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { assessmentQuestions } from "@/lib/assessment-questions"

export default function AssessmentFlowPage() {
  const router = useRouter()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string | number>>({})

  const currentQuestion = assessmentQuestions[currentQuestionIndex]
  const progress = ((currentQuestionIndex) / assessmentQuestions.length) * 100
  const isLastQuestion = currentQuestionIndex === assessmentQuestions.length - 1

  const handleAnswer = (answer: string | number) => {
    const newAnswers = { ...answers, [currentQuestion.id]: answer }
    setAnswers(newAnswers)

    if (isLastQuestion) {
      // Store answers in session storage for results page
      sessionStorage.setItem("assessmentAnswers", JSON.stringify(newAnswers))
      router.push("/assessment/results")
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    } else {
      router.push("/assessment")
    }
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Question {currentQuestionIndex + 1} of {assessmentQuestions.length}
            </span>
            <span className="text-sm font-medium text-[#8DA399]">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full bg-[#E5E0D8] rounded-full h-2">
            <div
              className="bg-[#8DA399] h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <Card className="border-[#E5E0D8]">
          <CardContent className="p-8">
            {/* Domain Badge */}
            <div className="mb-6">
              <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-[#F3EFE9] text-[#2D2D2D]">
                {currentQuestion.domain}
              </span>
            </div>

            {/* Question */}
            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-[#2D2D2D] mb-8">
              {currentQuestion.text}
            </h2>

            {/* Answer Options */}
            <div className="space-y-3">
              {currentQuestion.type === "rating" ? (
                <div className="flex justify-between items-center gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => handleAnswer(rating)}
                      className="flex-1 py-4 px-2 rounded-xl border-2 border-[#E5E0D8] hover:border-[#8DA399] hover:bg-[#8DA399]/10 transition-all text-lg font-medium text-[#2D2D2D]"
                    >
                      {rating}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {currentQuestion.options?.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option)}
                      className="w-full text-left p-4 rounded-xl border-2 border-[#E5E0D8] hover:border-[#8DA399] hover:bg-[#8DA399]/10 transition-all text-[#2D2D2D]"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t border-[#E5E0D8]">
              <Button
                onClick={handleBack}
                variant="outline"
                className="border-[#E5E0D8] text-[#2D2D2D] hover:bg-[#F3EFE9]"
              >
                ← Back
              </Button>
              <Button
                onClick={() => {
                  // Skip this question
                  if (isLastQuestion) {
                    sessionStorage.setItem("assessmentAnswers", JSON.stringify(answers))
                    router.push("/assessment/results")
                  } else {
                    setCurrentQuestionIndex(currentQuestionIndex + 1)
                  }
                }}
                variant="ghost"
                className="text-gray-500 hover:text-gray-700"
              >
                Skip →
              </Button>
            </div>

            {/* Rating Scale Hint */}
            {currentQuestion.type === "rating" && (
              <div className="mt-6 p-4 bg-[#F3EFE9] rounded-lg">
                <p className="text-sm text-gray-600 text-center">
                  <strong>1</strong> = Not at all like me &nbsp;&nbsp;&nbsp;
                  <strong>5</strong> = Very much like me
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
