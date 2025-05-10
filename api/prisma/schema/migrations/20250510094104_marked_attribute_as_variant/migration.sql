-- AlterTable
ALTER TABLE "Attribute" ADD COLUMN     "isVariant" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "Attribute_isVariant_idx" ON "Attribute"("isVariant");
