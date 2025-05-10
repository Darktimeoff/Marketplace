-- DropForeignKey
ALTER TABLE "ProductOffer" DROP CONSTRAINT "ProductOffer_productId_fkey";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_id_fkey" FOREIGN KEY ("id") REFERENCES "ProductOffer"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;
