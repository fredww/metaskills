/**
 * Single Skill Translation API
 * GET /api/translations/skills/:code - Get all translations for a skill
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params;

    const skill = await prisma.metaSkill.findUnique({
      where: { code },
      include: {
        translations: {
          orderBy: { locale: 'asc' }
        }
      }
    });

    if (!skill) {
      return NextResponse.json(
        { error: 'Skill not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      skill: {
        id: skill.id,
        code: skill.code,
        domain: skill.domain,
        stage: skill.stage,
        order: skill.order
      },
      translations: skill.translations,
      stats: {
        totalLocales: 7,
        translated: skill.translations.length,
        byStatus: skill.translations.reduce((acc, t) => {
          acc[t.status] = (acc[t.status] || 0) + 1;
          return acc;
        }, {} as Record<string, number>)
      }
    });
  } catch (error) {
    console.error('Error fetching skill translations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch skill translations' },
      { status: 500 }
    );
  }
}
