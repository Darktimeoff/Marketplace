/*
  Warnings:

  - You are about to drop the column `isVariant` on the `Attribute` table. All the data in the column will be lost.
  - You are about to drop the column `parentId` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_parentId_fkey";

-- DropIndex
DROP INDEX "Attribute_isVariant_idx";

-- DropIndex
DROP INDEX "Product_parentId_idx";

-- AlterTable
ALTER TABLE "Attribute" DROP COLUMN "isVariant";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "parentId";
