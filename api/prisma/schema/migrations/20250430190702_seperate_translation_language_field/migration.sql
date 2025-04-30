/*
  Warnings:

  - You are about to drop the column `value` on the `Translation` table. All the data in the column will be lost.
  - Added the required column `en_us` to the `Translation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uk_ua` to the `Translation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Translation" DROP COLUMN "value",
ADD COLUMN     "en_us" TEXT NOT NULL,
ADD COLUMN     "uk_ua" TEXT NOT NULL;
