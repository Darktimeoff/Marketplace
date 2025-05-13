import { Module } from '@nestjs/common'
import { CatalogCategoryController } from './controller/catalog-category.controller'
import { CatalogCategoryDataloaderService } from './service/catalog-category-dataloader.service'
import { CatalogCategoryDataloader } from './dataloader/catalog-category.dataloader'
import { CategoryModule } from '@/category/category.module'
import { ProductModule } from '@/product/product.module'
@Module({
    imports: [CategoryModule, ProductModule],
    controllers: [CatalogCategoryController],
    providers: [CatalogCategoryDataloaderService, CatalogCategoryDataloader],
})
export class CatalogModule {}
