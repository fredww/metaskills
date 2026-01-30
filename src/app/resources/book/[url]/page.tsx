import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import ResourceDetailClient from "./client-page"
import type { Metadata } from "next"

interface PageProps {
  params: Promise<{ url: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { url } = await params
  const decodedUrl = decodeURIComponent(url)

  // Fetch resource data for metadata
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'
  const apiUrl = `${baseUrl}/api/resources/book/${encodeURIComponent(url)}`

  try {
    const response = await fetch(apiUrl, { cache: 'no-store' })
    if (!response.ok) {
      return {
        title: 'Resource Not Found',
      }
    }
    const data = await response.json()
    const { resource, stats } = data

    return {
      title: `${resource.title} by ${resource.author} - MetaSkills`,
      description: resource.description.slice(0, 160),
      keywords: [
        resource.title,
        resource.author,
        resource.skillCode.replace('-', ' '),
        'book recommendation',
        'meta-skills',
        'personal development',
        'learning',
        ...resource.keyPoints.slice(0, 5)
      ],
      openGraph: {
        title: resource.title,
        description: resource.description.slice(0, 160),
        type: 'website',
        url: `${baseUrl}/resources/book/${encodeURIComponent(url)}`,
        siteName: 'MetaSkills',
        images: [
          {
            url: resource.coverUrl || `${baseUrl}/og-images/books/${encodeURIComponent(url)}.png`,
            width: 1200,
            height: 630,
            alt: `${resource.title} cover`,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: resource.title,
        description: resource.description.slice(0, 160),
        images: [resource.coverUrl || `${baseUrl}/og-images/books/${encodeURIComponent(url)}.png`],
      },
      alternates: {
        canonical: `/resources/book/${encodeURIComponent(url)}`,
      },
    }
  } catch (error) {
    return {
      title: 'Resource Not Found',
    }
  }
}

export default async function ResourceDetailPage({ params }: PageProps) {
  const { url } = await params
  const decodedUrl = decodeURIComponent(url)

  // Fetch resource data from API
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'
  const apiUrl = `${baseUrl}/api/resources/book/${encodeURIComponent(url)}`

  let resourceData
  try {
    const response = await fetch(apiUrl, { cache: 'no-store' })
    if (!response.ok) {
      notFound()
    }
    resourceData = await response.json()
  } catch (error) {
    console.error('Failed to fetch resource:', error)
    notFound()
  }

  // JSON-LD Structured Data
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: resourceData.resource.title,
    author: {
      '@type': 'Person',
      name: resourceData.resource.author,
    },
    isbn: resourceData.resource.isbn || undefined,
    description: resourceData.resource.description,
    aggregateRating: resourceData.stats.totalRatings > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: resourceData.stats.averageRating,
      reviewCount: resourceData.stats.totalRatings,
      bestRating: '5',
      worstRating: '1',
    } : undefined,
    about: {
      '@type': 'Thing',
      name: resourceData.resource.skillCode.replace('-', ' '),
    },
    educationalLevel: resourceData.resource.difficulty,
    inLanguage: 'en',
    publisher: {
      '@type': 'Organization',
      name: 'MetaSkills',
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      price: '0',
      priceCurrency: 'USD',
      url: resourceData.resource.url,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen bg-[#FDFBF7] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link
          href={`/skills/${resourceData.resource.skillCode}`}
          className="inline-flex items-center text-[#8DA399] hover:text-[#6B8379] mb-8"
        >
          ← Back to {resourceData.resource.skillCode.replace('-', ' ')}
        </Link>

        <ResourceDetailClient
          resourceData={resourceData}
          resourceUrl={decodedUrl}
        />
      </div>
    </div>
    </>
  )
}
