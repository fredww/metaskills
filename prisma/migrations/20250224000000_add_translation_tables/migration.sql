-- Migration: Add professional translation tables
-- This migration creates a scalable translation system with workflow tracking

-- Step 1: Add new translation tables

-- MetaSkill Translations
CREATE TABLE "meta_skill_translations" (
  "id" TEXT NOT NULL,
  "skillId" TEXT NOT NULL,
  "locale" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'DRAFT',

  -- Translatable content
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "definition" TEXT NOT NULL,
  "whyImportant" TEXT NOT NULL,

  -- SEO content
  "metaTitle" TEXT,
  "metaDescription" TEXT,
  "ogTitle" TEXT,
  "ogDescription" TEXT,

  -- Workflow tracking
  "translatedBy" TEXT,
  "reviewedBy" TEXT,
  "approvedAt" TIMESTAMP(3),
  "publishedAt" TIMESTAMP(3),

  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "meta_skill_translations_pkey" PRIMARY KEY ("id")
);

-- Practice Translations
CREATE TABLE "practice_translations" (
  "id" TEXT NOT NULL,
  "practiceId" TEXT NOT NULL,
  "locale" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'DRAFT',

  -- Translatable content
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "instructions" JSONB NOT NULL DEFAULT '{}'::jsonb,
  "benefits" TEXT[] NOT NULL DEFAULT '{}',
  "tips" TEXT[] NOT NULL DEFAULT '{}',

  -- Workflow tracking
  "translatedBy" TEXT,
  "reviewedBy" TEXT,
  "approvedAt" TIMESTAMP(3),
  "publishedAt" TIMESTAMP(3),

  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "practice_translations_pkey" PRIMARY KEY ("id")
);

-- Article Translations
CREATE TABLE "article_translations" (
  "id" TEXT NOT NULL,
  "articleId" TEXT NOT NULL,
  "locale" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'DRAFT',

  -- Translatable content
  "title" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "excerpt" TEXT NOT NULL,

  -- SEO
  "metaTitle" TEXT,
  "metaDescription" TEXT,
  "ogTitle" TEXT,
  "ogDescription" TEXT,

  -- Locale-specific publication
  "isPublished" BOOLEAN NOT NULL DEFAULT false,
  "publishedAt" TIMESTAMP(3),

  -- Workflow tracking
  "translatedBy" TEXT,
  "reviewedBy" TEXT,
  "approvedAt" TIMESTAMP(3),

  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "article_translations_pkey" PRIMARY KEY ("id")
);

-- Step 2: Update existing meta_skills table (remove translated fields)
-- First, migrate existing data to translation table
INSERT INTO "meta_skill_translations" (
  "id",
  "skillId",
  "locale",
  "status",
  "title",
  "description",
  "definition",
  "whyImportant",
  "publishedAt",
  "createdAt",
  "updatedAt"
)
SELECT
  gen_random_uuid()::text,
  "id",
  'en',
  'PUBLISHED',
  COALESCE("title", 'Untitled'),
  COALESCE("description", ''),
  COALESCE("definition", ''),
  COALESCE("whyImportant", ''),
  "createdAt",
  "createdAt",
  "updatedAt"
FROM "meta_skills";

-- Now remove the old columns from meta_skills
ALTER TABLE "meta_skills"
  DROP COLUMN IF EXISTS "title",
  DROP COLUMN IF EXISTS "description",
  DROP COLUMN IF EXISTS "definition",
  DROP COLUMN IF EXISTS "whyImportant",
  DROP COLUMN IF EXISTS "title_translations",
  DROP COLUMN IF EXISTS "description_translations",
  DROP COLUMN IF EXISTS "definition_translations",
  DROP COLUMN IF EXISTS "why_important_translations";

-- Step 3: Update practices table
INSERT INTO "practice_translations" (
  "id",
  "practiceId",
  "locale",
  "status",
  "title",
  "description",
  "instructions",
  "benefits",
  "tips",
  "publishedAt",
  "createdAt",
  "updatedAt"
)
SELECT
  gen_random_uuid()::text,
  "id",
  'en',
  'PUBLISHED',
  COALESCE("title", 'Untitled'),
  COALESCE("description", ''),
  COALESCE("instructions", '{}'::jsonb),
  COALESCE("benefits", '{}'),
  COALESCE("tips", '{}'),
  "createdAt",
  "createdAt",
  "updatedAt"
