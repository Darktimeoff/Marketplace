import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common'
import { CatalogCategoryService } from '@/catalog/service/catalog-category.service'
@Controller('catalog/category')
export class CatalogCategoryController {
    constructor(private readonly service: CatalogCategoryService) {}

    @Get(':id')
    async getByCategoryId(@Param('id', ParseIntPipe) id: number) {
        return await this.service.getByCategoryId(id)
    }
}
