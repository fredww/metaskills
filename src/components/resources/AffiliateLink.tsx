'use client'

import { useEffect, useState } from 'react'
import { generateAffiliateLink } from '@/lib/amazon-affiliate'

interface AffiliateLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  target?: string
  rel?: string
}

/**
 * Wrapper component for affiliate links that ensures
 * link generation only happens on the client side
 * to prevent hydration mismatches
 */
export function AffiliateLink({ href, children, className, target, rel }: AffiliateLinkProps) {
  const [affiliateUrl, setAffiliateUrl] = useState(href)

  useEffect(() => {
    // Generate affiliate link only on client side
    setAffiliateUrl(generateAffiliateLink(href))
  }, [href])

  return (
    <a href={affiliateUrl} className={className} target={target} rel={rel}>
      {children}
    </a>
  )
}
