-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "shortDescriptionId" INTEGER;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_shortDescriptionId_fkey" FOREIGN KEY ("shortDescriptionId") REFERENCES "Translation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
