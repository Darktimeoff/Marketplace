-- CreateTable
CREATE TABLE "ProductOffer" (
    "productId" INTEGER NOT NULL,
    "sellerId" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "quantity" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ProductOffer_pkey" PRIMARY KEY ("productId","sellerId")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductOffer_productId_key" ON "ProductOffer"("productId");

-- CreateIndex
CREATE INDEX "ProductOffer_productId_isActive_quantity_idx" ON "ProductOffer"("productId", "isActive", "quantity");

-- CreateIndex
CREATE INDEX "Product_sellerId_idx" ON "Product"("sellerId");

-- AddForeignKey
ALTER TABLE "ProductOffer" ADD CONSTRAINT "ProductOffer_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductOffer" ADD CONSTRAINT "ProductOffer_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
