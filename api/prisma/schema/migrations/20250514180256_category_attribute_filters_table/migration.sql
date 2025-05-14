-- CreateTable
CREATE TABLE "CategoryAttributeFilter" (
    "categoryId" INTEGER NOT NULL,
    "attributeId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "CategoryAttributeFilter_pkey" PRIMARY KEY ("categoryId","attributeId")
);

-- CreateIndex
CREATE INDEX "CategoryAttributeFilter_categoryId_idx" ON "CategoryAttributeFilter"("categoryId");

-- AddForeignKey
ALTER TABLE "CategoryAttributeFilter" ADD CONSTRAINT "CategoryAttributeFilter_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryAttributeFilter" ADD CONSTRAINT "CategoryAttributeFilter_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "Attribute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
