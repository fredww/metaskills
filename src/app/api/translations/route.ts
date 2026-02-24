/**
 * Translation Progress API
 * GET /api/translations - Get overall translation status
 */

import { NextResponse } from 'next/server';
import { getOverallTranslationStatus, getTranslationProgress } from '@/lib/translations';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') as 'meta_skills' | 'practices' | 'articles' | null;

    if (type) {
      // Get detailed progress for specific content type
      const progress = await getTranslationProgress(type);
      return NextResponse.json({
        contentType: type,
        items: progress,
        total: progress.length,
        translated: progress.filter(p => p.percentage === 100).length,
        averagePercentage: Math.round(
          progress.reduce((sum, p) => sum + p.percentage, 0) / progress.length
        )
      });
    } else {
      // Get overall status
      const status = await getOverallTranslationStatus();
      return NextResponse.json(status);
    }
  } catch (error) {
    console.error('Error fetching translation status:', error);
    return NextResponse.json(
      { error: 'Failed to fetch translation status' },
      { status: 500 }
    );
  }
}
