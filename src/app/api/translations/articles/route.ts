/**
 * Articles Translation Management API
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

    const translations = await prisma.articleTranslation.findMany({
      where,
      include: {
        article: {
          select: {
            id: true,
            slug: true,
            type: true,
            skillCode: true,
            isPublished: true
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
    console.error('Error fetching article translations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch article translations' },
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
      const { slug, locale, ...data } = item;

      // Find the article
      const article = await prisma.article.findUnique({
        where: { slug }
      });

      if (!article) {
        results.push({ slug, locale, success: false, error: 'Article not found' });
        continue;
      }

      // Upsert translation
      const translation = await prisma.articleTranslation.upsert({
        where: {
          articleId_locale: {
            articleId: article.id,
            locale
          }
        },
        update: {
          ...data,
          updatedAt: new Date()
        },
        create: {
          articleId: article.id,
          locale,
          ...data
        }
      });

      results.push({
        slug,
        locale,
        success: true,
        id: translation.id
      });
    }

    invalidateTranslationCache('articles');

    return NextResponse.json({
      success: true,
      processed: results.length,
      results
    });
  } catch (error) {
    console.error('Error creating article translations:', error);
    return NextResponse.json(
      { error: 'Failed to create article translations' },
      { status: 500 }
    );
  }
}
