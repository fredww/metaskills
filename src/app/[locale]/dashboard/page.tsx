import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth.config"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

async function getUserAssessments(userId: string) {
  try {
    const assessments = await prisma.assessment.findMany({
      where: { userId },
      orderBy: { completedAt: 'desc' },
      take: 5
    })
    return assessments
  } catch (error) {
    console.error('Failed to fetch assessments:', error)
    return []
  }
}

async function getUserProgress(userId: string) {
  try {
    const progress = await prisma.userProgress.findMany({
      where: { userId },
      include: {
        skill: {
          include: {
            translations: {
              where: { locale: 'en', isPublished: true }
            }
          }
        }
      },
      take: 8
    })
    return progress
  } catch (error) {
    console.error('Failed to fetch user progress:', error)
    return []
  }
}

async function getRecentPracticeCompletions(userId: string) {
  try {
    const completions = await prisma.practiceCompletion.findMany({
      where: { userId },
      include: {
        practice: {
          include: {
            skill: {
              include: {
                translations: {
                  where: { locale: 'en', isPublished: true }
                }
              }
            },
            translations: {
              where: { locale: 'en', isPublished: true }
            }
          }
        }
      },
      orderBy: { completedAt: 'desc' },
      take: 5
    })
    return completions
  } catch (error) {
    console.error('Failed to fetch practice completions:', error)
    return []
  }
}

