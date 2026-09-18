-- Komentar dan like pengunjung untuk Article & Event, tanpa perlu login.

CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "targetType" TEXT NOT NULL,
    "targetId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "content" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "flagReason" TEXT,
    "ipHash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reviewedAt" TIMESTAMP(3),

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "Comment_targetType_targetId_status_idx"
    ON "Comment"("targetType", "targetId", "status");
CREATE INDEX "Comment_status_createdAt_idx"
    ON "Comment"("status", "createdAt");

CREATE TABLE "Reaction" (
    "id" SERIAL NOT NULL,
    "targetType" TEXT NOT NULL,
    "targetId" INTEGER NOT NULL,
    "visitorKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reaction_pkey" PRIMARY KEY ("id")
);

-- Satu browser hanya bisa menyukai satu target sekali.
CREATE UNIQUE INDEX "Reaction_targetType_targetId_visitorKey_key"
    ON "Reaction"("targetType", "targetId", "visitorKey");
CREATE INDEX "Reaction_targetType_targetId_idx"
    ON "Reaction"("targetType", "targetId");

-- Konsisten dengan tabel lain: tutup dari akses anon/authenticated Supabase.
ALTER TABLE "Comment" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Reaction" ENABLE ROW LEVEL SECURITY;
