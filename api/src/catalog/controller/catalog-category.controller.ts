import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common'
import { CatalogCategoryDataloaderService } from '@/catalog/service/catalog-category-dataloader.service'
@Controller('catalog/category')
export class CatalogCategoryController {
    constructor(private readonly service: CatalogCategoryDataloaderService) {}

    @Get(':id')
    async getByCategoryId(@Param('id', ParseIntPipe) id: number) {
        return await this.service.getByCategoryId(id)
    }
}
