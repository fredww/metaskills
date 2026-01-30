-- CreateEnum
CREATE TYPE "TestType" AS ENUM ('RESOURCE_LAYOUT', 'CTA_POSITION', 'THUMBNAIL_SIZE', 'CARD_ORIENTATION', 'DESCRIPTION_LENGTH');

-- CreateEnum
CREATE TYPE "ConversionType" AS ENUM ('CLICK', 'VIEW', 'RATE', 'COMMENT', 'ENGAGEMENT');

-- CreateTable
CREATE TABLE "ab_tests" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "trafficAllocation" INTEGER NOT NULL DEFAULT 50,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3),
    "testType" "TestType" NOT NULL,
    "testContext" TEXT NOT NULL,
    "variantA" JSONB NOT NULL,
    "variantB" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ab_tests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ab_test_assignments" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "testId" TEXT NOT NULL,
    "variant" TEXT NOT NULL,
    "sessionId" TEXT,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ab_test_assignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ab_test_conversions" (
    "id" TEXT NOT NULL,
    "assignmentId" TEXT NOT NULL,
    "conversionType" "ConversionType" NOT NULL,
    "resourceUrl" TEXT,
    "metadata" JSONB,
    "convertedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ab_test_conversions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ab_tests_isActive_startDate_idx" ON "ab_tests"("isActive", "startDate");

-- CreateIndex
CREATE INDEX "ab_tests_testType_testContext_idx" ON "ab_tests"("testType", "testContext");

-- CreateIndex
CREATE INDEX "ab_test_assignments_testId_variant_idx" ON "ab_test_assignments"("testId", "variant");

-- CreateIndex
CREATE INDEX "ab_test_assignments_userId_testId_idx" ON "ab_test_assignments"("userId", "testId");

-- CreateIndex
CREATE INDEX "ab_test_conversions_assignmentId_conversionType_idx" ON "ab_test_conversions"("assignmentId", "conversionType");

-- CreateIndex
CREATE INDEX "ab_test_conversions_conversionType_convertedAt_idx" ON "ab_test_conversions"("conversionType", "convertedAt");

-- AddForeignKey
ALTER TABLE "ab_test_assignments" ADD CONSTRAINT "ab_test_assignments_testId_fkey" FOREIGN KEY ("testId") REFERENCES "ab_tests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ab_test_assignments" ADD CONSTRAINT "ab_test_assignments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ab_test_conversions" ADD CONSTRAINT "ab_test_conversions_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "ab_test_assignments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
