BEGIN;

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "phone" TEXT,
    "address" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "age" INTEGER,
    "gender" TEXT,
    "lastEducation" TEXT,
    "institution" TEXT,
    "major" TEXT,
    "graduationYear" INTEGER,
    "gpa" DOUBLE PRECISION,
    "lastCompany" TEXT,
    "lastPosition" TEXT,
    "workStartDate" TIMESTAMP(3),
    "workEndDate" TIMESTAMP(3),
    "jobDescription" TEXT,
    "reasonLeaving" TEXT,
    "skills" TEXT,
    "certifications" TEXT,
    "portfolioUrl" TEXT,
    "linkedinUrl" TEXT,
    "isProfileComplete" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hero" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Hero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HeroContent" (
    "id" SERIAL NOT NULL,
    "heading" TEXT NOT NULL,
    "subheading" TEXT,
    "ctaText" TEXT,
    "ctaLink" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HeroContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT,
    "image" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "News" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "image" TEXT,
    "author" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Career" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "requirements" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "salary" TEXT,
    "jobType" TEXT,
    "experience" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Career_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Application" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "careerId" INTEGER NOT NULL,
    "coverLetter" TEXT,
    "expectedSalary" TEXT,
    "availableDate" TIMESTAMP(3),
    "referenceContact" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "appliedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reviewedAt" TIMESTAMP(3),
    "notes" TEXT,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Forum" (
    "id" SERIAL NOT NULL,
    "quote" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "shares" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Forum_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssessmentResult" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "name" TEXT NOT NULL,
    "job" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "answers" JSONB NOT NULL,
    "results" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AssessmentResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Consultation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Consultation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserCareers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_UserCareers_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Application_userId_idx" ON "Application"("userId");

-- CreateIndex
CREATE INDEX "Application_careerId_idx" ON "Application"("careerId");

-- CreateIndex
CREATE UNIQUE INDEX "Application_userId_careerId_key" ON "Application"("userId", "careerId");

-- CreateIndex
CREATE INDEX "AssessmentResult_userId_idx" ON "AssessmentResult"("userId");

-- CreateIndex
CREATE INDEX "AssessmentResult_type_idx" ON "AssessmentResult"("type");

-- CreateIndex
CREATE INDEX "AssessmentResult_createdAt_idx" ON "AssessmentResult"("createdAt");

-- CreateIndex
CREATE INDEX "_UserCareers_B_index" ON "_UserCareers"("B");

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_careerId_fkey" FOREIGN KEY ("careerId") REFERENCES "Career"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssessmentResult" ADD CONSTRAINT "AssessmentResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserCareers" ADD CONSTRAINT "_UserCareers_A_fkey" FOREIGN KEY ("A") REFERENCES "Career"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserCareers" ADD CONSTRAINT "_UserCareers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- The website accesses these tables through its server-side Prisma owner role.
-- No Data API policies are provided: anonymous/authenticated API clients must
-- not be able to read user profiles, password hashes, or application data.
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Hero" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "HeroContent" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Service" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Event" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "News" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Career" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Application" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Forum" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "AssessmentResult" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Consultation" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "_UserCareers" ENABLE ROW LEVEL SECURITY;

COMMIT;