async function getPracticeStatsBySkill(userId: string) {
  try {
    const completions = await prisma.practiceCompletion.findMany({
      where: { userId },
      include: {
        practice: {
          include: {
            skill: {
              include: {
                translations: {
                  where: { locale: 'en', isPublished: true }
                }
              }
            },
            translations: {
              where: { locale: 'en', isPublished: true }
            }
          }
        }
      }
    })

    // Count completions by skill
    const skillCounts: Record<string, number> = {}
    completions.forEach(completion => {
      const skillTitle = completion.practice.skill.translations[0]?.title || completion.practice.skill.code
      skillCounts[skillTitle] = (skillCounts[skillTitle] || 0) + 1
    })

    return skillCounts
  } catch (error) {
    console.error('Failed to fetch practice stats:', error)
    return {}
  }
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email || "" }
  })

  if (!user) {
    redirect("/login")
  }

  const [assessments, userProgress, practiceCompletions, practiceStats] = await Promise.all([
    getUserAssessments(user.id),
    getUserProgress(user.id),
    getRecentPracticeCompletions(user.id),
    getPracticeStatsBySkill(user.id)
  ])

  const latestAssessment = assessments[0]
  const hasTakenAssessment = assessments.length > 0

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold font-serif text-[#2D2D2D] mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-lg text-gray-600">
            Continue your meta-skills journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Assessment Status */}
          <div className="bg-white rounded-3xl p-8 border border-[#E5E0D8]">
            <h2 className="text-xl font-bold font-serif text-[#2D2D2D] mb-4">
              Your Progress
            </h2>
            {hasTakenAssessment && latestAssessment ? (
              <div>
                <p className="text-sm text-gray-600 mb-4">
                  Last assessment: {new Date(latestAssessment.completedAt).toLocaleDateString()}
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-2">Overall Score</p>
                    <div className="text-3xl font-bold text-[#8DA399]">
                      {((latestAssessment.result as any)?.overall * 2 || 0).toFixed(1)}
                      <span className="text-lg text-gray-500">/10</span>
                    </div>
                  </div>
                  <Link
                    href="/assessment"
                    className="px-4 py-2 bg-[#8DA399] hover:bg-[#6B8379] text-white rounded-xl text-sm font-medium transition-colors"
                  >
                    Retake
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-600 mb-4">
                  Take your first assessment to discover your meta-skills profile
                </p>
                <Link
                  href="/assessment"
                  className="inline-block px-6 py-3 bg-[#8DA399] hover:bg-[#6B8379] text-white rounded-xl font-medium transition-colors"
                >
                  Start Assessment →
                </Link>
              </div>
            )}
          </div>

          {/* Skills Progress */}
          <div className="bg-white rounded-3xl p-8 border border-[#E5E0D8]">
            <h2 className="text-xl font-bold font-serif text-[#2D2D2D] mb-4">
              Your Skills
            </h2>
            {userProgress.length > 0 ? (
              <div className="space-y-3">
                {userProgress.slice(0, 4).map((progress) => {
                  const skillTitle = progress.skill.translations[0]?.title || progress.skill.code
                  const practiceCount = practiceStats[skillTitle] || 0
                  return (
                    <div key={progress.id} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm text-[#2D2D2D]">{skillTitle}</span>
                          {practiceCount > 0 && (
                            <span className="text-xs px-2 py-0.5 bg-[#D4AF37]/20 text-[#D4AF37] rounded-full">
                              {practiceCount} {practiceCount === 1 ? 'practice' : 'practices'}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-24 bg-[#F3EFE9] rounded-full h-2">
                            <div
                              className="bg-[#8DA399] h-2 rounded-full transition-all"
                              style={{ width: `${(progress.awareness / 5) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-[#8DA399]">
                            {progress.awareness.toFixed(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
                {userProgress.length > 4 && (
                  <Link
                    href="/skills"
                    className="text-sm text-[#8DA399] hover:text-[#6B8379] font-medium"
                  >
                    View all skills →
                  </Link>
                )}
              </div>
            ) : (
              <p className="text-gray-600">
                Complete an assessment to see your skill development
              </p>
            )}
          </div>
        </div>

        {/* Assessment History */}
        {assessments.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold font-serif text-[#2D2D2D] mb-6">
              Assessment History
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {assessments.map((assessment) => {
                const result = assessment.result as any
                return (
                  <Card key={assessment.id} className="border-[#E5E0D8]">
                    <CardContent className="p-6">
                      <p className="text-sm text-gray-600 mb-2">
                        {new Date(assessment.completedAt).toLocaleDateString()}
                      </p>
                      <div className="text-2xl font-bold text-[#8DA399] mb-1">
                        {(result?.overall * 2 || 0).toFixed(1)}
                        <span className="text-sm text-gray-500">/10</span>
                      </div>
                      <p className="text-xs text-gray-600">
                        Stage: {result?.stage || 'N/A'}
                      </p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )}

        {/* Recent Practice Activity */}
        {practiceCompletions.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold font-serif text-[#2D2D2D] mb-6">
              Recent Practice Activity
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {practiceCompletions.slice(0, 6).map((completion) => {
                  const practiceTitle = completion.practice.translations[0]?.title || completion.practice.code
                  const skillTitle = completion.practice.skill.translations[0]?.title || completion.practice.skill.code
                  return (
                    <Card key={completion.id} className="border-[#E5E0D8]">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <span className="text-2xl">💪</span>
                          <span className="text-xs text-gray-500">
                            {new Date(completion.completedAt).toLocaleDateString()}
                          </span>
                        </div>
                        <h3 className="font-semibold text-[#2D2D2D] mb-1">
                          {practiceTitle}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {skillTitle}
                        </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>⏱️ {completion.practice.duration} min</span>
                      {completion.rating && (
                        <span>⭐ {completion.rating}/5</span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-bold font-serif text-[#2D2D2D] mb-6">
            Quick Actions
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/assessment"
              className="bg-white rounded-2xl p-6 border border-[#E5E0D8] hover:border-[#8DA399] transition-colors group block"
            >
              <div className="text-2xl mb-2">📊</div>
              <h3 className="font-semibold text-[#2D2D2D] group-hover:text-[#8DA399] transition-colors">
                Take Assessment
              </h3>
            </Link>
            <Link
              href="/skills"
              className="bg-white rounded-2xl p-6 border border-[#E5E0D8] hover:border-[#8DA399] transition-colors group block"
            >
              <div className="text-2xl mb-2">🧭</div>
              <h3 className="font-semibold text-[#2D2D2D] group-hover:text-[#8DA399] transition-colors">
                Explore Skills
              </h3>
            </Link>
            <Link
              href="/practices"
              className="bg-white rounded-2xl p-6 border border-[#E5E0D8] hover:border-[#8DA399] transition-colors group block"
            >
              <div className="text-2xl mb-2">💪</div>
              <h3 className="font-semibold text-[#2D2D2D] group-hover:text-[#8DA399] transition-colors">
                Browse Practices
              </h3>
            </Link>
            <Link
              href="/journal"
              className="bg-white rounded-2xl p-6 border border-[#E5E0D8] hover:border-[#8DA399] transition-colors group block"
            >
              <div className="text-2xl mb-2">📓</div>
              <h3 className="font-semibold text-[#2D2D2D] group-hover:text-[#8DA399] transition-colors">
                Journal
              </h3>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
