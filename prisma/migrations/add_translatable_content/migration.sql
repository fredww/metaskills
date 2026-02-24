-- Migration: Add translatable JSON fields to content tables
-- This migration adds JSON fields for storing translations directly in the content tables

-- Step 1: Add new JSON columns to meta_skills
ALTER TABLE "meta_skills"
ADD COLUMN "title_translations" JSONB DEFAULT '{}'::jsonb,
ADD COLUMN "description_translations" JSONB DEFAULT '{}'::jsonb,
ADD COLUMN "definition_translations" JSONB DEFAULT '{}'::jsonb,
ADD COLUMN "why_important_translations" JSONB DEFAULT '{}'::jsonb;

-- Step 2: Migrate existing data to JSON format
UPDATE "meta_skills"
SET
  "title_translations" = jsonb_build_object('en', "title"),
  "description_translations" = jsonb_build_object('en', "description"),
  "definition_translations" = jsonb_build_object('en', "definition"),
  "why_important_translations" = jsonb_build_object('en', "why_important");

-- Step 3: Add new JSON columns to practices
ALTER TABLE "practices"
ADD COLUMN "title_translations" JSONB DEFAULT '{}'::jsonb,
ADD COLUMN "description_translations" JSONB DEFAULT '{}'::jsonb,
ADD COLUMN "instructions_translations" JSONB DEFAULT '{}'::jsonb,
ADD COLUMN "benefits_translations" JSONB DEFAULT '{}'::jsonb,
ADD COLUMN "tips_translations" JSONB DEFAULT '{}'::jsonb;

-- Step 4: Migrate existing practice data
UPDATE "practices"
SET
  "title_translations" = jsonb_build_object('en', "title"),
  "description_translations" = jsonb_build_object('en', "description"),
  "instructions_translations" = jsonb_build_object('en', "instructions"),
  "benefits_translations" = jsonb_build_object('en', jsonb_array_elements_text("benefits")),
  "tips_translations" = jsonb_build_object('en', jsonb_array_elements_text("tips"));

-- Step 5: Add new JSON columns to articles
ALTER TABLE "articles"
ADD COLUMN "title_translations" JSONB DEFAULT '{}'::jsonb,
ADD COLUMN "content_translations" JSONB DEFAULT '{}'::jsonb,
ADD COLUMN "excerpt_translations" JSONB DEFAULT '{}'::jsonb;

-- Step 6: Migrate existing article data
UPDATE "articles"
SET
  "title_translations" = jsonb_build_object('en', "title"),
  "content_translations" = jsonb_build_object('en', "content"),
  "excerpt_translations" = jsonb_build_object('en', "excerpt");

-- Step 7: Create indexes for faster JSON queries
CREATE INDEX idx_meta_skills_title_en ON "meta_skills" (("title_translations"->>'en'));
CREATE INDEX idx_meta_skills_title_zh_cn ON "meta_skills" (("title_translations"->>'zh-CN'));
CREATE INDEX idx_practices_title_en ON "practices" (("title_translations"->>'en'));
CREATE INDEX idx_articles_title_en ON "articles" (("title_translations"->>'en'));

-- Step 8: (Optional) After verifying data, drop old columns
-- Uncomment these lines AFTER verifying everything works:
-- ALTER TABLE "meta_skills" DROP COLUMN "title", DROP COLUMN "description", DROP COLUMN "definition", DROP COLUMN "why_important";
-- ALTER TABLE "practices" DROP COLUMN "title", DROP COLUMN "description", DROP COLUMN "instructions", DROP COLUMN "benefits", DROP COLUMN "tips";
-- ALTER TABLE "articles" DROP COLUMN "title", DROP COLUMN "content", DROP COLUMN "excerpt";
