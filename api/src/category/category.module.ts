import { Module } from '@nestjs/common'
import { CategoryDataloader } from './dataloader/category.dataloader'
import { CategoryDataloaderService } from './service/category-dataloader.service'
import { CategoryController } from './controller/category.controller'
@Module({
    providers: [CategoryDataloader, CategoryDataloaderService],
    controllers: [CategoryController],
    exports: [CategoryDataloaderService],
})
export class CategoryModule {}
