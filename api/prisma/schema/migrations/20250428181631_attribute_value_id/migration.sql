/*
  Warnings:

  - The primary key for the `ProductAttributeValue` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "ProductAttributeValue" DROP CONSTRAINT "ProductAttributeValue_pkey",
ADD CONSTRAINT "ProductAttributeValue_pkey" PRIMARY KEY ("attributeId", "productId", "order");