FROM "practices";

ALTER TABLE "practices"
  DROP COLUMN IF EXISTS "title",
  DROP COLUMN IF EXISTS "description",
  DROP COLUMN IF EXISTS "instructions",
  DROP COLUMN IF EXISTS "benefits",
  DROP COLUMN IF EXISTS "tips",
  DROP COLUMN IF EXISTS "title_translations",
  DROP COLUMN IF EXISTS "description_translations",
  DROP COLUMN IF EXISTS "instructions_translations",
  DROP COLUMN IF EXISTS "benefits_translations",
  DROP COLUMN IF EXISTS "tips_translations";

-- Step 4: Update articles table
INSERT INTO "article_translations" (
  "id",
  "articleId",
  "locale",
  "status",
  "title",
  "content",
  "excerpt",
  "isPublished",
  "publishedAt",
  "createdAt",
  "updatedAt"
)
SELECT
  gen_random_uuid()::text,
  "id",
  'en',
  'PUBLISHED',
  COALESCE("title", 'Untitled'),
  COALESCE("content", ''),
  COALESCE("excerpt", ''),
  COALESCE("isPublished", false),
  "publishedAt",
  "createdAt",
  "updatedAt"
FROM "articles";

ALTER TABLE "articles"
  DROP COLUMN IF EXISTS "title",
  DROP COLUMN IF EXISTS "content",
  DROP COLUMN IF EXISTS "excerpt",
  DROP COLUMN IF EXISTS "title_translations",
  DROP COLUMN IF EXISTS "content_translations",
  DROP COLUMN IF EXISTS "excerpt_translations";

-- Step 5: Add foreign key constraints
ALTER TABLE "meta_skill_translations"
  ADD CONSTRAINT "meta_skill_translations_skillId_fkey"
  FOREIGN KEY ("skillId")
  REFERENCES "meta_skills"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "practice_translations"
  ADD CONSTRAINT "practice_translations_practiceId_fkey"
  FOREIGN KEY ("practiceId")
  REFERENCES "practices"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "article_translations"
  ADD CONSTRAINT "article_translations_articleId_fkey"
  FOREIGN KEY ("articleId")
  REFERENCES "articles"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

-- Step 6: Add unique constraints
ALTER TABLE "meta_skill_translations"
  ADD CONSTRAINT "meta_skill_translations_skillId_locale_key"
  UNIQUE ("skillId", "locale");

ALTER TABLE "practice_translations"
  ADD CONSTRAINT "practice_translations_practiceId_locale_key"
  UNIQUE ("practiceId", "locale");

ALTER TABLE "article_translations"
  ADD CONSTRAINT "article_translations_articleId_locale_key"
  UNIQUE ("articleId", "locale");

-- Step 7: Create indexes for performance
CREATE INDEX "meta_skill_translations_locale_status_idx" ON "meta_skill_translations"("locale", "status");
CREATE INDEX "meta_skill_translations_status_publishedAt_idx" ON "meta_skill_translations"("status", "publishedAt");
CREATE INDEX "meta_skill_translations_skillId_idx" ON "meta_skill_translations"("skillId");

CREATE INDEX "practice_translations_locale_status_idx" ON "practice_translations"("locale", "status");
CREATE INDEX "practice_translations_practiceId_idx" ON "practice_translations"("practiceId");

CREATE INDEX "article_translations_locale_status_idx" ON "article_translations"("locale", "status", "isPublished");
CREATE INDEX "article_translations_articleId_idx" ON "article_translations"("articleId");

-- Step 8: Add comments for documentation
COMMENT ON TABLE "meta_skill_translations" IS 'Translations for meta skills with workflow tracking';
COMMENT ON TABLE "practice_translations" IS 'Translations for practices with workflow tracking';
COMMENT ON TABLE "article_translations" IS 'Translations for articles with workflow tracking';

COMMENT ON COLUMN "meta_skill_translations"."status" IS 'Translation workflow status: DRAFT, PENDING, REVIEWED, PUBLISHED, ARCHIVED';
COMMENT ON COLUMN "practice_translations"."status" IS 'Translation workflow status: DRAFT, PENDING, REVIEWED, PUBLISHED, ARCHIVED';
COMMENT ON COLUMN "article_translations"."status" IS 'Translation workflow status: DRAFT, PENDING, REVIEWED, PUBLISHED, ARCHIVED';

