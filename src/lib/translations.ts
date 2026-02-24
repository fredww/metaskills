/**
 * Professional Translation Management Library
 * Handles all translation operations with caching and fallback support
 */

import { prisma } from '@/lib/prisma';
import type { Locale } from '@/i18n/locales';
import type { MetaSkill, Practice, Article } from '@prisma/client';

// ============================================================================
// Types
// ============================================================================

export type TranslationStatus = 'DRAFT' | 'PENDING' | 'REVIEWED' | 'PUBLISHED' | 'ARCHIVED';

export interface LocalizedSkill {
  id: string;
  code: string;
  domain: string;
  stage: number;
  title: string;
  description: string;
  definition?: string;
  whyImportant?: string;
  locale: string;
}

export interface LocalizedPractice {
  id: string;
  skillId: string;
  duration: number;
  difficulty: string;
  emotionTone: string;
  title: string;
  description: string;
  instructions: any;
  benefits: string[];
  tips: string[];
  locale: string;
}

export interface LocalizedArticle {
  id: string;
  slug: string;
  type: string;
  skillCode?: string | null;
  title: string;
  content: string;
  excerpt: string;
  authorName: string;
  authorTitle: string;
  authorImage?: string | null;
  coverImage?: string | null;
  category?: string | null;
  locale: string;
}

export interface TranslationProgress {
  contentType: string;
  itemCode: string;
  hasEn: number;
  hasZhCn: number;
  hasDe: number;
  hasJa: number;
  hasFr: number;
  hasEs: number;
  hasKo: number;
  totalTranslations: number;
  requiredTranslations: number;
  percentage: number;
}

// ============================================================================
// Cache Configuration
// ============================================================================

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const translationCache = new Map<string, { data: any; timestamp: number }>();

function getCached<T>(key: string): T | null {
  const cached = translationCache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data as T;
  }
  return null;
}

function setCached<T>(key: string, data: T): void {
  translationCache.set(key, { data, timestamp: Date.now() });
}

function clearCache(pattern?: string): void {
  if (pattern) {
    for (const key of translationCache.keys()) {
      if (key.includes(pattern)) {
        translationCache.delete(key);
      }
    }
  } else {
    translationCache.clear();
  }
}

// ============================================================================
// MetaSkills Translation
// ============================================================================

/**
 * Get all skills with translations for a specific locale
 * Falls back to English if translation not available
 */
export async function getSkills(locale: Locale = 'en'): Promise<LocalizedSkill[]> {
  const cacheKey = `skills:${locale}`;
  const cached = getCached<LocalizedSkill[]>(cacheKey);
  if (cached) return cached;

  // Try to get translations for requested locale
  let skills = await prisma.$queryRaw`
    SELECT
      ms.id,
      ms.code,
      ms.domain,
      ms.stage,
      COALESCE(tst.title, ms.code) as title,
      COALESCE(tst.description, '') as description,
      tst.definition,
      tst."whyImportant",
      COALESCE(tst.locale, 'en') as locale
    FROM "meta_skills" ms
    LEFT JOIN "meta_skill_translations" tst
      ON ms.id = tst."skillId"
      AND tst.locale = ${locale}
      AND tst.status = 'PUBLISHED'
    ORDER BY ms.domain, ms."order"
  ` as LocalizedSkill[];

  // Fill missing translations with English fallbacks
  for (const skill of skills) {
    if (!skill.title || skill.title === skill.code) {
      const enTranslation = await prisma.$queryRaw`
        SELECT title, description, definition, "whyImportant"
        FROM "meta_skill_translations"
        WHERE "skillId" = ${skill.id}
          AND locale = 'en'
          AND status = 'PUBLISHED'
        LIMIT 1
      ` as any[];

      if (enTranslation.length > 0) {
        skill.title = enTranslation[0].title;
        skill.description = enTranslation[0].description || skill.description;
        skill.definition = enTranslation[0].definition;
        skill.whyImportant = enTranslation[0].whyImportant;
      }
    }
  }

  setCached(cacheKey, skills);
  return skills;
}

