-- CreateEnum
CREATE TYPE "ArticleType" AS ENUM ('EXPERT_INTERVIEW', 'LEARNING_INSIGHTS', 'SUCCESS_STORY', 'RESEARCH_SUMMARY');

-- CreateTable
CREATE TABLE "articles" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "type" "ArticleType" NOT NULL,
    "skillCode" TEXT,
    "authorName" TEXT NOT NULL,
    "authorTitle" TEXT NOT NULL,
    "authorImage" TEXT,
    "coverImage" TEXT,
    "category" TEXT,
    "views" INTEGER NOT NULL DEFAULT 0,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "articles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "articles_slug_key" ON "articles"("slug");

-- CreateIndex
CREATE INDEX "articles_type_skillCode_isPublished_idx" ON "articles"("type", "skillCode", "isPublished");

-- CreateIndex
CREATE INDEX "articles_slug_idx" ON "articles"("slug");
