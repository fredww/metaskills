/**
 * Export Translations API
 * GET /api/translations/export?type=skills&locale=zh-CN&format=xlsx
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') as 'skills' | 'practices' | 'articles';
    const locale = searchParams.get('locale') || 'all';
    const format = searchParams.get('format') || 'json';

    if (!type || !['skills', 'practices', 'articles'].includes(type)) {
      return NextResponse.json(
        { error: 'Invalid type. Must be: skills, practices, or articles' },
        { status: 400 }
      );
    }

    let data: any[] = [];

    switch (type) {
      case 'skills':
        data = await prisma.metaSkillTranslation.findMany({
          where: locale !== 'all' ? { locale } : undefined,
          include: {
            skill: {
              select: {
                code: true,
                domain: true,
                stage: true
              }
            }
          },
          orderBy: [{ skill: { code: 'asc' } }, { locale: 'asc' }]
        });
        break;

      case 'practices':
        data = await prisma.practiceTranslation.findMany({
          where: locale !== 'all' ? { locale } : undefined,
          include: {
            practice: {
              select: {
                id: true,
                skillId: true,
                duration: true,
                difficulty: true
              }
            }
          },
          orderBy: [{ practiceId: 'asc' }, { locale: 'asc' }]
        });
        break;

      case 'articles':
        data = await prisma.articleTranslation.findMany({
          where: locale !== 'all' ? { locale } : undefined,
          include: {
            article: {
              select: {
                slug: true,
                type: true,
                skillCode: true
              }
            }
          },
          orderBy: [{ articleId: 'asc' }, { locale: 'asc' }]
        });
        break;
    }

    if (format === 'json') {
      return NextResponse.json({
        type,
        locale,
        exportDate: new Date().toISOString(),
        total: data.length,
        data
      });
    }

    // For other formats (xlsx, csv), you would need to implement
    // conversion logic here. For now, return JSON with a note
    return NextResponse.json({
      type,
        locale,
        format,
        note: 'XLSX and CSV export coming soon. Use JSON format for now.',
      data
    });
  } catch (error) {
    console.error('Error exporting translations:', error);
    return NextResponse.json(
      { error: 'Failed to export translations' },
      { status: 500 }
    );
  }
}
