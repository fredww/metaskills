export interface Question {
  id: string
  text: string
  skill: string
  type: "rating" | "choice"
  domain: "COGNITIVE" | "INTERPERSONAL" | "SELF"
  options?: string[]
}

export const questionTemplates: Omit<Question, 'text' | 'options'>[] = [
  // Cognitive Domain - Learning to Learn
  {
    id: "q1",
    skill: "Learning to Learn",
    type: "choice",
    domain: "COGNITIVE"
  },
  {
    id: "q2",
    skill: "Learning to Learn",
    type: "rating",
    domain: "COGNITIVE"
  },
  {
    id: "q3",
    skill: "Learning to Learn",
    type: "choice",
    domain: "COGNITIVE"
  },

  // Cognitive Domain - Critical Thinking
  {
    id: "q4",
    skill: "Critical Thinking",
    type: "choice",
    domain: "COGNITIVE"
  },
  {
    id: "q5",
    skill: "Critical Thinking",
    type: "rating",
    domain: "COGNITIVE"
  },
  {
    id: "q6",
    skill: "Critical Thinking",
    type: "choice",
    domain: "COGNITIVE"
  },

  // Interpersonal Domain - Communication
  {
    id: "q7",
    skill: "Communication",
    type: "rating",
    domain: "INTERPERSONAL"
  },
  {
    id: "q8",
    skill: "Communication",
    type: "choice",
    domain: "INTERPERSONAL"
  },
  {
    id: "q9",
    skill: "Communication",
    type: "rating",
    domain: "INTERPERSONAL"
  },

  // Interpersonal Domain - Empathy
  {
    id: "q10",
    skill: "Empathy",
    type: "choice",
    domain: "INTERPERSONAL"
  },
  {
    id: "q11",
    skill: "Empathy",
    type: "rating",
    domain: "INTERPERSONAL"
  },
  {
    id: "q12",
    skill: "Empathy",
    type: "choice",
    domain: "INTERPERSONAL"
  },

  // Self Domain - Self-Awareness
  {
    id: "q13",
    skill: "Self-Awareness",
    type: "rating",
    domain: "SELF"
  },
  {
    id: "q14",
    skill: "Self-Awareness",
    type: "choice",
    domain: "SELF"
  },
  {
    id: "q15",
    skill: "Self-Awareness",
    type: "rating",
    domain: "SELF"
  },

  // Self Domain - Mindfulness
  {
    id: "q16",
    skill: "Mindfulness",
    type: "rating",
    domain: "SELF"
  },
  {
    id: "q17",
    skill: "Mindfulness",
    type: "choice",
    domain: "SELF"
  },
  {
    id: "q18",
    skill: "Mindfulness",
    type: "rating",
    domain: "SELF"
  },

  // Self Domain - Resilience
  {
    id: "q19",
    skill: "Resilience",
    type: "rating",
    domain: "SELF"
  },
  {
    id: "q20",
    skill: "Resilience",
    type: "choice",
    domain: "SELF"
  },
  {
    id: "q21",
    skill: "Resilience",
    type: "rating",
    domain: "SELF"
  },

  // Cross-cutting questions
  {
    id: "q22",
    skill: "Learning to Learn",
    type: "rating",
    domain: "COGNITIVE"
  },
  {
    id: "q23",
    skill: "Self-Awareness",
    type: "choice",
    domain: "SELF"
  },
  {
    id: "q24",
    skill: "Resilience",
    type: "rating",
    domain: "SELF"
  }
]

// Keep the old export for backward compatibility (defaults to English)
export const assessmentQuestions: Question[] = questionTemplates.map((template) => {
  // Default to English text if no translations available
  const defaultTranslations: Record<string, { text: string; options?: string[] }> = {
    "q1": {
      text: "When you need to learn something new, how do you typically approach it?",
      options: [
        "I dive in immediately and learn by doing",
        "I research thoroughly first, then practice",
        "I seek structured courses or guidance",
        "I break it down into small, manageable steps"
      ]
    },
    "q2": { text: "How quickly do you adapt to new information or changing circumstances?" },
    "q3": {
      text: "When you encounter a concept you don't understand, what do you do?",
      options: [
        "I keep trying until it makes sense",
        "I look for different explanations or resources",
        "I connect it to things I already know",
        "I ask someone to explain it to me"
      ]
    },
    "q4": {
      text: "When faced with a complex problem, how do you approach it?",
      options: [
        "I trust my gut instinct",
        "I break it down into smaller parts",
        "I gather data and analyze systematically",
        "I consider multiple perspectives first"
      ]
    },
    "q5": { text: "How often do you question your own assumptions and beliefs?" },
    "q6": {
      text: "When presented with conflicting information, how do you decide what to believe?",
      options: [
        "I go with what feels most accurate",
        "I evaluate the credibility of sources",
        "I look for supporting evidence",
        "I seek out expert opinions"
      ]
    },
    "q7": { text: "How comfortable are you expressing your ideas to others?" },
    "q8": {
      text: "When communicating important information, how do you ensure it's understood?",
      options: [
        "I explain it in detail",
        "I use examples and analogies",
        "I check for understanding regularly",
        "I adapt my style to the listener"
      ]
    },
    "q9": { text: "How well do you listen to others during conversations?" },
    "q10": {
      text: "When someone shares a problem with you, what's your first response?",
      options: [
        "I offer solutions immediately",
        "I acknowledge their feelings first",
        "I ask how I can help",
        "I share a similar experience I've had"
      ]
    },
    "q11": { text: "How accurately can you perceive how others are feeling?" },
    "q12": {
      text: "When you disagree with someone, how do you typically respond?",
      options: [
        "I state my position clearly",
        "I try to understand their perspective first",
        "I look for common ground",
        "I postpone the discussion if emotions are high"
      ]
    },
    "q13": { text: "How well do you understand your own emotional triggers?" },
    "q14": {
      text: "When you make a mistake, how do you typically react?",
      options: [
        "I feel defensive or embarrassed",
        "I acknowledge it and move on",
        "I reflect on what I can learn",
        "I seek feedback to improve"
      ]
    },
    "q15": { text: "How often do you reflect on your personal growth and development?" },
    "q16": { text: "How often are you fully present in the moment rather than thinking about past or future?" },
    "q17": {
      text: "When you feel stressed or overwhelmed, what helps you the most?",
      options: [
        "Taking action to address the stressor",
        "Talking to someone about it",
        "Physical activity or exercise",
        "Quiet reflection or meditation"
      ]
    },
    "q18": { text: "How well can you maintain focus on a single task without getting distracted?" },
    "q19": { text: "When you face a setback, how quickly do you recover?" },
    "q20": {
      text: "After a failure, what's your typical mindset?",
      options: [
        "I dwell on what went wrong",
        "I need time before trying again",
        "I see it as a learning opportunity",
        "I'm motivated to prove I can do it"
      ]
    },
    "q21": { text: "How do you handle situations that are outside your comfort zone?" },
    "q22": { text: "How consistent are you in practicing skills you want to improve?" },
    "q23": {
      text: "How do you approach setting and achieving personal development goals?",
      options: [
        "I set goals but struggle to follow through",
        "I take it day by day without formal goals",
        "I set specific goals and track progress",
        "I adjust my goals based on circumstances"
      ]
    },
    "q24": { text: "How confident do you feel in your ability to develop new skills over time?" }
  }

  const translation = defaultTranslations[template.id]
  return {
    ...template,
    text: translation.text,
    options: translation.options
  }
})
