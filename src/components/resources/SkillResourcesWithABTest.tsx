"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent } from '@/components/ui/card'
import { ABResourceCard } from './ABResourceCard'
import { BookRecommendation } from '@/lib/skill-resources'
import { VariantConfig } from '@/lib/ab-testing'

interface SkillResourcesWithABTestProps {
  skillCode: string
  books: BookRecommendation[]
}

export function SkillResourcesWithABTest({ skillCode, books }: SkillResourcesWithABTestProps) {
  const { data: session } = useSession()
  const [config, setConfig] = useState<VariantConfig | null>(null)
  const [assignmentId, setAssignmentId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchABTestAssignment()
  }, [session, skillCode])

  const fetchABTestAssignment = async () => {
    try {
      const response = await fetch(`/api/abtesting/assign?context=skill-page&testType=RESOURCE_LAYOUT`)
      const data = await response.json()

      if (response.ok && data.assignment) {
        setConfig(data.config)
        setAssignmentId(data.assignmentId)
      } else {
        // No active test or error, use default config
        setConfig({
          layout: 'vertical',
          ctaPosition: 'bottom',
          showThumbnail: false,
          cardStyle: 'detailed'
        })
      }
    } catch (error) {
      console.error('Failed to fetch A/B test assignment:', error)
      // Use default config on error
      setConfig({
        layout: 'vertical',
        ctaPosition: 'bottom',
        showThumbnail: false,
        cardStyle: 'detailed'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleTrackClick = async (resourceUrl: string, assignmentId: string) => {
    if (!session) return

    try {
      await fetch('/api/abtesting/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assignmentId,
          conversionType: 'CLICK',
          resourceUrl
        })
      })
    } catch (error) {
      console.error('Failed to track conversion:', error)
    }
  }

  if (loading || !config) {
    return (
      <div className="space-y-6">
        {books.map((book, idx) => (
          <Card key={idx} className="border-[#E5E0D8]">
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-6 bg-gray-200 rounded mb-4 w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className={`space-y-6 ${config.layout === 'horizontal' ? 'flex flex-col' : ''}`}>
      {books.map((book, idx) => (
        <ABResourceCard
          key={idx}
          resource={{
            title: book.title,
            url: book.url,
            author: book.author,
            description: book.description,
            rating: book.rating,
            difficulty: book.difficulty,
            type: 'BOOK',
            skillCode
          }}
          config={config}
          onTrackClick={handleTrackClick}
          assignmentId={assignmentId || undefined}
        />
      ))}
    </div>
  )
}
