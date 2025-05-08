/*
  Warnings:

  - A unique constraint covering the columns `[path]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Category_path_idx";

-- CreateIndex
CREATE UNIQUE INDEX "Category_path_key" ON "Category"("path");
