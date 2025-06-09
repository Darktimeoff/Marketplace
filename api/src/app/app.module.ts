import { AttributeModule } from '@/attribute/product-attribute.module'
import { BrandModule } from '@/brand/brand.module'
import { CatalogModule } from '@/catalog/catalog.module'
import { CategoryModule } from '@/category/category.module'
import { ApiConfigModule } from '@/generic/config/api-config.module'
import { DBModule } from '@/generic/db/db.module'
import { OfferModule } from '@/offer/offer.module'
import { ProductModule } from '@/product/product.module'
import { SellerModule } from '@/seller/seller.module'
import { Module } from '@nestjs/common'

@Module({
    imports: [
        ApiConfigModule,
        DBModule,
        CategoryModule,
        ProductModule,
        SellerModule,
        OfferModule,
        CatalogModule,
        BrandModule,
        AttributeModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
