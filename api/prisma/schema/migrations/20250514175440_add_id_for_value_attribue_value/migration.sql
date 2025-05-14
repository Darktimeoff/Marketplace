-- AlterTable
ALTER TABLE "ProductAttributeValue" ADD COLUMN     "id" SERIAL NOT NULL;

-- CreateIndex
CREATE INDEX "ProductAttributeValue_id_idx" ON "ProductAttributeValue"("id");
