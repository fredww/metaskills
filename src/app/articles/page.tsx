"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  type: string
  skillCode?: string
  authorName: string
  authorTitle: string
  coverImage?: string
  category?: string
  publishedAt: string
}

const articleTypeLabels = {
  EXPERT_INTERVIEW: { label: 'Expert Interview', icon: '🎤', color: 'bg-[#8DA399]/20 text-[#8DA399]' },
  LEARNING_INSIGHTS: { label: 'Learning Insights', icon: '💡', color: 'bg-[#D4AF37]/20 text-[#D4AF37]' },
  SUCCESS_STORY: { label: 'Success Story', icon: '⭐', color: 'bg-[#C7826B]/20 text-[#C7826B]' },
  RESEARCH_SUMMARY: { label: 'Research Summary', icon: '📊', color: 'bg-purple-100 text-purple-700' }
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedType, setSelectedType] = useState<string>("all")

  useEffect(() => {
    fetchArticles()
  }, [selectedType])

  const fetchArticles = async () => {
    try {
      const url = selectedType === 'all'
        ? '/api/articles'
        : `/api/articles?type=${selectedType}`

      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        setArticles(data.articles)
      }
    } catch (error) {
      console.error('Failed to fetch articles:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#2D2D2D] mb-4">
            Expert Insights & Learning Resources 📚
          </h1>
          <p className="text-xl text-gray-600">
            Expert interviews, research summaries, and learning insights to deepen your understanding
          </p>
        </div>

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
            All Articles
          </button>
          <button
            onClick={() => setSelectedType('EXPERT_INTERVIEW')}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              selectedType === 'EXPERT_INTERVIEW'
                ? 'bg-[#8DA399] text-white'
                : 'bg-white text-gray-600 hover:bg-[#F3EFE9]'
            }`}
          >
            🎤 Expert Interviews
          </button>
          <button
            onClick={() => setSelectedType('LEARNING_INSIGHTS')}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              selectedType === 'LEARNING_INSIGHTS'
                ? 'bg-[#8DA399] text-white'
                : 'bg-white text-gray-600 hover:bg-[#F3EFE9]'
            }`}
          >
            💡 Learning Insights
          </button>
          <button
            onClick={() => setSelectedType('SUCCESS_STORY')}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              selectedType === 'SUCCESS_STORY'
                ? 'bg-[#8DA399] text-white'
                : 'bg-white text-gray-600 hover:bg-[#F3EFE9]'
            }`}
          >
            ⭐ Success Stories
          </button>
        </div>

        {/* Articles List */}
        {loading ? (
          <div className="text-center py-12 text-gray-600">Loading articles...</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {articles.map((article) => (
              <Card key={article.id} className="border-[#E5E0D8] hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${articleTypeLabels[article.type as keyof typeof articleTypeLabels].color}`}>
                      {articleTypeLabels[article.type as keyof typeof articleTypeLabels].icon} {articleTypeLabels[article.type as keyof typeof articleTypeLabels].label}
                    </span>
                    {article.category && (
                      <span className="text-sm text-gray-500">
                        {article.category}
                      </span>
                    )}
                  </div>

                  <Link href={`/articles/${article.slug}`}>
                    <h3 className="text-xl font-bold text-[#2D2D2D] mb-2 hover:text-[#8DA399] transition-colors">
                      {article.title}
                    </h3>
                  </Link>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{article.authorName}</span>
                    <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                  </div>

                  <Button
                    asChild
                    className="mt-4 w-full bg-[#8DA399] hover:bg-[#6B8379] text-white"
                  >
                    <Link href={`/articles/${article.slug}`}>
                      Read More →
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loading && articles.length === 0 && (
          <Card className="border-[#E5E0D8]">
            <CardContent className="p-12 text-center text-gray-500">
              No articles found in this category
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
