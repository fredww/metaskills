/**
 * Skills Translation Management API
 * GET /api/translations/skills - List all skills with translation status
 * POST /api/translations/skills - Bulk create/update translations
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { invalidateTranslationCache } from '@/lib/translations';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale');
    const status = searchParams.get('status');

    const where: any = {};
    if (locale) where.locale = locale;
    if (status) where.status = status;

    const translations = await prisma.metaSkillTranslation.findMany({
      where,
      include: {
        skill: {
          select: {
            code: true,
            domain: true,
            stage: true
          }
        }
      },
      orderBy: [
        { locale: 'asc' },
        { status: 'asc' }
      ]
    });

    return NextResponse.json({
      total: translations.length,
      translations
    });
  } catch (error) {
    console.error('Error fetching skill translations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch skill translations' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { translations } = body;

    if (!Array.isArray(translations)) {
      return NextResponse.json(
        { error: 'translations must be an array' },
        { status: 400 }
      );
    }

    const results = [];

    for (const item of translations) {
      const { code, locale, ...data } = item;

      // Find the skill
      const skill = await prisma.metaSkill.findUnique({
        where: { code }
      });

      if (!skill) {
        results.push({ code, locale, success: false, error: 'Skill not found' });
        continue;
      }

      // Upsert translation
      const translation = await prisma.metaSkillTranslation.upsert({
        where: {
          skillId_locale: {
            skillId: skill.id,
            locale
          }
        },
        update: {
          ...data,
          updatedAt: new Date()
        },
        create: {
          skillId: skill.id,
          locale,
          ...data
        }
      });

      results.push({
        code,
        locale,
        success: true,
        id: translation.id
      });
    }

    // Invalidate cache
    invalidateTranslationCache('skills');

    return NextResponse.json({
      success: true,
      processed: results.length,
      results
    });
  } catch (error) {
    console.error('Error creating skill translations:', error);
    return NextResponse.json(
      { error: 'Failed to create skill translations' },
      { status: 500 }
    );
  }
}
