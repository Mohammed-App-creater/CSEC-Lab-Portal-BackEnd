-- CreateTable
CREATE TABLE "ResourceLink" (
    "id" UUID NOT NULL,
    "resourceLinkName" TEXT NOT NULL,
    "resourceLinkUrl" TEXT NOT NULL,
    "userId" UUID,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResourceLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ResourceLink_userId_idx" ON "ResourceLink"("userId");

-- AddForeignKey
ALTER TABLE "ResourceLink" ADD CONSTRAINT "ResourceLink_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
