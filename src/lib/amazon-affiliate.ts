/**
 * Amazon Affiliate Link Management
 * For Amazon Associates Program integration
 */

// Your Amazon Associates tracking ID
// Set this in .env.local: NEXT_PUBLIC_AMAZON_ASSOCIATES_TAG=metaskillsai-20
const AMAZON_ASSOCIATES_TAG = process.env.NEXT_PUBLIC_AMAZON_ASSOCIATES_TAG || 'metaskills-20'

// Feature flag: enable/disable affiliate links
const AFFILIATE_ENABLED = process.env.NEXT_PUBLIC_AFFILIATE_ENABLED !== 'false'

/**
 * Convert Amazon URL to affiliate link
 */
export function addAffiliateTag(originalUrl: string): string {
  // If affiliate links disabled, return original URL
  if (!AFFILIATE_ENABLED) {
    return originalUrl
  }

  // Only process Amazon URLs
  if (!isAmazonUrl(originalUrl)) {
    return originalUrl
  }

  try {
    const url = new URL(originalUrl)

    // Add or replace the tag parameter
    url.searchParams.set('tag', AMAZON_ASSOCIATES_TAG)

    return url.toString()
  } catch (error) {
    console.error('Invalid Amazon URL:', originalUrl)
    return originalUrl
  }
}

/**
 * Check if URL is an Amazon URL
 */
function isAmazonUrl(url: string): boolean {
  try {
    const urlObj = new URL(url)
    const amazonDomains = [
      'amazon.com',
      'amazon.co.uk',
      'amazon.de',
      'amazon.fr',
      'amazon.es',
      'amazon.it',
      'amazon.co.jp',
      'amazon.cn'
    ]
    return amazonDomains.some(domain => urlObj.hostname === domain || urlObj.hostname.endsWith(`.${domain}`))
  } catch {
    return false
  }
}

/**
 * Extract Amazon Product ID (ASIN) from URL
 */
export function extractASIN(url: string): string | null {
  const patterns = [
    /\/dp\/([A-Z0-9]{10})/i,
    /\/gp\/product\/([A-Z0-9]{10})/i,
    /\/ASIN\/([A-Z0-9]{10})/i,
    /\/dp\/product\/([A-Z0-9]{10})/i
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }

  return null
}

/**
 * Generate Amazon affiliate link with tracking parameters
 * This is the main function to use for generating affiliate links
 */
export function generateAffiliateLink(
  originalUrl: string,
  options?: {
    userId?: string
    source?: 'skill_page' | 'practice_modal' | 'dashboard' | 'recommendation'
    referralCode?: string
  }
): string {
  const affiliateUrl = addAffiliateTag(originalUrl)

  // If not an affiliate URL (disabled or non-Amazon), return as-is
  if (affiliateUrl === originalUrl) {
    return originalUrl
  }

  try {
    const url = new URL(affiliateUrl)

    // Track which user referred this (for potential revenue sharing)
    if (options?.userId) {
      url.searchParams.set('refId', options.userId.substring(0, 8))
    }

    // Track referral code if provided
    if (options?.referralCode) {
      url.searchParams.set('referralCode', options.referralCode)
    }

    // Track where the click came from
    if (options?.source) {
      url.searchParams.set('ref_', options.source)
    }

    return url.toString()
  } catch (error) {
    console.error('Error generating affiliate link:', error)
    return originalUrl
  }
}

/**
 * Generate short Amazon affiliate link
 * For better UX in sharing
 */
export function generateShortAffiliateLink(asin: string): string {
  if (!AFFILIATE_ENABLED) {
    return `https://www.amazon.com/dp/${asin}`
  }

  return `https://www.amazon.com/dp/${asin}?tag=${AMAZON_ASSOCIATES_TAG}`
}
