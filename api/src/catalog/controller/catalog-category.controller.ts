import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common'
import { CatalogCategoryDataloaderService } from '@/catalog/service/catalog-category-dataloader.service'
import { CatalogDefaultSorting } from '@/catalog/enum/catalog-default-sorting.enum'
import type { FilterInputInterface } from 'contracts'
import { ParseFilterPipe } from '@/catalog/pipe/parse-filter-pipe'
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
    async getByCategoryIdFilters(
        @Param('id', ParseIntPipe) id: number,
        @Query('filters', ParseFilterPipe) filters: FilterInputInterface[]
    ) {
        return await this.service.getByCategoryIdFilters(id, filters)
    }
}
