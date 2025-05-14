/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `ProductAttributeValue` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ProductAttributeValue_id_idx";

-- CreateIndex
CREATE UNIQUE INDEX "ProductAttributeValue_id_key" ON "ProductAttributeValue"("id");
