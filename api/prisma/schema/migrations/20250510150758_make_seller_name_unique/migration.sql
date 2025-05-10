/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Seller` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Seller" ADD COLUMN     "translationId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Seller_name_key" ON "Seller"("name");

-- AddForeignKey
ALTER TABLE "Seller" ADD CONSTRAINT "Seller_translationId_fkey" FOREIGN KEY ("translationId") REFERENCES "Translation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
