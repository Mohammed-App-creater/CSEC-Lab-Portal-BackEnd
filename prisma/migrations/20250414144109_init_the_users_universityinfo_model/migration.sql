-- CreateEnum
CREATE TYPE "ClubStatus" AS ENUM ('Active', 'Alumni', 'Banned');

-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('SuperAdmin', 'President', 'VicePresident', 'DivisionHead', 'Coordinator', 'Member');

-- CreateEnum
CREATE TYPE "UniversityStatus" AS ENUM ('onCampus', 'offCampus', 'withdraw', 'dropOut');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "firstName" TEXT,
    "middleName" TEXT,
    "lastName" TEXT,
    "gender" TEXT,
    "email" TEXT,
    "password" TEXT,
    "phone_number" TEXT,
    "telegramUserName" TEXT,
    "bio" TEXT,
    "berthDate" TIMESTAMP(3),
    "profileImageUrl" TEXT,
    "clubStatus" "ClubStatus",
    "specialty" TEXT,
    "cvUrl" TEXT,
    "lastSeen" TIMESTAMP(3) NOT NULL,
    "role" "RoleType" NOT NULL DEFAULT 'Member',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UniversityInfo" (
    "id" TEXT NOT NULL,
    "currentYear" INTEGER,
    "expectedGraduationYear" INTEGER,
    "major" TEXT,
    "universityId" TEXT,
    "status" "UniversityStatus" NOT NULL,
    "department" TEXT,
    "userId" UUID,

    CONSTRAINT "UniversityInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UniversityInfo_universityId_key" ON "UniversityInfo"("universityId");

-- CreateIndex
CREATE UNIQUE INDEX "UniversityInfo_userId_key" ON "UniversityInfo"("userId");

-- AddForeignKey
ALTER TABLE "UniversityInfo" ADD CONSTRAINT "UniversityInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
