import { Injectable } from '@nestjs/common'
import {
    CatalogFilterInputInterface,
    CatalogFilterValuesSelectType,
    CatalogPaginationInputInterface,
    FilterCountableModelInterface,
} from 'contracts'
import { ProductFilterBaseDataloader } from '@/product/dataloader/product-filter-base.dataloader'
import { ProductFilterDataloader } from '@/product/dataloader/product-filter.dataloader'

@Injectable()
export class ProductFilterService {
    constructor(
        private readonly baseFilters: ProductFilterBaseDataloader,
        private readonly filters: ProductFilterDataloader
    ) {}

    async getFilteredProductIds(
        categoryIds: number[],
        filters: CatalogFilterInputInterface[],
        pagination: CatalogPaginationInputInterface
    ): Promise<number[]> {
        return await this.baseFilters.getFilteredProductIds(categoryIds, filters, pagination)
    }

    async getTotalCount(
        categoryIds: number[],
        filters: CatalogFilterInputInterface[]
    ): Promise<number> {
        return await this.baseFilters.getTotalCount(categoryIds, filters)
    }

    async getFilteredProductIdsWithoutPagination(
        categoryIds: number[],
        filters: CatalogFilterInputInterface[],
        excludeSlug?: string
    ): Promise<number[]> {
        return await this.baseFilters.getFilteredProductIdsWithoutPagination(
            categoryIds,
            filters,
            excludeSlug
        )
    }

    async getCountByGroupId(
        categoryIds: number[],
        filters: CatalogFilterInputInterface[]
    ): Promise<FilterCountableModelInterface[]> {
        return await this.filters.getCountByGroupId(categoryIds, filters)
    }

    async getCountBySellerId(
        categoryIds: number[],
        filters: CatalogFilterInputInterface[]
    ): Promise<FilterCountableModelInterface[]> {
        return await this.filters.getCountBySellerId(categoryIds, filters)
    }

    async getPriceRange(
        categoryIds: number[],
        filters: CatalogFilterInputInterface[]
    ): Promise<{ min: number; max: number }> {
        return await this.filters.getPriceRange(categoryIds, filters)
    }

    async getCountByAttributeId(
        categoryId: number,
        attributeId: number,
        productIds: number[]
    ): Promise<CatalogFilterValuesSelectType[]> {
        return await this.filters.getCountByAttributeId(categoryId, attributeId, productIds)
    }
}
