import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params

  const article = await prisma.article.findUnique({
    where: { slug, isPublished: true }
  })

  if (!article) {
    return {
      title: 'Article Not Found',
    }
  }

  return {
    title: `${article.title} - MetaSkills Blog`,
    description: article.excerpt.slice(0, 160),
    keywords: [article.type.toLowerCase(), article.skillCode || 'meta-skills', 'learning', 'personal development', article.category],
    openGraph: {
      title: article.title,
      description: article.excerpt.slice(0, 160),
      type: 'article',
      publishedTime: article.publishedAt?.toISOString(),
      authors: [article.authorName],
      section: article.category,
      images: [
        {
          url: article.coverImage || `/og-images/articles/${slug}.png`,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt.slice(0, 160),
      images: [article.coverImage || `/og-images/articles/${slug}.png`],
    },
    alternates: {
      canonical: `/articles/${slug}`,
    },
  }
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params

  const article = await prisma.article.findUnique({
    where: { slug, isPublished: true }
  })

  if (!article) {
    notFound()
  }

  // Increment view count
  await prisma.article.update({
    where: { id: article.id },
    data: { views: { increment: 1 } }
  })

  // JSON-LD Structured Data
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.coverImage || `/og-images/articles/${slug}.png`,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      '@type': 'Person',
      name: article.authorName,
      jobTitle: article.authorTitle,
    },
    publisher: {
      '@type': 'Organization',
      name: 'MetaSkills',
      logo: {
        '@type': 'ImageObject',
        url: '/logo.png',
      },
    },
    articleSection: article.category,
    keywords: [article.type.toLowerCase(), article.skillCode, 'learning', 'personal development'].filter(Boolean),
    about: article.skillCode ? {
      '@type': 'Thing',
      name: article.skillCode,
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
        <Link
          href="/articles"
          className="inline-flex items-center text-[#8DA399] hover:text-[#6B8379] mb-8"
        >
          ← Back to Articles
        </Link>

        {/* Article Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-[#8DA399]/20 text-[#8DA399] rounded-full text-sm font-medium">
              {article.type.replace('_', ' ').toLowerCase().replace(/\b\w/g, (s: string) => s.charAt(0).toUpperCase() + s.slice(1))}
            </span>
            {article.category && (
              <span className="text-sm text-gray-600">
                {article.category}
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#2D2D2D] mb-4">
            {article.title}
          </h1>

          <div className="flex items-center gap-6 text-sm text-gray-600">
            <span>{article.authorName}</span>
            <span>•</span>
            <span>{article.authorTitle}</span>
            <span>•</span>
            <span>{article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Not published'}</span>
          </div>
        </div>

        {/* Featured Image (if available) */}
        {article.coverImage && (
          <div className="mb-8">
            <div className="w-full h-64 md:h-96 bg-gradient-to-br from-[#8DA399] to-[#6B8379] rounded-lg flex items-center justify-center">
              <span className="text-white text-4xl">📷</span>
            </div>
          </div>
        )}

        {/* Content */}
        <Card className="border-[#E5E0D8]">
          <CardContent className="p-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-700 italic mb-8 leading-relaxed">
                {article.excerpt}
              </p>

              <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                {article.content}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related CTA */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-[#8DA399] to-[#6B8379] rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-serif font-bold mb-4">
              Ready to Deepen Your Practice?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Explore resources and challenges related to {article.skillCode?.replace('-', ' ') || 'these topics'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-[#8DA399] hover:bg-gray-50"
              >
                <Link href="/resources">
                  Browse Resources →
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                <Link href="/challenges">
                  View Challenges →
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
