/*
  Warnings:

  - Added the required column `date` to the `SessionTimeSlot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SessionTimeSlot" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;