/**
 * Get a single skill by code with translation
 */
export async function getSkillByCode(code: string, locale: Locale = 'en'): Promise<LocalizedSkill | null> {
  const cacheKey = `skill:${code}:${locale}`;
  const cached = getCached<LocalizedSkill>(cacheKey);
  if (cached) return cached;

  const result = await prisma.$queryRaw`
    SELECT
      ms.id,
      ms.code,
      ms.domain,
      ms.stage,
      COALESCE(tst.title, en_tst.title, ms.code) as title,
      COALESCE(tst.description, en_tst.description, '') as description,
      COALESCE(tst.definition, en_tst.definition) as definition,
      COALESCE(tst."whyImportant", en_tst."whyImportant") as "whyImportant",
      COALESCE(tst.locale, en_tst.locale, 'en') as locale
    FROM "meta_skills" ms
    LEFT JOIN "meta_skill_translations" tst
      ON ms.id = tst."skillId"
      AND tst.locale = ${locale}
      AND tst.status = 'PUBLISHED'
    LEFT JOIN "meta_skill_translations" en_tst
      ON ms.id = en_tst."skillId"
      AND en_tst.locale = 'en'
      AND en_tst.status = 'PUBLISHED'
    WHERE ms.code = ${code}
    LIMIT 1
  ` as LocalizedSkill[];

  if (result.length > 0) {
    setCached(cacheKey, result[0]);
    return result[0];
  }

  return null;
}

/**
 * Get skills by domain with translations
 */
export async function getSkillsByDomain(domain: string, locale: Locale = 'en'): Promise<LocalizedSkill[]> {
  const cacheKey = `skills:${domain}:${locale}`;
  const cached = getCached<LocalizedSkill[]>(cacheKey);
  if (cached) return cached;

  const skills = await prisma.$queryRaw`
    SELECT
      ms.id,
      ms.code,
      ms.domain,
      ms.stage,
      COALESCE(tst.title, en_tst.title, ms.code) as title,
      COALESCE(tst.description, en_tst.description, '') as description,
      COALESCE(tst.definition, en_tst.definition) as definition,
      COALESCE(tst."whyImportant", en_tst."whyImportant") as "whyImportant",
      COALESCE(tst.locale, en_tst.locale, 'en') as locale
    FROM "meta_skills" ms
    LEFT JOIN "meta_skill_translations" tst
      ON ms.id = tst."skillId"
      AND tst.locale = ${locale}
      AND tst.status = 'PUBLISHED'
    LEFT JOIN "meta_skill_translations" en_tst
      ON ms.id = en_tst."skillId"
      AND en_tst.locale = 'en'
      AND en_tst.status = 'PUBLISHED'
    WHERE ms.domain = ${domain}::text
    ORDER BY ms."order"
  ` as LocalizedSkill[];

  setCached(cacheKey, skills);
  return skills;
}

// ============================================================================
// Practices Translation
// ============================================================================

export async function getPracticesBySkill(skillCode: string, locale: Locale = 'en'): Promise<LocalizedPractice[]> {
  const cacheKey = `practices:${skillCode}:${locale}`;
  const cached = getCached<LocalizedPractice[]>(cacheKey);
  if (cached) return cached;

  const practices = await prisma.$queryRaw`
    SELECT
      p.id,
      p."skillId",
      p.duration,
      p.difficulty,
      p."emotionTone",
      COALESCE(pt.title, en_pt.title, 'Practice') as title,
      COALESCE(pt.description, en_pt.description, '') as description,
      COALESCE(pt.instructions, en_pt.instructions, '{}'::jsonb) as instructions,
      COALESCE(pt.benefits, en_pt.benefits, '{}') as benefits,
      COALESCE(pt.tips, en_pt.tips, '{}') as tips,
      COALESCE(pt.locale, en_pt.locale, 'en') as locale
    FROM "practices" p
    LEFT JOIN "practice_translations" pt
      ON p.id = pt."practiceId"
      AND pt.locale = ${locale}
      AND pt.status = 'PUBLISHED'
    LEFT JOIN "practice_translations" en_pt
      ON p.id = en_pt."practiceId"
      AND en_pt.locale = 'en'
      AND en_pt.status = 'PUBLISHED'
    JOIN "meta_skills" ms ON p."skillId" = ms.id
    WHERE ms.code = ${skillCode}
    ORDER BY p."order"
  ` as LocalizedPractice[];

  setCached(cacheKey, practices);
  return practices;
}

