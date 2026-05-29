-- CreateTable
CREATE TABLE "OrgUsage" (
    "orgId" TEXT NOT NULL,
    "freeVoiceCreationsUsed" INTEGER NOT NULL DEFAULT 0,
    "freeGenerationsUsed" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrgUsage_pkey" PRIMARY KEY ("orgId")
);
