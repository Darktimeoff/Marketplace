import { Injectable } from '@nestjs/common'
import type {
    CatalogFilterInputInterface,
    CatalogFilterValuesSelectType,
    CatalogPaginationInputInterface,
    FilterCountableModelInterface,
} from 'contracts'
import { ProductFilterBaseDataloader } from '@/product/dataloader/product-filter-base.dataloader'
import { ProductFilterDataloader } from '@/product/dataloader/product-filter.dataloader'
import { Log } from '@rnw-community/nestjs-enterprise'
import { getErrorMessage } from '@rnw-community/shared'

@Injectable()
export class ProductFilterService {
    constructor(
        private readonly baseFilters: ProductFilterBaseDataloader,
        private readonly filters: ProductFilterDataloader
    ) {}

    @Log(
        (categoryIds, filters, pagination) =>
            `Get filtered product ids by category ids "${categoryIds}", filters "${JSON.stringify(filters)}", pagination "${JSON.stringify(pagination)}"`,
        (result, categoryIds, filters, pagination) =>
            `Got ${result.length} filtered product ids by category ids "${categoryIds}", filters "${JSON.stringify(filters)}", pagination "${JSON.stringify(pagination)}"`,
        (error, categoryIds, filters, pagination) =>
            `Error getting filtered product ids by category ids "${categoryIds}", filters "${JSON.stringify(filters)}", pagination "${JSON.stringify(pagination)}": ${getErrorMessage(error)}`
    )
    async getFilteredProductIds(
        categoryIds: number[],
        filters: CatalogFilterInputInterface[],
        pagination: CatalogPaginationInputInterface
    ): Promise<number[]> {
        return await this.baseFilters.getFilteredProductIds(categoryIds, filters, pagination)
    }

    @Log(
        (categoryIds, filters) =>
            `Get total count by category ids "${categoryIds}", filters "${JSON.stringify(filters)}"`,
        (result, categoryIds, filters) =>
            `Got ${result} total count by category ids "${categoryIds}", filters "${JSON.stringify(filters)}"`,
        (error, categoryIds, filters) =>
            `Error getting total count by category ids "${categoryIds}", filters "${JSON.stringify(filters)}": ${getErrorMessage(error)}`
    )
    async getTotalCount(
        categoryIds: number[],
        filters: CatalogFilterInputInterface[]
    ): Promise<number> {
        return await this.baseFilters.getTotalCount(categoryIds, filters)
    }

    @Log(
        (categoryIds, filters, excludeSlug) =>
            `Get filtered product ids without pagination by category ids "${categoryIds}", filters "${JSON.stringify(filters)}", exclude slug "${excludeSlug}"`,
        (result, categoryIds, filters, excludeSlug) =>
            `Got ${result.length} filtered product ids without pagination by category ids "${categoryIds}", filters "${JSON.stringify(filters)}", exclude slug "${excludeSlug}"`,
        (error, categoryIds, filters, excludeSlug) =>
            `Error getting filtered product ids without pagination by category ids "${categoryIds}", filters "${JSON.stringify(filters)}", exclude slug "${excludeSlug}": ${getErrorMessage(error)}`
    )
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

    @Log(
        (categoryIds, filters) =>
            `Get count by group id by category ids "${categoryIds}", filters "${JSON.stringify(filters)}"`,
        (result, categoryIds, filters) =>
            `Got ${result.length} count by group id by category ids "${categoryIds}", filters "${JSON.stringify(filters)}"`,
        (error, categoryIds, filters) =>
            `Error getting count by group id by category ids "${categoryIds}", filters "${JSON.stringify(filters)}": ${getErrorMessage(error)}`
    )
    async getCountByGroupId(
        categoryIds: number[],
        filters: CatalogFilterInputInterface[]
    ): Promise<FilterCountableModelInterface[]> {
        return await this.filters.getCountByGroupId(categoryIds, filters)
    }

    @Log(
        (categoryIds, filters) =>
            `Get count by seller id by category ids "${categoryIds}", filters "${JSON.stringify(filters)}"`,
        (result, categoryIds, filters) =>
            `Got ${result.length} count by seller id by category ids "${categoryIds}", filters "${JSON.stringify(filters)}"`,
        (error, categoryIds, filters) =>
            `Error getting count by seller id by category ids "${categoryIds}", filters "${JSON.stringify(filters)}": ${getErrorMessage(error)}`
    )
    async getCountBySellerId(
        categoryIds: number[],
        filters: CatalogFilterInputInterface[]
    ): Promise<FilterCountableModelInterface[]> {
        return await this.filters.getCountBySellerId(categoryIds, filters)
    }

    @Log(
        (categoryIds, filters) =>
            `Get price range by category ids "${categoryIds}", filters "${JSON.stringify(filters)}"`,
        (result, categoryIds, filters) =>
            `Got ${result.min} - ${result.max} price range by category ids "${categoryIds}", filters "${JSON.stringify(filters)}"`,
        (error, categoryIds, filters) =>
            `Error getting price range by category ids "${categoryIds}", filters "${JSON.stringify(filters)}": ${getErrorMessage(error)}`
    )
    async getPriceRange(
        categoryIds: number[],
        filters: CatalogFilterInputInterface[]
    ): Promise<{ min: number; max: number }> {
        return await this.filters.getPriceRange(categoryIds, filters)
    }

    @Log(
        (categoryId, attributeId, productIds) =>
            `Get count by attribute id by category id "${categoryId}", attribute id "${attributeId}", product ids "${productIds}"`,
        (result, categoryId, attributeId, productIds) =>
            `Got ${result.length} count by attribute id by category id "${categoryId}", attribute id "${attributeId}", product ids "${productIds}"`,
        (error, categoryId, attributeId, productIds) =>
            `Error getting count by attribute id by category id "${categoryId}", attribute id "${attributeId}", product ids "${productIds}": ${getErrorMessage(error)}`
    )
    async getCountByAttributeId(
        categoryId: number,
        attributeId: number,
        productIds: number[]
    ): Promise<CatalogFilterValuesSelectType[]> {
        return await this.filters.getCountByAttributeId(categoryId, attributeId, productIds)
    }
}
