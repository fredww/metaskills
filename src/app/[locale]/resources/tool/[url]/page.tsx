import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import ToolDetailClient from "./client-page"
import type { Metadata } from "next"

interface PageProps {
  params: Promise<{ url: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { url } = await params
  const decodedUrl = decodeURIComponent(url)

  // Fetch resource data for metadata
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'
  const apiUrl = `${baseUrl}/api/resources/tool/${encodeURIComponent(url)}`

  try {
    const response = await fetch(apiUrl, { cache: 'no-store' })
    if (!response.ok) {
      return {
        title: 'Tool Not Found',
      }
    }
    const data = await response.json()
    const { resource, stats } = data

    return {
      title: `${resource.name} - ${resource.type} Tool - MetaSkills`,
      description: resource.description.slice(0, 160),
      keywords: [
        resource.name,
        resource.type,
        resource.skillCode.replace('-', ' '),
        'productivity tool',
        'learning tool',
        'meta-skills',
        'personal development',
        ...resource.features.slice(0, 5)
      ],
      openGraph: {
        title: resource.name,
        description: resource.description.slice(0, 160),
        type: 'website',
        url: `${baseUrl}/resources/tool/${encodeURIComponent(url)}`,
        images: [
          {
            url: resource.logoUrl || `${baseUrl}/og-images/tools/${encodeURIComponent(url)}.png`,
            width: 1200,
            height: 630,
            alt: `${resource.name} logo`,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: resource.name,
        description: resource.description.slice(0, 160),
        images: [resource.logoUrl || `${baseUrl}/og-images/tools/${encodeURIComponent(url)}.png`],
      },
      alternates: {
        canonical: `/resources/tool/${encodeURIComponent(url)}`,
      },
    }
  } catch (error) {
    return {
      title: 'Tool Not Found',
    }
  }
}

export default async function ToolDetailPage({ params }: PageProps) {
  const { url } = await params
  const decodedUrl = decodeURIComponent(url)

  // Fetch resource data from API
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'
  const apiUrl = `${baseUrl}/api/resources/tool/${encodeURIComponent(url)}`

  let resourceData
  try {
    const response = await fetch(apiUrl, { cache: 'no-store' })
    if (!response.ok) {
      notFound()
    }
    resourceData = await response.json()
  } catch (error) {
    console.error('Failed to fetch tool resource:', error)
    notFound()
  }

  // JSON-LD Structured Data
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: resourceData.resource.name,
    description: resourceData.resource.description,
    applicationCategory: resourceData.resource.category,
    operatingSystem: 'Web',
    offers: resourceData.resource.pricing === 'Free' ? {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    } : {
      '@type': 'Offer',
      price: resourceData.resource.pricing?.replace('per month', '/month'),
      priceCurrency: 'USD',
    },
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
    author: {
      '@type': 'Organization',
      name: resourceData.resource.provider,
    },
    featureList: resourceData.resource.features,
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

        <ToolDetailClient
          resourceData={resourceData}
          resourceUrl={decodedUrl}
        />
      </div>
    </div>
    </>
  )
}
