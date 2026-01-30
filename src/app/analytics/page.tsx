"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AnalyticsData {
  summary: {
    totalClicks: number
    totalRatings: number
    totalComments: number
    uniqueUsersEngaged: number
    engagementRate: number
    timeframeDays: number
  }
  clicksBySkill: Record<string, number>
  clicksByType: Record<string, number>
  clicksBySource: Record<string, number>
  topResources: any[]
  ratingStats: any[]
}

const skillLabels: Record<string, string> = {
  'learning-to-learn': 'Learning to Learn',
  'critical-thinking': 'Critical Thinking',
  'self-awareness': 'Self-Awareness',
  'mindfulness': 'Mindfulness',
  'resilience': 'Resilience',
  'communication': 'Communication',
  'emotional-intelligence': 'Emotional Intelligence',
  'empathy': 'Empathy'
}

const sourceLabels: Record<string, string> = {
  'SKILL_PAGE': 'Skill Page',
  'PRACTICE_MODAL': 'Practice Modal',
  'DASHBOARD': 'Dashboard',
  'RECOMMENDATION_EMAIL': 'Email'
}

export default function AnalyticsPage() {
  const { data: session, status } = useSession()
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeframe, setTimeframe] = useState('30')

  useEffect(() => {
    if (session) {
      fetchAnalytics()
    }
  }, [session, timeframe])

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(`/api/analytics/resources?timeframe=${timeframe}`)
      if (response.ok) {
        const result = await response.json()
        setData(result)
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-serif font-bold text-[#2D2D2D] mb-4">
            Resource Analytics
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Please sign in to view analytics
          </p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-serif font-bold text-[#2D2D2D] mb-2">
              Resource Analytics Dashboard 📊
            </h1>
            <p className="text-gray-600">
              Track resource performance and user engagement
            </p>
          </div>

          {/* Timeframe Selector */}
          <div className="flex gap-2">
            {[7, 30, 90, 365].map((days) => (
              <button
                key={days}
                onClick={() => setTimeframe(days.toString())}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  timeframe === days.toString()
                    ? 'bg-[#8DA399] text-white'
                    : 'bg-white text-gray-600 hover:bg-[#F3EFE9] border border-[#E5E0D8]'
                }`}
              >
                {days === 365 ? 'Year' : days === 90 ? 'Quarter' : `${days} Days`}
              </button>
            ))}
          </div>
        </div>

        {data && (
          <>
            {/* Summary Stats */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="border-[#E5E0D8]">
                <CardContent className="p-6">
                  <div className="text-3xl mb-2">👆</div>
                  <div className="text-3xl font-bold text-[#8DA399] mb-1">
                    {data.summary.totalClicks}
                  </div>
                  <p className="text-sm text-gray-600">Total Clicks</p>
                </CardContent>
              </Card>

              <Card className="border-[#E5E0D8]">
                <CardContent className="p-6">
                  <div className="text-3xl mb-2">⭐</div>
                  <div className="text-3xl font-bold text-[#D4AF37] mb-1">
                    {data.summary.totalRatings}
                  </div>
                  <p className="text-sm text-gray-600">Ratings Given</p>
                </CardContent>
              </Card>

              <Card className="border-[#E5E0D8]">
                <CardContent className="p-6">
                  <div className="text-3xl mb-2">💬</div>
                  <div className="text-3xl font-bold text-[#C7826B] mb-1">
                    {data.summary.totalComments}
                  </div>
                  <p className="text-sm text-gray-600">Comments Posted</p>
                </CardContent>
              </Card>

              <Card className="border-[#E5E0D8]">
                <CardContent className="p-6">
                  <div className="text-3xl mb-2">📈</div>
                  <div className="text-3xl font-bold text-[#8DA399] mb-1">
                    {data.summary.engagementRate}%
                  </div>
                  <p className="text-sm text-gray-600">Engagement Rate</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts Section */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* Clicks by Skill */}
              <Card className="border-[#E5E0D8]">
                <CardHeader>
                  <CardTitle className="text-lg font-serif text-[#2D2D2D]">
                    Engagement by Skill
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(data.clicksBySkill)
                      .sort(([, a], [, b]) => b - a)
                      .slice(0, 8)
                      .map(([skillCode, count]) => (
                        <div key={skillCode} className="flex items-center justify-between">
                          <span className="text-sm text-gray-700 truncate">
                            {skillLabels[skillCode] || skillCode}
                          </span>
                          <div className="flex items-center gap-2">
                            <div className="w-32 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-[#8DA399] h-2 rounded-full"
                                style={{
                                  width: `${(count / Math.max(...Object.values(data.clicksBySkill))) * 100}%`
                                }}
                              />
                            </div>
                            <span className="text-sm font-medium text-[#2D2D2D] w-8 text-right">
                              {count}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              {/* Clicks by Type */}
              <Card className="border-[#E5E0D8]">
                <CardHeader>
                  <CardTitle className="text-lg font-serif text-[#2D2D2D]">
                    By Resource Type
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(data.clicksByType)
                      .sort(([, a], [, b]) => b - a)
                      .map(([type, count]) => (
                        <div key={type} className="flex items-center justify-between">
                          <span className="text-sm text-gray-700 capitalize">
                            {type.toLowerCase()}
                          </span>
                          <div className="flex items-center gap-2">
                            <div className="w-32 bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  type === 'BOOK' ? 'bg-[#8DA399]' : 'bg-[#C7826B]'
                                }`}
                                style={{
                                  width: `${(count / Math.max(...Object.values(data.clicksByType))) * 100}%`
                                }}
                              />
                            </div>
                            <span className="text-sm font-medium text-[#2D2D2D] w-8 text-right">
                              {count}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              {/* Clicks by Source */}
              <Card className="border-[#E5E0D8]">
                <CardHeader>
                  <CardTitle className="text-lg font-serif text-[#2D2D2D]">
                    By Traffic Source
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(data.clicksBySource)
                      .sort(([, a], [, b]) => b - a)
                      .map(([source, count]) => (
                        <div key={source} className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">
                            {sourceLabels[source] || source}
                          </span>
                          <div className="flex items-center gap-2">
                            <div className="w-32 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-[#D4AF37] h-2 rounded-full"
                                style={{
                                  width: `${(count / Math.max(...Object.values(data.clicksBySource))) * 100}%`
                                }}
                              />
                            </div>
                            <span className="text-sm font-medium text-[#2D2D2D] w-8 text-right">
                              {count}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Top Resources */}
            <Card className="border-[#E5E0D8] mb-8">
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-[#2D2D2D]">
                  Most Popular Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#E5E0D8]">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Resource</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Type</th>
                        <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Clicks</th>
                        <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Unique Users</th>
                        <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Skill</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.topResources.slice(0, 10).map((resource, idx) => (
                        <tr key={idx} className="border-b border-[#E5E0D8] hover:bg-[#F3EFE9]">
                          <td className="py-3 px-4">
                            <div className="font-medium text-[#2D2D2D]">
                              {resource.title || resource.resourceUrl}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded text-xs ${
                              resource.resourceType === 'BOOK' ? 'bg-[#8DA399]/20 text-[#8DA399]' : 'bg-[#C7826B]/20 text-[#C7826B]'
                            }`}>
                              {resource.resourceType.toLowerCase()}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            {resource.clickCount}
                          </td>
                          <td className="py-3 px-4 text-center">
                            {resource.uniqueClickers}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className="text-sm text-gray-600">
                              {skillLabels[resource.skillCode]?.split(' ')[0] || resource.skillCode}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}
