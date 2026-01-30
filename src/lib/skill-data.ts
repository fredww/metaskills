// Practice recommendations for each skill
export const skillPracticesMap: Record<string, string[]> = {
  "learning-to-learn": ["5", "1", "6"], // The Feynman Technique, Morning Check-In, Comfort Zone Stretch
  "critical-thinking": ["4", "5", "1"], // The 5 Whys, The Feynman Technique, Morning Check-In
  "communication": ["2", "1"], // Active Listening, Morning Check-In
  "empathy": ["2", "1"], // Active Listening, Morning Check-In
  "emotional-intelligence": ["7", "1", "2"], // Gratitude Letter, Morning Check-In, Active Listening
  "self-awareness": ["1", "3"], // Morning Check-In, Body Scan
  "mindfulness": ["3", "1"], // Body Scan, Morning Check-In
  "resilience": ["6", "3"] // Comfort Zone Stretch, Body Scan
}

// Learning paths for each skill
export const learningPaths: Record<string, string[]> = {
  "learning-to-learn": [
    "Start with Morning Check-In to build self-awareness",
    "Practice The Feynman Technique when learning new concepts",
    "Use Comfort Zone Stretch to tackle challenging topics",
    "Reflect daily in your journal about your learning process"
  ],
  "critical-thinking": [
    "Practice The 5 Whys for problem analysis",
    "Morning Check-In to identify cognitive biases",
    "Journal about decisions you make and their outcomes",
    "Use The Feynman Technique to test your understanding"
  ],
  "communication": [
    "Start with Active Listening practice daily",
    "Use Morning Check-In to reflect on your interactions",
    "Practice being fully present in conversations",
    "Journal your communication experiences and learnings"
  ],
  "empathy": [
    "Begin with Active Listening to truly understand others",
    "Use Morning Check-In to reflect on your emotional responses",
    "Practice perspective-taking in daily interactions",
    "Journal about moments of connection and understanding"
  ],
  "emotional-intelligence": [
    "Build Self-Awareness with Morning Check-In",
    "Practice Active Listening to understand others' emotions",
    "Use Gratitude Letter to acknowledge important relationships",
    "Journal your emotional patterns and triggers"
  ],
  "self-awareness": [
    "Morning Check-In daily (core practice)",
    "Body Scan to increase body awareness",
    "Reflect on your day through journaling",
    "Use Comfort Zone Stretch to discover blind spots"
  ],
  "mindfulness": [
    "Morning Check-In to start your day mindfully",
    "Body Scan for formal practice",
    "Practice present-moment awareness throughout the day",
    "Evening journal reflection"
  ],
  "resilience": [
    "Morning Check-In to build inner strength",
    "Comfort Zone Stretch daily (gradual exposure)",
    "Journal about setbacks and comebacks",
    "Body Scan to release physical tension"
  ]
}

// Practice data
export const practicesData: Record<string, {
  id: string
  title: string
  description: string
  duration: number
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED"
}> = {
  "1": {
    id: "1",
    title: "Morning Check-In",
    description: "Start each day with 5 minutes of self-awareness practice",
    duration: 5,
    difficulty: "BEGINNER"
  },
  "2": {
    id: "2",
    title: "Active Listening",
    description: "Listen for 5 minutes without interrupting or planning response",
    duration: 5,
    difficulty: "BEGINNER"
  },
  "3": {
    id: "3",
    title: "Body Scan",
    description: "10-minute systematic awareness of body sensations",
    duration: 10,
    difficulty: "BEGINNER"
  },
  "4": {
    id: "4",
    title: "The 5 Whys",
    description: "Ask 'why' five times to find root causes of problems",
    duration: 10,
    difficulty: "INTERMEDIATE"
  },
  "5": {
    id: "5",
    title: "The Feynman Technique",
    description: "Explain a concept simply as if teaching someone else",
    duration: 15,
    difficulty: "INTERMEDIATE"
  },
  "6": {
    id: "6",
    title: "Comfort Zone Stretch",
    description: "Do one small thing that makes you slightly uncomfortable",
    duration: 10,
    difficulty: "INTERMEDIATE"
  },
  "7": {
    id: "7",
    title: "Gratitude Letter",
    description: "Write a letter expressing gratitude to someone important",
    duration: 15,
    difficulty: "INTERMEDIATE"
  }
}

// Skill stats for display
export const skillStats: Record<string, {
  averagePracticeTime: number
  totalPractices: number
  relatedDomains: string[]
}> = {
  "learning-to-learn": {
    averagePracticeTime: 15,
    totalPractices: 6,
    relatedDomains: ["Critical Thinking", "Self-Awareness"]
  },
  "critical-thinking": {
    averagePracticeTime: 10,
    totalPractices: 4,
    relatedDomains: ["Learning to Learn", "Self-Awareness"]
  },
  "communication": {
    averagePracticeTime: 5,
    totalPractices: 4,
    relatedDomains: ["Empathy", "Emotional Intelligence"]
  },
  "empathy": {
    averagePracticeTime: 10,
    totalPractices: 5,
    relatedDomains: ["Communication", "Emotional Intelligence"]
  },
  "emotional-intelligence": {
    averagePracticeTime: 15,
    totalPractices: 5,
    relatedDomains: ["Self-Awareness", "Empathy"]
  },
  "self-awareness": {
    averagePracticeTime: 5,
    totalPractices: 8,
    relatedDomains: ["Mindfulness", "Emotional Intelligence"]
  },
  "mindfulness": {
    averagePracticeTime: 10,
    totalPractices: 6,
    relatedDomains: ["Self-Awareness", "Resilience"]
  },
  "resilience": {
    averagePracticeTime: 10,
    totalPractices: 4,
    relatedDomains: ["Self-Awareness", "Mindfulness"]
  }
}
