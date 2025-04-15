/*
  Warnings:

  - A unique constraint covering the columns `[DivisionId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[DivisionHeadID]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "DivisionHeadID" UUID,
ADD COLUMN     "DivisionId" UUID;

-- CreateTable
CREATE TABLE "Divisions" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "establishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "currentHeadID" UUID,

    CONSTRAINT "Divisions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Divisions_currentHeadID_key" ON "Divisions"("currentHeadID");

-- CreateIndex
CREATE UNIQUE INDEX "User_DivisionId_key" ON "User"("DivisionId");

-- CreateIndex
CREATE UNIQUE INDEX "User_DivisionHeadID_key" ON "User"("DivisionHeadID");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_DivisionId_fkey" FOREIGN KEY ("DivisionId") REFERENCES "Divisions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Divisions" ADD CONSTRAINT "Divisions_currentHeadID_fkey" FOREIGN KEY ("currentHeadID") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
