// Helper functions for tracking resource clicks

export interface ResourceClickData {
  resourceType: 'BOOK' | 'TOOL' | 'COURSE' | 'ARTICLE' | 'VIDEO'
  resourceTitle: string
  resourceUrl: string
  skillCode: string
  clickSource: 'SKILL_PAGE' | 'PRACTICE_MODAL' | 'DASHBOARD' | 'RECOMMENDATION_EMAIL'
  metadata?: Record<string, any>
}

/**
 * Track a resource click event
 * This function sends the click data to the backend API
 * It works silently in the background - errors are logged but don't affect user experience
 */
export async function trackResourceClick(data: ResourceClickData): Promise<void> {
  try {
    await fetch('/api/resources/click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
  } catch (error) {
    // Silent fail - tracking shouldn't affect user experience
    console.error('Failed to track resource click:', error)
  }
}

/**
 * Track a book click
 */
export async function trackBookClick(
  bookTitle: string,
  bookUrl: string,
  skillCode: string,
  clickSource: ResourceClickData['clickSource'],
  metadata?: Record<string, any>
): Promise<void> {
  return trackResourceClick({
    resourceType: 'BOOK',
    resourceTitle: bookTitle,
    resourceUrl: bookUrl,
    skillCode,
    clickSource,
    metadata
  })
}

/**
 * Track a tool click
 */
export async function trackToolClick(
  toolName: string,
  toolUrl: string,
  skillCode: string,
  clickSource: ResourceClickData['clickSource'],
  metadata?: Record<string, any>
): Promise<void> {
  return trackResourceClick({
    resourceType: 'TOOL',
    resourceTitle: toolName,
    resourceUrl: toolUrl,
    skillCode,
    clickSource,
    metadata
  })
}

/**
 * Wrap an onClick handler to track the click
 * Usage: onClick={withTracking(handleClick, clickData)}
 */
export function withTracking(
  originalHandler?: () => void,
  clickData?: ResourceClickData
): () => void {
  return () => {
    // Track the click
    if (clickData) {
      trackResourceClick(clickData)
    }

    // Execute original handler
    if (originalHandler) {
      originalHandler()
    }
  }
}
