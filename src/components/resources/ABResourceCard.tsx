"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { VariantConfig } from '@/lib/ab-testing'

interface Resource {
  title: string
  url: string
  author?: string
  description?: string
  rating?: number
  difficulty?: string
  type?: 'BOOK' | 'TOOL'
  skillCode: string
}

interface ABResourceCardProps {
  resource: Resource
  config: VariantConfig
  onTrackClick?: (resourceUrl: string, assignmentId: string) => void
  assignmentId?: string
}

export function ABResourceCard({ resource, config, onTrackClick, assignmentId }: ABResourceCardProps) {
  const [tracked, setTracked] = useState(false)

  const handleClick = () => {
    if (!tracked && onTrackClick && assignmentId) {
      onTrackClick(resource.url, assignmentId)
      setTracked(true)
    }
  }

  // Determine description length
  const getDescription = () => {
    if (!resource.description) return ''

    const words = resource.description.split(' ')
    switch (config.descriptionLength) {
      case 'short':
        return words.slice(0, 20).join(' ') + (words.length > 20 ? '...' : '')
      case 'medium':
        return words.slice(0, 50).join(' ') + (words.length > 50 ? '...' : '')
      case 'full':
      default:
        return resource.description
    }
  }

  // Vertical layout (default)
  if (config.layout === 'vertical') {
    return (
      <Card className="border-[#E5E0D8] hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          {/* Thumbnail */}
          {config.showThumbnail && (
            <div className={`mb-4 rounded-lg bg-gradient-to-br from-[#8DA399] to-[#6B8379] flex items-center justify-center ${
              config.thumbnailSize === 'small' ? 'h-32' : config.thumbnailSize === 'large' ? 'h-64' : 'h-48'
            }`}>
              <span className="text-white text-4xl">{resource.type === 'BOOK' ? '📖' : '🛠️'}</span>
            </div>
          )}

          {/* Title and CTA */}
          <div className={config.ctaPosition === 'top' ? 'flex flex-col gap-2 mb-4' : ''}>
            <Link href={`/resources/${resource.type?.toLowerCase()}/${encodeURIComponent(resource.url)}`}>
              <h3 className="text-xl font-bold text-[#2D2D2D] hover:text-[#8DA399] transition-colors">
                {resource.title}
              </h3>
            </Link>

            {config.ctaPosition === 'top' && (
              <Button
                asChild
                className="w-full bg-[#8DA399] hover:bg-[#6B8379] text-white"
                onClick={handleClick}
              >
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {resource.type === 'BOOK' ? 'View on Amazon →' : 'Explore Tool →'}
                </a>
              </Button>
            )}
          </div>

          {/* Author */}
          {resource.author && config.cardStyle === 'detailed' && (
            <p className="text-sm text-gray-600 mb-2">by {resource.author}</p>
          )}

          {/* Description */}
          {config.cardStyle !== 'minimal' && (
            <p className="text-gray-600 mb-4">{getDescription()}</p>
          )}

          {/* Metadata */}
          {config.cardStyle === 'detailed' && (
            <div className="flex items-center gap-3 text-sm">
              {resource.rating && (
                <span className="flex items-center gap-1 text-[#D4AF37]">
                  ⭐ {resource.rating}
                </span>
              )}
              {resource.difficulty && (
                <span className="px-2 py-1 bg-[#8DA399]/20 text-[#8DA399] rounded">
                  {resource.difficulty}
                </span>
              )}
            </div>
          )}

          {/* Bottom CTA */}
          {config.ctaPosition === 'bottom' && (
            <Button
              asChild
              className="w-full mt-4 bg-[#8DA399] hover:bg-[#6B8379] text-white"
              onClick={handleClick}
            >
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {resource.type === 'BOOK' ? 'View on Amazon →' : 'Explore Tool →'}
              </a>
            </Button>
          )}
        </CardContent>
      </Card>
    )
  }

  // Horizontal layout
  if (config.layout === 'horizontal') {
    return (
      <Card className="border-[#E5E0D8] hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex gap-6">
            {/* Thumbnail */}
            {config.showThumbnail && (
              <div className={`rounded-lg bg-gradient-to-br from-[#8DA399] to-[#6B8379] flex items-center justify-center flex-shrink-0 ${
                config.thumbnailSize === 'small' ? 'w-24 h-24' : config.thumbnailSize === 'large' ? 'w-48 h-48' : 'w-36 h-36'
              }`}>
                <span className="text-white text-3xl">{resource.type === 'BOOK' ? '📖' : '🛠️'}</span>
              </div>
            )}

            {/* Content */}
            <div className="flex-1">
              <Link href={`/resources/${resource.type?.toLowerCase()}/${encodeURIComponent(resource.url)}`}>
                <h3 className="text-xl font-bold text-[#2D2D2D] hover:text-[#8DA399] transition-colors mb-2">
                  {resource.title}
                </h3>
              </Link>

              {resource.author && config.cardStyle === 'detailed' && (
                <p className="text-sm text-gray-600 mb-2">by {resource.author}</p>
              )}

              {config.cardStyle !== 'minimal' && (
                <p className="text-gray-600 mb-3">{getDescription()}</p>
              )}

              {/* Metadata */}
              {config.cardStyle === 'detailed' && (
                <div className="flex items-center gap-3 text-sm mb-3">
                  {resource.rating && (
                    <span className="flex items-center gap-1 text-[#D4AF37]">
                      ⭐ {resource.rating}
                    </span>
                  )}
                  {resource.difficulty && (
                    <span className="px-2 py-1 bg-[#8DA399]/20 text-[#8DA399] rounded">
                      {resource.difficulty}
                    </span>
                  )}
                </div>
              )}

              {/* CTA */}
              {config.ctaPosition === 'inline' ? (
                <Button
                  asChild
                  className="bg-[#8DA399] hover:bg-[#6B8379] text-white"
                  onClick={handleClick}
                >
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {resource.type === 'BOOK' ? 'View →' : 'Explore →'}
                  </a>
                </Button>
              ) : (
                <Button
                  asChild
                  className="bg-[#8DA399] hover:bg-[#6B8379] text-white"
                  onClick={handleClick}
                >
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {resource.type === 'BOOK' ? 'View on Amazon →' : 'Explore Tool →'}
                  </a>
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Grid layout (for future use)
  return null
}
