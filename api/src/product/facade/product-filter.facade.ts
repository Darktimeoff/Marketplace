import { Injectable } from '@nestjs/common'
import { ProductFilterService } from '@/product/service/product-filter.service'
import { CatalogFilterInputInterface, CatalogPaginationInputInterface } from 'contracts'
import { FilterCountableModelInterface } from 'contracts'

@Injectable()
export class ProductFacade {
    constructor(private readonly filters: ProductFilterService) {}

    async getFilteredProductIds(
        categoryIds: number[],
        filters: CatalogFilterInputInterface[],
        pagination: CatalogPaginationInputInterface
    ): Promise<number[]> {
        return await this.filters.getFilteredProductIds(categoryIds, filters, pagination)
    }

    async getFilteredProductIdsWithoutPagination(
        categoryIds: number[],
        filters: CatalogFilterInputInterface[],
        excludeSlug?: string
    ): Promise<number[]> {
        return await this.filters.getFilteredProductIdsWithoutPagination(
            categoryIds,
            filters,
            excludeSlug
        )
    }

    async getPriceRange(
        categoryIds: number[],
        filters: CatalogFilterInputInterface[]
    ): Promise<{ min: number; max: number }> {
        return await this.filters.getPriceRange(categoryIds, filters)
    }

    async getCountBySellerId(
        categoryIds: number[],
        filters: CatalogFilterInputInterface[]
    ): Promise<FilterCountableModelInterface[]> {
        return await this.filters.getCountBySellerId(categoryIds, filters)
    }

    async getCountByGroupId(
        categoryIds: number[],
        filters: CatalogFilterInputInterface[]
    ): Promise<FilterCountableModelInterface[]> {
        return await this.filters.getCountByGroupId(categoryIds, filters)
    }

    async getTotalCount(
        categoryIds: number[],
        filters: CatalogFilterInputInterface[]
    ): Promise<number> {
        return await this.filters.getTotalCount(categoryIds, filters)
    }
}
