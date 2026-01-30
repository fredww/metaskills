-- CreateTable
CREATE TABLE "resource_ratings" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "resourceType" "ResourceType" NOT NULL,
    "resourceUrl" TEXT NOT NULL,
    "skillCode" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "review" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "resource_ratings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resource_comments" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "resourceType" "ResourceType" NOT NULL,
    "resourceUrl" TEXT NOT NULL,
    "skillCode" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "parentId" TEXT,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "resource_comments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "resource_ratings_resourceUrl_rating_idx" ON "resource_ratings"("resourceUrl", "rating");

-- CreateIndex
CREATE INDEX "resource_ratings_skillCode_resourceType_idx" ON "resource_ratings"("skillCode", "resourceType");

-- CreateIndex
CREATE UNIQUE INDEX "resource_ratings_userId_resourceUrl_key" ON "resource_ratings"("userId", "resourceUrl");

-- CreateIndex
CREATE INDEX "resource_comments_resourceUrl_createdAt_idx" ON "resource_comments"("resourceUrl", "createdAt");

-- CreateIndex
CREATE INDEX "resource_comments_skillCode_resourceType_idx" ON "resource_comments"("skillCode", "resourceType");

-- AddForeignKey
ALTER TABLE "resource_ratings" ADD CONSTRAINT "resource_ratings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resource_comments" ADD CONSTRAINT "resource_comments_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "resource_comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resource_comments" ADD CONSTRAINT "resource_comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
