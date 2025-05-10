/*
  Warnings:

  - You are about to drop the column `translationId` on the `Seller` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Seller" DROP CONSTRAINT "Seller_translationId_fkey";

-- AlterTable
ALTER TABLE "Seller" DROP COLUMN "translationId";
