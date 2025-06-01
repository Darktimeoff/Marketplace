import { BrandModule } from '@/brand/brand.module'
import { CatalogModule } from '@/catalog/catalog.module'
import { CategoryModule } from '@/category/category.module'
import { ApiConfigModule } from '@/generic/config/api-config.module'
import { DBModule } from '@/generic/db/db.module'
import { ProductAttributeModule } from '@/product-attributes/product-attribute.module'
import { ProductOfferModule } from '@/product-offer/product-offer.module'
import { ProductModule } from '@/product/product.module'
import { Module } from '@nestjs/common'

@Module({
    imports: [
        ApiConfigModule,
        DBModule,
        CategoryModule,
        ProductModule,
        ProductAttributeModule,
        ProductOfferModule,
        CatalogModule,
        BrandModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
