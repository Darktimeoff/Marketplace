/*
  Warnings:

  - Added the required column `slug` to the `Attribute` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `AttributeGroup` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Attribute" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "AttributeGroup" ADD COLUMN     "slug" TEXT NOT NULL;
