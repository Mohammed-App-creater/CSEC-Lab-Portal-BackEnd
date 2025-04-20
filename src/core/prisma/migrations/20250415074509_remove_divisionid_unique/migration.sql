-- DropForeignKey
ALTER TABLE "Sessions" DROP CONSTRAINT "Sessions_creatorId_fkey";

-- AddForeignKey
ALTER TABLE "Sessions" ADD CONSTRAINT "Sessions_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
