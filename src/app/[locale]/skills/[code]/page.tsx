import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { notFound } from "next/navigation"
import { skillPracticesMap, learningPaths, skillStats, practicesData } from "@/lib/skill-data"
import { getBookRecommendations, getExpertEndorsements, BookRecommendation, ExpertEndorsement } from "@/lib/skill-resources"
import { SkillResourcesWithABTest } from "@/components/resources/SkillResourcesWithABTest"

// TODO: Replace with database data
const skillsData: Record<string, any> = {
  "learning-to-learn": {
    code: "learning-to-learn",
    title: "Learning to Learn",
    description: "The ability to learn new things quickly and effectively. This meta-skill is the foundation of all personal growth, enabling you to adapt to new challenges and acquire any other skill more efficiently.",
    domain: "COGNITIVE",
    stage: 2,
    benefits: ["Faster skill acquisition", "Adaptability", "Growth mindset", "Meta-learning awareness"],
    tips: [
      "Focus on understanding principles rather than memorizing facts",
      "Teach others what you're learning to reinforce your understanding",
      "Connect new information to things you already know",
      "Use varied learning methods (visual, auditory, kinesthetic)"
    ],
    definition: "Learning to learn is the ability to rapidly and effectively acquire new knowledge and skills. It involves understanding how you learn best, recognizing patterns across different domains, and applying optimal learning strategies.",
    whyImportant: "In a world where knowledge becomes obsolete quickly, the ability to learn new things fast is more valuable than any specific technical skill. Those who can learn, unlearn, and relearn will thrive.",
    lifeApplications: [
      "Picking up new software tools at work",
      "Learning new hobbies or sports",
      "Adapting to industry changes",
      "Mastering new cooking techniques"
    ]
  },
  "critical-thinking": {
    code: "critical-thinking",
    title: "Critical Thinking",
    description: "Objective analysis and evaluation to form judgments. Critical thinking enables you to make better decisions, solve complex problems, and avoid being misled by false information.",
    domain: "COGNITIVE",
    stage: 3,
    benefits: ["Better decisions", "Reduced bias", "Problem-solving", "Clear reasoning"],
    tips: [
      "Question your own assumptions regularly",
      "Seek evidence before forming conclusions",
      "Use structured frameworks for analysis",
      "Consider multiple perspectives on issues"
    ],
    definition: "Critical thinking is the objective analysis and evaluation of an issue in order to form a judgment. It involves questioning assumptions, evaluating evidence, and considering alternative viewpoints.",
    whyImportant: "In an age of information overload, the ability to think critically helps you distinguish fact from fiction, make better decisions, and avoid manipulation.",
    lifeApplications: [
      "Evaluating news sources and claims",
      "Making major life decisions",
      "Analyzing problems at work",
      "Deciding who to vote for"
    ]
  },
  "communication": {
    code: "communication",
    title: "Communication",
    description: "Effective exchange of information and feelings. Good communication is essential for building relationships, influencing others, and succeeding in virtually every area of life.",
    domain: "INTERPERSONAL",
    stage: 1,
    benefits: ["Clearer understanding", "Stronger relationships", "Career success", "Reduced conflict"],
    tips: [
      "Listen to understand, not just to respond",
      "Match your communication style to your audience",
      "Use stories and examples to illustrate points",
      "Ask for feedback on your communication"
    ],
    definition: "Communication is the process of exchanging information, ideas, thoughts, and feelings between people through speaking, writing, body language, and other means.",
    whyImportant: "Poor communication is the root cause of most relationship problems, workplace conflicts, and misunderstandings. Good communication opens doors and builds bridges.",
    lifeApplications: [
      "Giving presentations at work",
      "Resolving conflicts with family",
      "Negotiating deals or agreements",
      "Building new friendships"
    ]
  },
  "empathy": {
    code: "empathy",
    title: "Empathy",
    description: "Understand and feel what another person is experiencing. Empathy allows you to build deeper connections, resolve conflicts, and create environments where everyone feels valued.",
    domain: "INTERPERSONAL",
    stage: 2,
    benefits: ["Deeper connections", "Reduced conflict", "Better collaboration", "Emotional intelligence"],
    tips: [
      "Cultivate curiosity about others' experiences",
      "Suspend judgment when listening",
      "Practice perspective-taking exercises",
      "Notice and name emotions in yourself and others"
    ],
    definition: "Empathy is the capacity to understand or feel what another person is experiencing from within their frame of reference. It's the foundation of emotional intelligence and meaningful relationships.",
    whyImportant: "Empathy is what makes us human. It's essential for leadership, teamwork, parenting, friendships, and any meaningful relationship.",
    lifeApplications: [
      "Supporting friends through difficult times",
      "Leading teams effectively",
      "Navigating family conflicts",
      "Providing excellent customer service"
    ]
  },
  "self-awareness": {
    code: "self-awareness",
    title: "Self-Awareness",
    description: "Conscious knowledge of your character, feelings, motives, and desires. Self-awareness is the starting point for all personal growth and meaningful change.",
    domain: "SELF",
    stage: 1,
    benefits: ["Better life choices", "Authentic living", "Emotional regulation", "Personal growth"],
    tips: [
      "Reflect regularly on your experiences and decisions",
      "Journal to discover patterns in your thoughts",
      "Seek honest feedback from trusted friends",
      "Practice mindfulness to observe your thoughts"
    ],
    definition: "Self-awareness is the conscious knowledge of one's own character, feelings, motives, and desires. It involves introspection and honest self-assessment.",
    whyImportant: "Self-awareness enables you to understand your strengths and weaknesses, recognize your patterns, and make intentional choices about how you want to live.",
    lifeApplications: [
      "Choosing a career that fits your values",
      "Recognizing and changing bad habits",
      "Improving your relationships",
      "Making major life decisions"
    ]
  },
  "mindfulness": {
    code: "mindfulness",
    title: "Mindfulness",
    description: "Present-moment awareness without judgment. Mindfulness reduces stress, improves focus, and helps you fully engage with life as it unfolds.",
    domain: "SELF",
    stage: 1,
    benefits: ["Reduced stress", "Improved focus", "Better emotional regulation", "Greater life satisfaction"],
    tips: [
      "Start with just 5 minutes of daily practice",
      "Focus on your breath as an anchor",
      "Notice when your mind wanders and gently return",
      "Be patient with yourself - it's called practice for a reason"
    ],
    definition: "Mindfulness is the quality of being present and fully engaged with whatever you're doing in the moment. It involves non-judgmental awareness of your thoughts, feelings, and surroundings.",
    whyImportant: "Most unhappiness comes from living in the past or worrying about the future. Mindfulness brings you back to the only time you can actually live: now.",
    lifeApplications: [
      "Reducing daily stress and anxiety",
      "Improving focus and productivity",
      "Enjoying food more fully",
      "Being more present with loved ones"
    ]
  },
  "resilience": {
    code: "resilience",
    title: "Resilience",
    description: "Recover quickly from difficulties and adversity. Resilience allows you to bounce back from setbacks, learn from failure, and persist in the face of obstacles.",
    domain: "SELF",
    stage: 2,
    benefits: ["Bounce back from setbacks", "Stress tolerance", "Long-term success", "Better mental health"],
    tips: [
      "Reframe setbacks as learning opportunities",
      "Build a strong support network",
      "Practice self-compassion when things go wrong",
      "Focus on what you can control"
    ],
    definition: "Resilience is the capacity to recover quickly from difficulties. It's not about avoiding stress or hardship, but about adapting and growing in the face of challenges.",
    whyImportant: "Life inevitably brings challenges. Resilience determines whether those challenges break you or make you stronger. It's essential for achieving long-term goals.",
    lifeApplications: [
      "Coping with job loss or career changes",
      "Navigating personal crises",
      "Dealing with health issues",
      "Starting over after major life changes"
    ]
  },
  "emotional-intelligence": {
    code: "emotional-intelligence",
    title: "Emotional Intelligence",
    description: "Recognize and understand emotions in yourself and others. High emotional intelligence leads to better relationships, effective leadership, and greater life satisfaction.",
    domain: "INTERPERSONAL",
    stage: 3,
    benefits: ["Better relationships", "Conflict resolution", "Leadership", "Personal well-being"],
    tips: [
      "Name your emotions as you feel them",
      "Practice active listening",
      "Pause before responding in emotionally charged situations",
      "Reflect on your emotional reactions later"
    ],
    definition: "Emotional intelligence is the ability to recognize, understand, and manage your own emotions and those of others. It includes self-awareness, self-regulation, motivation, empathy, and social skills.",
    whyImportant: "Emotions drive behavior. Understanding and managing emotions effectively is crucial for success in relationships, work, and personal well-being.",
    lifeApplications: [
      "Leading teams and managing people",
      "Navigating difficult conversations",
      "Supporting others through emotional times",
      "Managing your own stress and reactions"
    ]
  }
}