-- Step 9: Create helper functions for translation queries
CREATE OR REPLACE FUNCTION get_skill_translation(skill_code TEXT, locale TEXT DEFAULT 'en')
RETURNS TABLE (
  id TEXT,
  title TEXT,
  description TEXT,
  definition TEXT,
  whyImportant TEXT,
  status TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    tst.id,
    tst.title,
    tst.description,
    tst.definition,
    tst."whyImportant",
    tst.status
  FROM "meta_skills" ms
  JOIN "meta_skill_translations" tst ON ms.id = tst."skillId"
  WHERE ms.code = skill_code
    AND tst.locale = locale
    AND tst.status = 'PUBLISHED'
  LIMIT 1;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_skill_translation_fallback(skill_code TEXT, locale TEXT DEFAULT 'en')
RETURNS TABLE (
  id TEXT,
  title TEXT,
  description TEXT,
  definition TEXT,
  whyImportant TEXT,
  locale TEXT,
  status TEXT
) AS $$
BEGIN
  -- Try requested locale first
  RETURN QUERY
  SELECT
    tst.id,
    tst.title,
    tst.description,
    tst.definition,
    tst."whyImportant",
    tst.locale,
    tst.status
  FROM "meta_skills" ms
  JOIN "meta_skill_translations" tst ON ms.id = tst."skillId"
  WHERE ms.code = skill_code
    AND tst.locale = locale
    AND tst.status = 'PUBLISHED'
  LIMIT 1;

  -- If not found, fallback to English
  IF NOT FOUND THEN
    RETURN QUERY
    SELECT
      tst.id,
      tst.title,
      tst.description,
      tst.definition,
      tst."whyImportant",
      tst.locale,
      tst.status
    FROM "meta_skills" ms
    JOIN "meta_skill_translations" tst ON ms.id = tst."skillId"
    WHERE ms.code = skill_code
      AND tst.locale = 'en'
      AND tst.status = 'PUBLISHED'
    LIMIT 1;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Step 10: Create view for translation status monitoring
CREATE OR REPLACE VIEW translation_status_overview AS
SELECT
  'meta_skills' as content_type,
  ms.code as item_code,
  COUNT(DISTINCT CASE WHEN tst.locale = 'en' THEN 1 END) as has_en,
  COUNT(DISTINCT CASE WHEN tst.locale = 'zh-CN' THEN 1 END) as has_zh_cn,
  COUNT(DISTINCT CASE WHEN tst.locale = 'de' THEN 1 END) as has_de,
  COUNT(DISTINCT CASE WHEN tst.locale = 'ja' THEN 1 END) as has_ja,
  COUNT(DISTINCT CASE WHEN tst.locale = 'fr' THEN 1 END) as has_fr,
  COUNT(DISTINCT CASE WHEN tst.locale = 'es' THEN 1 END) as has_es,
  COUNT(DISTINCT CASE WHEN tst.locale = 'ko' THEN 1 END) as has_ko,
  COUNT(DISTINCT tst.locale) as total_translations,
  7 as required_translations
FROM "meta_skills" ms
LEFT JOIN "meta_skill_translations" tst ON ms.id = tst."skillId" AND tst.status = 'PUBLISHED'
GROUP BY ms.code

UNION ALL

SELECT
  'practices' as content_type,
  p.id as item_code,
  COUNT(DISTINCT CASE WHEN pt.locale = 'en' THEN 1 END) as has_en,
  COUNT(DISTINCT CASE WHEN pt.locale = 'zh-CN' THEN 1 END) as has_zh_cn,
  COUNT(DISTINCT CASE WHEN pt.locale = 'de' THEN 1 END) as has_de,
  COUNT(DISTINCT CASE WHEN pt.locale = 'ja' THEN 1 END) as has_ja,
  COUNT(DISTINCT CASE WHEN pt.locale = 'fr' THEN 1 END) as has_fr,
  COUNT(DISTINCT CASE WHEN pt.locale = 'es' THEN 1 END) as has_es,
  COUNT(DISTINCT CASE WHEN pt.locale = 'ko' THEN 1 END) as has_ko,
  COUNT(DISTINCT pt.locale) as total_translations,
  7 as required_translations
FROM "practices" p
LEFT JOIN "practice_translations" pt ON p.id = pt."practiceId" AND pt.status = 'PUBLISHED'
GROUP BY p.id;

COMMENT ON VIEW translation_status_overview IS 'Overview of translation status for all content types and locales';
