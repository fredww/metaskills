/**
 * Practices Translation Management API
 * Similar structure to skills API
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { invalidateTranslationCache } from '@/lib/translations';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale');
    const status = searchParams.get('status');
    const skillCode = searchParams.get('skillCode');

    const where: any = {};
    if (locale) where.locale = locale;
    if (status) where.status = status;
    if (skillCode) {
      const skill = await prisma.metaSkill.findUnique({
        where: { code: skillCode }
      });
      if (skill) {
        where.practice = {
          skillId: skill.id
        };
      }
    }

    const translations = await prisma.practiceTranslation.findMany({
      where,
      include: {
        practice: {
          select: {
            id: true,
            skillId: true,
            duration: true,
            difficulty: true,
            emotionTone: true
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
    console.error('Error fetching practice translations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch practice translations' },
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
      const { practiceId, locale, ...data } = item;

      // Upsert translation
      const translation = await prisma.practiceTranslation.upsert({
        where: {
          practiceId_locale: {
            practiceId,
            locale
          }
        },
        update: {
          ...data,
          updatedAt: new Date()
        },
        create: {
          practiceId,
          locale,
          ...data
        }
      });

      results.push({
        practiceId,
        locale,
        success: true,
        id: translation.id
      });
    }

    invalidateTranslationCache('practices');

    return NextResponse.json({
      success: true,
      processed: results.length,
      results
    });
  } catch (error) {
    console.error('Error creating practice translations:', error);
    return NextResponse.json(
      { error: 'Failed to create practice translations' },
      { status: 500 }
    );
  }
}