export async function getPracticeById(id: string, locale: Locale = 'en'): Promise<LocalizedPractice | null> {
  const cacheKey = `practice:${id}:${locale}`;
  const cached = getCached<LocalizedPractice>(cacheKey);
  if (cached) return cached;

  const result = await prisma.$queryRaw`
    SELECT
      p.id,
      p."skillId",
      p.duration,
      p.difficulty,
      p."emotionTone",
      COALESCE(pt.title, en_pt.title, 'Practice') as title,
      COALESCE(pt.description, en_pt.description, '') as description,
      COALESCE(pt.instructions, en_pt.instructions, '{}'::jsonb) as instructions,
      COALESCE(pt.benefits, en_pt.benefits, '{}') as benefits,
      COALESCE(pt.tips, en_pt.tips, '{}') as tips,
      COALESCE(pt.locale, en_pt.locale, 'en') as locale
    FROM "practices" p
    LEFT JOIN "practice_translations" pt
      ON p.id = pt."practiceId"
      AND pt.locale = ${locale}
      AND pt.status = 'PUBLISHED'
    LEFT JOIN "practice_translations" en_pt
      ON p.id = en_pt."practiceId"
      AND en_pt.locale = 'en'
      AND en_pt.status = 'PUBLISHED'
    WHERE p.id = ${id}
    LIMIT 1
  ` as LocalizedPractice[];

  if (result.length > 0) {
    setCached(cacheKey, result[0]);
    return result[0];
  }

  return null;
}

// ============================================================================
// Articles Translation
// ============================================================================

export async function getArticles(locale: Locale = 'en', limit: number = 10): Promise<LocalizedArticle[]> {
  const cacheKey = `articles:${locale}:${limit}`;
  const cached = getCached<LocalizedArticle[]>(cacheKey);
  if (cached) return cached;

  const articles = await prisma.$queryRaw`
    SELECT
      a.id,
      a.slug,
      a.type,
      a."skillCode",
      a."authorName",
      a."authorTitle",
      a."authorImage",
      a."coverImage",
      a.category,
      COALESCE(at.title, en_at.title, 'Untitled') as title,
      COALESCE(at.content, en_at.content, '') as content,
      COALESCE(at.excerpt, en_at.excerpt, '') as excerpt,
      COALESCE(at.locale, en_at.locale, 'en') as locale
    FROM "articles" a
    LEFT JOIN "article_translations" at
      ON a.id = at."articleId"
      AND at.locale = ${locale}
      AND at.status = 'PUBLISHED'
      AND at."isPublished" = true
    LEFT JOIN "article_translations" en_at
      ON a.id = en_at."articleId"
      AND en_at.locale = 'en'
      AND en_at.status = 'PUBLISHED'
      AND en_at."isPublished" = true
    WHERE a."isPublished" = true
    ORDER BY a."publishedAt" DESC
    LIMIT ${limit}
  ` as LocalizedArticle[];

  setCached(cacheKey, articles);
  return articles;
}

