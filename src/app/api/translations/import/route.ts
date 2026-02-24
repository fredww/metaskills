/**
 * Import Translations API
 * POST /api/translations/import
 * Body: FormData with file
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { invalidateTranslationCache } from '@/lib/translations';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as 'skills' | 'practices' | 'articles';
    const locale = formData.get('locale') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    if (!type || !['skills', 'practices', 'articles'].includes(type)) {
      return NextResponse.json(
        { error: 'Invalid type. Must be: skills, practices, or articles' },
        { status: 400 }
      );
    }

    if (!locale) {
      return NextResponse.json(
        { error: 'Locale is required' },
        { status: 400 }
      );
    }

    // Parse file (assuming JSON for now)
    const text = await file.text();
    const data = JSON.parse(text);

    let results: any[] = [];

    switch (type) {
      case 'skills':
        results = await importSkillTranslations(data, locale);
        break;
      case 'practices':
        results = await importPracticeTranslations(data, locale);
        break;
      case 'articles':
        results = await importArticleTranslations(data, locale);
        break;
    }

    // Invalidate cache
    invalidateTranslationCache(type);

    return NextResponse.json({
      success: true,
      type,
      locale,
      processed: results.length,
      succeeded: results.filter(r => r.success).length,
      failed: results.filter(r => !r.success).length,
      results
    });
  } catch (error) {
    console.error('Error importing translations:', error);
    return NextResponse.json(
      { error: 'Failed to import translations', details: error.message },
      { status: 500 }
    );
  }
}

async function importSkillTranslations(data: any[], locale: string) {
  const results = [];

  for (const item of data) {
    try {
      const { code, ...translationData } = item;

      const skill = await prisma.metaSkill.findUnique({
        where: { code }
      });

      if (!skill) {
        results.push({ code, success: false, error: 'Skill not found' });
        continue;
      }

      const translation = await prisma.metaSkillTranslation.upsert({
        where: {
          skillId_locale: {
            skillId: skill.id,
            locale
          }
        },
        update: {
          ...translationData,
          updatedAt: new Date()
        },
        create: {
          skillId: skill.id,
          locale,
          ...translationData
        }
      });

      results.push({ code, success: true, id: translation.id });
    } catch (error) {
      results.push({
        code: item.code,
        success: false,
        error: error.message
      });
    }
  }

  return results;
}

async function importPracticeTranslations(data: any[], locale: string) {
  const results = [];

  for (const item of data) {
    try {
      const { practiceId, ...translationData } = item;

      const translation = await prisma.practiceTranslation.upsert({
        where: {
          practiceId_locale: {
            practiceId,
            locale
          }
        },
        update: {
          ...translationData,
          updatedAt: new Date()
        },
        create: {
          practiceId,
          locale,
          ...translationData
        }
      });

      results.push({ practiceId, success: true, id: translation.id });
    } catch (error) {
      results.push({
        practiceId: item.practiceId,
        success: false,
        error: error.message
      });
    }
  }

  return results;
}

async function importArticleTranslations(data: any[], locale: string) {
  const results = [];

  for (const item of data) {
    try {
      const { slug, ...translationData } = item;

      const article = await prisma.article.findUnique({
        where: { slug }
      });

      if (!article) {
        results.push({ slug, success: false, error: 'Article not found' });
        continue;
      }

      const translation = await prisma.articleTranslation.upsert({
        where: {
          articleId_locale: {
            articleId: article.id,
            locale
          }
        },
        update: {
          ...translationData,
          updatedAt: new Date()
        },
        create: {
          articleId: article.id,
          locale,
          ...translationData
        }
      });

      results.push({ slug, success: true, id: translation.id });
    } catch (error) {
      results.push({
        slug: item.slug,
        success: false,
        error: error.message
      });
    }
  }

  return results;
}
