import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common'
import { CatalogCategoryDataloaderService } from '@/catalog/service/catalog-category-dataloader.service'
import type { FilterInputInterface } from 'contracts'
import { ParseFilterPipe } from '@/catalog/pipe/parse-filter-pipe'
import { CatalogPaginationInput } from '@/catalog/input/catalog-pagination.input'
@Controller('catalog/category')
export class CatalogCategoryController {
    constructor(private readonly service: CatalogCategoryDataloaderService) {}

    @Get(':id')
    async getByCategoryId(
        @Param('id', ParseIntPipe) id: number,
        @Query() pagination: CatalogPaginationInput,
        @Query('filters', ParseFilterPipe) filters: FilterInputInterface[]
    ) {
        return await this.service.getByCategoryId(id, pagination, filters)
    }

    @Get(':id/filters')
    async getByCategoryIdFilters(
        @Param('id', ParseIntPipe) id: number,
        @Query('filters', ParseFilterPipe) filters: FilterInputInterface[]
    ) {
        return await this.service.getByCategoryIdFilters(id, filters)
    }
}
