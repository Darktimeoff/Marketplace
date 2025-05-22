import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common'
import { CatalogCategoryDataloaderService } from '@/catalog/service/catalog-category-dataloader.service'
import { CatalogDefaultSorting } from '@/catalog/enum/catalog-default-sorting.enum'
@Controller('catalog/category')
export class CatalogCategoryController {
    constructor(private readonly service: CatalogCategoryDataloaderService) {}

    @Get(':id')
    async getByCategoryId(
        @Param('id', ParseIntPipe) id: number,
        @Query('offset', ParseIntPipe) offset: number,
        @Query('limit', ParseIntPipe) limit: number,
        @Query('sorting') sorting: CatalogDefaultSorting
    ) {
        return await this.service.getByCategoryId(
            id,
            offset,
            limit,
            [
                {
                    slug: 'brand',
                    values: [12, 1],
                },
            ],
            sorting
        )
    }

    @Get(':id/filters')
    async getByCategoryIdFilters(@Param('id', ParseIntPipe) id: number) {
        return await this.service.getByCategoryIdFilters(id, [
            {
                slug: 'brand',
                values: [12, 1],
            },
            {
                slug: 'price',
                values: {
                    min: 10000,
                    max: 30000,
                },
            },
            {
                slug: 'діагональ-екрана',
                values: [629, 234],
            },
            {
                slug: "вбудована-пам'ять",
                values: [637, 243],
            },
        ])
    }
}
