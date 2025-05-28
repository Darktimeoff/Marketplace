import { Module } from '@nestjs/common'
import { CatalogCategoryController } from './controller/catalog-category.controller'
import { CatalogCategoryDataloaderService } from './service/catalog-category-dataloader.service'
import { CategoryModule } from '@/category/category.module'
import { ProductModule } from '@/product/product.module'
import { CatalogCategoryFilterDataloaderService } from './service/filter/catalog-category-filter-dataloader.service'
import { CatalogCategoryFilterDataloader } from './dataloader/catalog-category-filter.dataloader'
import { CatalogCategoryDynamicFilterDataloaderService } from './service/filter/catalog-category-dynamic-filter-dataloader.service'
import { CatalogCategoryBrandFilterDataloaderService } from './service/filter/catalog-category-brand-filter-dataloader.service'
import { CatalogCategorySellerFilterDataloaderService } from './service/filter/catalog-category-seller-filter-dataloader.service'
import { CatalogCategoryPriceFilterDataloaderService } from './service/filter/catalog-category-price-filter-dataloader.service'
import { CatalogCategoryBrandFilterDataloader } from './dataloader/catalog-category-brand-filter.dataloader'
import { CatalogCategorySellerFilterDataloader } from './dataloader/catalog-category-seller-filter.dataloader'
@Module({
    imports: [CategoryModule, ProductModule],
    controllers: [CatalogCategoryController],
    providers: [
        CatalogCategoryDataloaderService,
        CatalogCategoryFilterDataloaderService,
        CatalogCategoryFilterDataloader,
        CatalogCategoryDynamicFilterDataloaderService,
        CatalogCategoryBrandFilterDataloaderService,
        CatalogCategorySellerFilterDataloaderService,
        CatalogCategoryPriceFilterDataloaderService,
        CatalogCategoryBrandFilterDataloader,
        CatalogCategorySellerFilterDataloader,
    ],
})
export class CatalogModule {}
