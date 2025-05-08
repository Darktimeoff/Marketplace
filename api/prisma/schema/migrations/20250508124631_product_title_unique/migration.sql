/*
  Warnings:

  - A unique constraint covering the columns `[titleId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Product_titleId_key" ON "Product"("titleId");
