-- CreateEnum
CREATE TYPE "ChallengeType" AS ENUM ('READING_CHALLENGE', 'SKILL_MASTERY', 'TOOL_EXPLORATION', 'LEARNING_STREAK');

-- CreateTable
CREATE TABLE "challenges" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "ChallengeType" NOT NULL,
    "targetCount" INTEGER NOT NULL,
    "timeframe" INTEGER NOT NULL,
    "skillCode" TEXT,
    "badgeUrl" TEXT,
    "badgeTitle" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "challenges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "challenge_enrollments" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "challengeId" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "progress" INTEGER NOT NULL DEFAULT 0,
    "resourceUrls" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "challenge_enrollments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "challenges_type_isActive_idx" ON "challenges"("type", "isActive");

-- CreateIndex
CREATE INDEX "challenges_skillCode_idx" ON "challenges"("skillCode");

-- CreateIndex
CREATE INDEX "challenge_enrollments_userId_completedAt_idx" ON "challenge_enrollments"("userId", "completedAt");

-- CreateIndex
CREATE UNIQUE INDEX "challenge_enrollments_userId_challengeId_key" ON "challenge_enrollments"("userId", "challengeId");

-- AddForeignKey
ALTER TABLE "challenge_enrollments" ADD CONSTRAINT "challenge_enrollments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challenge_enrollments" ADD CONSTRAINT "challenge_enrollments_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "challenges"("id") ON DELETE CASCADE ON UPDATE CASCADE;
