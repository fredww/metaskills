-- CreateEnum
CREATE TYPE "ResourceType" AS ENUM ('BOOK', 'TOOL', 'COURSE', 'ARTICLE', 'VIDEO');

-- CreateEnum
CREATE TYPE "ClickSource" AS ENUM ('SKILL_PAGE', 'PRACTICE_MODAL', 'DASHBOARD', 'RECOMMENDATION_EMAIL');

-- CreateTable
CREATE TABLE "resource_clicks" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "resourceType" "ResourceType" NOT NULL,
    "resourceTitle" TEXT NOT NULL,
    "resourceUrl" TEXT NOT NULL,
    "skillCode" TEXT NOT NULL,
    "clickSource" "ClickSource" NOT NULL,
    "metadata" JSONB,
    "clickedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "resource_clicks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "resource_clicks_userId_skillCode_idx" ON "resource_clicks"("userId", "skillCode");

-- CreateIndex
CREATE INDEX "resource_clicks_resourceType_clickedAt_idx" ON "resource_clicks"("resourceType", "clickedAt");

-- AddForeignKey
ALTER TABLE "resource_clicks" ADD CONSTRAINT "resource_clicks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
