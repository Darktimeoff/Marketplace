import { Module } from '@nestjs/common'
import { CatalogCategoryController } from './controller/catalog-category.controller'
import { CatalogCategoryDataloaderService } from './service/catalog-category-dataloader.service'
import { CategoryModule } from '@/category/category.module'
import { ProductModule } from '@/product/product.module'
import { CatalogCategoryFilterDataloaderService } from './service/filter/catalog-category-filter-dataloader.service'
import { CatalogCategoryDynamicFilterDataloaderService } from './service/filter/catalog-category-dynamic-filter-dataloader.service'
import { CatalogCategoryBrandFilterDataloaderService } from './service/filter/catalog-category-brand-filter-dataloader.service'
import { CatalogCategorySellerFilterDataloaderService } from './service/filter/catalog-category-seller-filter-dataloader.service'
import { CatalogCategoryPriceFilterDataloaderService } from './service/filter/catalog-category-price-filter-dataloader.service'
import { BrandModule } from '@/brand/brand.module'
import { SellerModule } from '@/seller/seller.module'

@Module({
    imports: [CategoryModule, ProductModule, BrandModule, SellerModule],
    controllers: [CatalogCategoryController],
    providers: [
        CatalogCategoryDataloaderService,
        CatalogCategoryFilterDataloaderService,
        CatalogCategoryDynamicFilterDataloaderService,
        CatalogCategoryBrandFilterDataloaderService,
        CatalogCategorySellerFilterDataloaderService,
        CatalogCategoryPriceFilterDataloaderService,
    ],
})
export class CatalogModule {}
