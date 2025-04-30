-- CreateTable
CREATE TABLE "DivisionsResourceLink" (
    "id" UUID NOT NULL,
    "resourceLinkName" TEXT NOT NULL,
    "resourceLinkUrl" TEXT NOT NULL,
    "divisionId" UUID,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DivisionsResourceLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DivisionsResourceLink_divisionId_idx" ON "DivisionsResourceLink"("divisionId");

-- CreateIndex
CREATE INDEX "DivisionsResourceLink_id_idx" ON "DivisionsResourceLink"("id");

-- AddForeignKey
ALTER TABLE "DivisionsResourceLink" ADD CONSTRAINT "DivisionsResourceLink_divisionId_fkey" FOREIGN KEY ("divisionId") REFERENCES "Divisions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
