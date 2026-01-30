export interface AssessmentResult {
  overall: number
  domains: {
    cognitive: number
    interpersonal: number
    self: number
  }
  skills: Record<string, number>
  stage: string
  vectors: {
    awareness: number
    stability: number
    practice: number
    growth: number
  }
}

function calculateScore(answers: Record<string, string | number>, questionIds: string[]): number {
  let total = 0
  let count = 0

  questionIds.forEach(id => {
    const answer = answers[id]
    if (typeof answer === "number") {
      total += answer
      count++
    } else if (typeof answer === "string") {
      // Convert text answers to scores (first option = lowest, last = highest)
      const question = assessmentQuestions.find(q => q.id === id)
      if (question && question.options) {
        const index = question.options.indexOf(answer)
        if (index >= 0) {
          total += ((index + 1) / question.options.length) * 5
          count++
        }
      }
    }
  })

  return count > 0 ? Math.round((total / count) * 20) / 20 : 0
}

export function calculateAssessmentResults(answers: Record<string, string | number>): AssessmentResult {
  // Calculate domain scores
  const cognitiveQuestions = assessmentQuestions
    .filter(q => q.domain === "COGNITIVE")
    .map(q => q.id)
  const interpersonalQuestions = assessmentQuestions
    .filter(q => q.domain === "INTERPERSONAL")
    .map(q => q.id)
  const selfQuestions = assessmentQuestions
    .filter(q => q.domain === "SELF")
    .map(q => q.id)

  const cognitive = calculateScore(answers, cognitiveQuestions)
  const interpersonal = calculateScore(answers, interpersonalQuestions)
  const self = calculateScore(answers, selfQuestions)

  // Calculate overall score
  const overall = Math.round(((cognitive + interpersonal + self) / 3) * 20) / 20

  // Calculate individual skill scores
  const skills: Record<string, number> = {}
  const skillGroups = assessmentQuestions.reduce((acc, q) => {
    if (!acc[q.skill]) acc[q.skill] = []
    acc[q.skill].push(q.id)
    return acc
  }, {} as Record<string, string[]>)

  Object.entries(skillGroups).forEach(([skill, questionIds]) => {
    skills[skill] = calculateScore(answers, questionIds)
  })

  // Determine development stage
  let stage = "Beginner"
  if (overall >= 4) stage = "Advanced"
  else if (overall >= 3) stage = "Proficient"
  else if (overall >= 2) stage = "Developing"

  // Calculate 4D vectors (simplified model)
  const vectors = {
    awareness: Math.min(5, self * 1.2), // Based on self-awareness
    stability: Math.min(5, (cognitive + self) / 2 * 1.1), // Balance of cognitive and self
    practice: Math.min(5, interpersonal * 1.15), // Based on interpersonal application
    growth: Math.min(5, overall * 1.1) // Overall growth potential
  }

  return {
    overall,
    domains: {
      cognitive: Math.round(cognitive * 20) / 20,
      interpersonal: Math.round(interpersonal * 20) / 20,
      self: Math.round(self * 20) / 20
    },
    skills: Object.fromEntries(
      Object.entries(skills).map(([k, v]) => [k, Math.round(v * 20) / 20])
    ),
    stage,
    vectors: {
      awareness: Math.round(vectors.awareness * 20) / 20,
      stability: Math.round(vectors.stability * 20) / 20,
      practice: Math.round(vectors.practice * 20) / 20,
      growth: Math.round(vectors.growth * 20) / 20
    }
  }
}

const assessmentQuestions = [
  { id: "q1", domain: "COGNITIVE", skill: "Learning to Learn", options: ["I dive in immediately and learn by doing", "I research thoroughly first, then practice", "I seek structured courses or guidance", "I break it down into small, manageable steps"] },
  { id: "q2", domain: "COGNITIVE", skill: "Learning to Learn" },
  { id: "q3", domain: "COGNITIVE", skill: "Learning to Learn", options: ["I keep trying until it makes sense", "I look for different explanations or resources", "I connect it to things I already know", "I ask someone to explain it to me"] },
  { id: "q4", domain: "COGNITIVE", skill: "Critical Thinking", options: ["I trust my gut instinct", "I break it down into smaller parts", "I gather data and analyze systematically", "I consider multiple perspectives first"] },
  { id: "q5", domain: "COGNITIVE", skill: "Critical Thinking" },
  { id: "q6", domain: "COGNITIVE", skill: "Critical Thinking", options: ["I go with what feels most accurate", "I evaluate the credibility of sources", "I look for supporting evidence", "I seek out expert opinions"] },
  { id: "q7", domain: "INTERPERSONAL", skill: "Communication" },
  { id: "q8", domain: "INTERPERSONAL", skill: "Communication", options: ["I explain it in detail", "I use examples and analogies", "I check for understanding regularly", "I adapt my style to the listener"] },
  { id: "q9", domain: "INTERPERSONAL", skill: "Communication" },
  { id: "q10", domain: "INTERPERSONAL", skill: "Empathy", options: ["I offer solutions immediately", "I acknowledge their feelings first", "I ask how I can help", "I share a similar experience I've had"] },
  { id: "q11", domain: "INTERPERSONAL", skill: "Empathy" },
  { id: "q12", domain: "INTERPERSONAL", skill: "Empathy", options: ["I state my position clearly", "I try to understand their perspective first", "I look for common ground", "I postpone the discussion if emotions are high"] },
  { id: "q13", domain: "SELF", skill: "Self-Awareness" },
  { id: "q14", domain: "SELF", skill: "Self-Awareness", options: ["I feel defensive or embarrassed", "I acknowledge it and move on", "I reflect on what I can learn", "I seek feedback to improve"] },
  { id: "q15", domain: "SELF", skill: "Self-Awareness" },
  { id: "q16", domain: "SELF", skill: "Mindfulness" },
  { id: "q17", domain: "SELF", skill: "Mindfulness", options: ["Taking action to address the stressor", "Talking to someone about it", "Physical activity or exercise", "Quiet reflection or meditation"] },
  { id: "q18", domain: "SELF", skill: "Mindfulness" },
  { id: "q19", domain: "SELF", skill: "Resilience" },
  { id: "q20", domain: "SELF", skill: "Resilience", options: ["I dwell on what went wrong", "I need time before trying again", "I see it as a learning opportunity", "I'm motivated to prove I can do it"] },
  { id: "q21", domain: "SELF", skill: "Resilience" },
  { id: "q22", domain: "COGNITIVE", skill: "Learning to Learn" },
  { id: "q23", domain: "SELF", skill: "Self-Awareness", options: ["I set goals but struggle to follow through", "I take it day by day without formal goals", "I set specific goals and track progress", "I adjust my goals based on circumstances"] },
  { id: "q24", domain: "SELF", skill: "Resilience" }
]