export async function getArticleBySlug(slug: string, locale: Locale = 'en'): Promise<LocalizedArticle | null> {
  const cacheKey = `article:${slug}:${locale}`;
  const cached = getCached<LocalizedArticle>(cacheKey);
  if (cached) return cached;

  const result = await prisma.$queryRaw`
    SELECT
      a.id,
      a.slug,
      a.type,
      a."skillCode",
      a."authorName",
      a."authorTitle",
      a."authorImage",
      a."coverImage",
      a.category,
      a.views,
      a.likes,
      COALESCE(at.title, en_at.title, 'Untitled') as title,
      COALESCE(at.content, en_at.content, '') as content,
      COALESCE(at.excerpt, en_at.excerpt, '') as excerpt,
      COALESCE(at.locale, en_at.locale, 'en') as locale
    FROM "articles" a
    LEFT JOIN "article_translations" at
      ON a.id = at."articleId"
      AND at.locale = ${locale}
      AND at.status = 'PUBLISHED'
      AND at."isPublished" = true
    LEFT JOIN "article_translations" en_at
      ON a.id = en_at."articleId"
      AND en_at.locale = 'en'
      AND en_at.status = 'PUBLISHED'
      AND en_at."isPublished" = true
    WHERE a.slug = ${slug}
      AND a."isPublished" = true
    LIMIT 1
  ` as LocalizedArticle[];

  if (result.length > 0) {
    // Increment view count asynchronously
    prisma.article.update({
      where: { id: result[0].id },
      data: { views: { increment: 1 } }
    }).catch(console.error);

    setCached(cacheKey, result[0]);
    return result[0];
  }

  return null;
}

// ============================================================================
// Translation Status & Progress
// ============================================================================

export async function getTranslationProgress(contentType?: 'meta_skills' | 'practices' | 'articles'): Promise<TranslationProgress[]> {
  let query = '';

  if (contentType === 'meta_skills') {
    query = `
      SELECT
        'meta_skills' as "contentType",
        ms.code as "itemCode",
        COUNT(DISTINCT CASE WHEN tst.locale = 'en' THEN 1 END) as "hasEn",
        COUNT(DISTINCT CASE WHEN tst.locale = 'zh-CN' THEN 1 END) as "hasZhCn",
        COUNT(DISTINCT CASE WHEN tst.locale = 'de' THEN 1 END) as "hasDe",
        COUNT(DISTINCT CASE WHEN tst.locale = 'ja' THEN 1 END) as "hasJa",
        COUNT(DISTINCT CASE WHEN tst.locale = 'fr' THEN 1 END) as "hasFr",
        COUNT(DISTINCT CASE WHEN tst.locale = 'es' THEN 1 END) as "hasEs",
        COUNT(DISTINCT CASE WHEN tst.locale = 'ko' THEN 1 END) as "hasKo",
        COUNT(DISTINCT tst.locale) as "totalTranslations",
        7 as "requiredTranslations"
      FROM "meta_skills" ms
      LEFT JOIN "meta_skill_translations" tst ON ms.id = tst."skillId" AND tst.status = 'PUBLISHED'
      GROUP BY ms.code
    `;
  } else if (contentType === 'practices') {
    query = `
      SELECT
        'practices' as "contentType",
        p.id as "itemCode",
        COUNT(DISTINCT CASE WHEN pt.locale = 'en' THEN 1 END) as "hasEn",
        COUNT(DISTINCT CASE WHEN pt.locale = 'zh-CN' THEN 1 END) as "hasZhCn",
        COUNT(DISTINCT CASE WHEN pt.locale = 'de' THEN 1 END) as "hasDe",
        COUNT(DISTINCT CASE WHEN pt.locale = 'ja' THEN 1 END) as "hasJa",
        COUNT(DISTINCT CASE WHEN pt.locale = 'fr' THEN 1 END) as "hasFr",
        COUNT(DISTINCT CASE WHEN pt.locale = 'es' THEN 1 END) as "hasEs",
        COUNT(DISTINCT CASE WHEN pt.locale = 'ko' THEN 1 END) as "hasKo",
        COUNT(DISTINCT pt.locale) as "totalTranslations",
        7 as "requiredTranslations"
      FROM "practices" p
      LEFT JOIN "practice_translations" pt ON p.id = pt."practiceId" AND pt.status = 'PUBLISHED'
      GROUP BY p.id
    `;
  } else if (contentType === 'articles') {
    query = `
      SELECT
        'articles' as "contentType",
        a.slug as "itemCode",
        COUNT(DISTINCT CASE WHEN at.locale = 'en' THEN 1 END) as "hasEn",
        COUNT(DISTINCT CASE WHEN at.locale = 'zh-CN' THEN 1 END) as "hasZhCn",
        COUNT(DISTINCT CASE WHEN at.locale = 'de' THEN 1 END) as "hasDe",
        COUNT(DISTINCT CASE WHEN at.locale = 'ja' THEN 1 END) as "hasJa",
        COUNT(DISTINCT CASE WHEN at.locale = 'fr' THEN 1 END) as "hasFr",
        COUNT(DISTINCT CASE WHEN at.locale = 'es' THEN 1 END) as "hasEs",
        COUNT(DISTINCT CASE WHEN at.locale = 'ko' THEN 1 END) as "hasKo",
        COUNT(DISTINCT at.locale) as "totalTranslations",
        7 as "requiredTranslations"
      FROM "articles" a
      LEFT JOIN "article_translations" at ON a.id = at."articleId" AND at.status = 'PUBLISHED'
      GROUP BY a.slug
    `;
  }

  const results = await prisma.$queryRawUnsafe(query) as any[];

  // Calculate percentage
  return results.map(r => ({
    ...r,
    totalTranslations: Number(r.totalTranslations),
    requiredTranslations: Number(r.requiredTranslations),
    percentage: Math.round((Number(r.totalTranslations) / Number(r.requiredTranslations)) * 100)
  }));
}