const stageLabels = {
  1: "Beginner",
  2: "Developing",
  3: "Proficient",
  4: "Advanced",
  5: "Master"
}

const domainColors = {
  COGNITIVE: "bg-[#8DA399]/20 text-[#8DA399]",
  INTERPERSONAL: "bg-[#C7826B]/20 text-[#C7826B]",
  SELF: "bg-[#D4AF37]/20 text-[#D4AF37]"
}

const difficultyColors = {
  BEGINNER: "bg-[#8DA399]/20 text-[#8DA399]",
  INTERMEDIATE: "bg-[#D4AF37]/20 text-[#D4AF37]",
  ADVANCED: "bg-[#C7826B]/20 text-[#C7826B]"
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>
}) {
  const { code } = await params
  const skill = skillsData[code]

  if (!skill) {
    return {
      title: 'Skill Not Found',
    }
  }

  const books = getBookRecommendations(code)
  const bookTitles = books.map((b: BookRecommendation) => b.title).slice(0, 3).join(', ')

  return {
    title: `${skill.title} - MetaSkills`,
    description: skill.description.slice(0, 160),
    keywords: [skill.title, skill.code, 'meta-skill', 'personal development', 'learning', ...skill.benefits],
    openGraph: {
      title: skill.title,
      description: skill.description.slice(0, 160),
      type: 'article',
      publishedTime: new Date().toISOString(),
      authors: ['MetaSkills'],
      images: [
        {
          url: `/og-images/skills/${code}.png`,
          width: 1200,
          height: 630,
          alt: `${skill.title} - MetaSkills`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: skill.title,
      description: skill.description.slice(0, 160),
      images: [`/og-images/skills/${code}.png`],
    },
    alternates: {
      canonical: `/skills/${code}`,
    },
  }
}

export default async function SkillDetailPage({
  params
}: {
  params: Promise<{ code: string }>
}) {
  const { code } = await params
  const skill = skillsData[code]

  if (!skill) {
    notFound()
  }

  const books = getBookRecommendations(code)
  const experts = getExpertEndorsements(code)

  // JSON-LD Structured Data
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: skill.title,
    description: skill.description,
    educationalLevel: skill.stage,
    learningResourceType: 'Meta Skill',
    teaches: skill.code,
    keywords: [...skill.benefits, skill.domain, 'personal development'],
    author: {
      '@type': 'Organization',
      name: 'MetaSkills',
    },
    about: {
      '@type': 'Thing',
      name: skill.title,
      description: skill.definition,
    },
    hasPart: books.map((book: BookRecommendation) => ({
      '@type': 'Book',
      name: book.title,
      author: {
        '@type': 'Person',
        name: book.author,
      },
      url: book.url,
    })),
    aggregatorRating: experts.length > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: experts.length,
    } : undefined,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen bg-[#FDFBF7] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link href="/skills" className="inline-flex items-center text-[#8DA399] hover:text-[#6B8379] mb-8">
          ← Back to Skills
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${domainColors[skill.domain as keyof typeof domainColors]}`}>
              {skill.domain}
            </span>
            <span className="text-sm text-gray-600">Stage: {stageLabels[skill.stage as keyof typeof stageLabels]}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#2D2D2D] mb-4">
            {skill.title}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            {skill.description}
          </p>
        </div>

        {/* Definition */}
        <Card className="mb-8 border-[#E5E0D8]">
          <CardHeader>
            <CardTitle className="text-2xl font-serif text-[#2D2D2D]">
              What is {skill.title}?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              {skill.definition}
            </p>
            <div className="bg-[#F3EFE9] rounded-xl p-6 border border-[#E5E0D8]">
              <h4 className="font-semibold text-[#2D2D2D] mb-2">Why It Matters</h4>
              <p className="text-gray-700">{skill.whyImportant}</p>
            </div>
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
            <ul className="grid md:grid-cols-2 gap-3">
              {skill.benefits.map((benefit: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#8DA399] mt-1">✓</span>
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Life Applications */}
        <Card className="mb-8 border-[#E5E0D8]">
          <CardHeader>
            <CardTitle className="text-2xl font-serif text-[#2D2D2D]">
              Real-Life Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {skill.lifeApplications.map((app: string, idx: number) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#8DA399]/20 flex items-center justify-center text-[#8DA399] text-sm">
                    {idx + 1}
                  </span>
                  <span className="text-gray-700">{app}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card className="mb-8 border-[#E5E0D8]">
          <CardHeader>
            <CardTitle className="text-2xl font-serif text-[#2D2D2D]">
              Development Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {skill.tips.map((tip: string, idx: number) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-[#D4AF37] text-xl">💡</span>
                  <span className="text-gray-700">{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Learning Hub */}
        <div className="mb-8">
          <h2 className="text-3xl font-serif font-bold text-[#2D2D2D] mb-6">
            Learning Hub
          </h2>

          {/* Quick Stats */}
          {skillStats[skill.code] && (
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              <Card className="border-[#E5E0D8]">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-2">⏱️</div>
                  <div className="text-2xl font-bold text-[#8DA399] mb-1">
                    {skillStats[skill.code].averagePracticeTime}m
                  </div>
                  <p className="text-sm text-gray-600">Avg. Practice Time</p>
                </CardContent>
              </Card>
              <Card className="border-[#E5E0D8]">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-2">📝</div>
                  <div className="text-2xl font-bold text-[#D4AF37] mb-1">
                    {skillStats[skill.code].totalPractices}
                  </div>
                  <p className="text-sm text-gray-600">Available Practices</p>
                </CardContent>
              </Card>
              <Card className="border-[#E5E0D8]">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-2">🔗</div>
                  <div className="text-lg font-bold text-[#C7826B] mb-1">
                    {skillStats[skill.code].relatedDomains.join(", ")}
                  </div>
                  <p className="text-sm text-gray-600">Related Skills</p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Related Practices */}
          {skillPracticesMap[skill.code] && skillPracticesMap[skill.code].length > 0 && (
            <Card className="mb-8 border-[#E5E0D8]">
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-[#2D2D2D]">
                  Recommended Practices
                </CardTitle>
                <p className="text-gray-600 mt-2">
                  Start with these practices to develop your {skill.title} skills
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {skillPracticesMap[skill.code].map((practiceId) => {
                    const practice = practicesData[practiceId]
                    if (!practice) return null
                    return (
                      <div
                        key={practice.id}
                        className="flex items-start justify-between p-4 rounded-xl border border-[#E5E0D8] bg-white hover:border-[#8DA399] transition-colors"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold text-[#2D2D2D]">
                              {practice.title}
                            </h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[practice.difficulty]}`}>
                              {practice.difficulty}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {practice.description}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              ⏱️ {practice.duration} minutes
                            </span>
                          </div>
                        </div>
                        <Button
                          asChild
                          size="sm"
                          className="bg-[#8DA399] hover:bg-[#6B8379] text-white whitespace-nowrap"
                        >
                          <Link href={`/practices/${practice.id}`}>
                            Start Practice →
                          </Link>
                        </Button>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Learning Path */}
          {learningPaths[skill.code] && learningPaths[skill.code].length > 0 && (
            <Card className="border-[#E5E0D8]">
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-[#2D2D2D]">
                  Your Learning Path
                </CardTitle>
                <p className="text-gray-600 mt-2">
                  Follow these steps to master {skill.title}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {learningPaths[skill.code].map((step, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#8DA399] text-white flex items-center justify-center font-bold text-sm">
                        {idx + 1}
                      </div>
                      <div className="flex-1 pt-1">
                        <p className="text-gray-700">{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Recommended Reading */}
        <div className="mb-8">
          <h2 className="text-3xl font-serif font-bold text-[#2D2D2D] mb-6">
            📚 Recommended Reading
          </h2>
          <p className="text-gray-600 mb-6">
            Deepen your understanding of {skill.title} with these carefully selected books
          </p>

          <SkillResourcesWithABTest
            skillCode={skill.code}
            books={getBookRecommendations(skill.code)}
          />
        </div>

        {/* Expert Endorsements */}
        {getExpertEndorsements(skill.code).length > 0 && (
          <div className="mb-8">
            <h2 className="text-3xl font-serif font-bold text-[#2D2D2D] mb-6">
              👨‍🏫 What Experts Say
            </h2>
            <p className="text-gray-600 mb-6">
              Insights from leading researchers and practitioners in {skill.title}
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {getExpertEndorsements(skill.code).map((expert: ExpertEndorsement, idx: number) => (
                <Card key={idx} className="border-[#E5E0D8]">
                  <CardContent className="p-6">
                    {/* Quote */}
                    <div className="mb-6">
                      <div className="text-4xl text-[#8DA399] leading-none mb-3">"</div>
                      <p className="text-gray-700 italic leading-relaxed pl-6">
                        {expert.quote}
                      </p>
                    </div>

                    {/* Expert Info */}
                    <div className="flex items-start gap-4">
                      {/* Avatar Placeholder */}
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#C7826B] rounded-full flex items-center justify-center text-white text-xl font-bold shadow-md">
                          {expert.name.split(' ').map((n: string) => n[0]).join('')}
                        </div>
                      </div>

                      {/* Details */}
                      <div className="flex-1">
                        <h4 className="font-bold text-[#2D2D2D] mb-1">
                          {expert.name}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">
                          {expert.title}
                          {expert.organization && (
                            <span> · {expert.organization}</span>
                          )}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {expert.credentials.slice(0, 3).map((cred, cIdx) => (
                            <span
                              key={cIdx}
                              className="px-2 py-1 bg-[#F3EFE9] text-[#2D2D2D] rounded text-xs"
                            >
                              {cred}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Relevant Work */}
                    {expert.relevantWork && (
                      <div className="mt-4 pt-4 border-t border-[#E5E0D8]">
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold text-[#2D2D2D]">Notable Work:</span> {expert.relevantWork}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <Card className="border-[#8DA399] bg-[#8DA399]/5">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-serif text-[#2D2D2D] mb-4">
              Ready to Develop This Skill?
            </h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="flex-1 bg-[#8DA399] hover:bg-[#6B8379] text-white"
              >
                <Link href="/practices">
                  Browse Practices
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="flex-1 border-[#8DA399] text-[#8DA399] hover:bg-[#8DA399]/10"
              >
                <Link href="/assessment">
                  Take Assessment
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </>
  )
}
