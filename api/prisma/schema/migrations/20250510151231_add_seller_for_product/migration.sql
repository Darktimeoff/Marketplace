-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "sellerId" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
