import { Module } from '@nestjs/common'
import { CategoryDataloader } from './dataloader/category.dataloader'
import { CategoryDataloaderService } from './service/category-dataloader.service'
import { CategoryController } from './controller/category.controller'
import { CategoryDynamicFilterDataloader } from './dataloader/category-dynamic-filter.dataloader'
import { CategoryDynamicFilterDataloaderService } from './service/category-dynamic-filter-dataloader.service'
import { CategoryFacade } from './facade/category.facade'
@Module({
    providers: [
        CategoryDataloader,
        CategoryDataloaderService,
        CategoryDynamicFilterDataloader,
        CategoryDynamicFilterDataloaderService,
        CategoryFacade,
    ],
    controllers: [CategoryController],
    exports: [CategoryFacade],
})
export class CategoryModule {}