export async function getOverallTranslationStatus(): Promise<{
  totalSkills: number;
  totalPractices: number;
  totalArticles: number;
  translatedSkills: number;
  translatedPractices: number;
  translatedArticles: number;
  overallPercentage: number;
}> {
  const [skillCount, practiceCount, articleCount] = await Promise.all([
    prisma.metaSkill.count(),
    prisma.practice.count(),
    prisma.article.count({ where: { isPublished: true } })
  ]);

  const [skillTranslations, practiceTranslations, articleTranslations] = await Promise.all([
    prisma.metaSkillTranslation.count({ where: { status: 'PUBLISHED' } }),
    prisma.practiceTranslation.count({ where: { status: 'PUBLISHED' } }),
    prisma.articleTranslation.count({ where: { status: 'PUBLISHED', isPublished: true } })
  ]);

  const requiredTranslations = 7; // en, zh-CN, de, ja, fr, es, ko
  const translatedSkills = Math.round(skillTranslations / requiredTranslations);
  const translatedPractices = Math.round(practiceTranslations / requiredTranslations);
  const translatedArticles = Math.round(articleTranslations / requiredTranslations);

  return {
    totalSkills: skillCount,
    totalPractices: practiceCount,
    totalArticles: articleCount,
    translatedSkills,
    translatedPractices,
    translatedArticles,
    overallPercentage: Math.round(
      ((translatedSkills + translatedPractices + translatedArticles) /
        (skillCount + practiceCount + articleCount)) * 100
    )
  };
}

// ============================================================================
// Cache Management
// ============================================================================

export function invalidateTranslationCache(contentType?: string): void {
  clearCache(contentType);
}

export async function warmUpCache(): Promise<void> {
  const locales: Locale[] = ['en', 'zh-CN', 'de', 'ja', 'fr', 'es', 'ko'];

  // Pre-load English skills (most common)
  await getSkills('en');

  // Pre-load skills for all locales
  for (const locale of locales) {
    await getSkills(locale).catch(() => {}); // Ignore errors
  }
}
