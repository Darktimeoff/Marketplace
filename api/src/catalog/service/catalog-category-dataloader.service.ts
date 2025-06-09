import { Injectable } from '@nestjs/common'
import { CategoryFacade } from '@/category/facade/category.facade'
import { CatalogCategoryFilterDataloaderService } from './filter/catalog-category-filter-dataloader.service'
import type { CatalogCategoryFiltersInteface, CatalogFilterInputInterface } from 'contracts'
import { CatalogPaginationInput } from '@/catalog/input/catalog-pagination.input'
import { Log } from '@rnw-community/nestjs-enterprise'
import { getErrorMessage } from '@rnw-community/shared'
@Injectable()
export class CatalogCategoryDataloaderService {
    constructor(
        private readonly categories: CategoryFacade,
        private readonly filters: CatalogCategoryFilterDataloaderService
    ) {}

    @Log(
        (id, filtersInput) =>
            `Get filters by category id "${id}", filters "${JSON.stringify(filtersInput)}"`,
        (result, id, filtersInput) =>
            `Got ${result.filters.length} filters by category id "${id}", filters "${JSON.stringify(filtersInput)}"`,
        (error, id, filtersInput) =>
            `Error getting filters by category id "${id}", filters "${JSON.stringify(filtersInput)}": ${getErrorMessage(error)}`
    )
    async getByCategoryIdFilters(
        id: number,
        filtersInput: CatalogFilterInputInterface[]
    ): Promise<CatalogCategoryFiltersInteface> {
        const categories = await this.categories.getChildrenIdsByCategoryId(id)
        const [total, filters] = await Promise.all([
            this.filters.getTotalCount(categories, filtersInput),
            this.filters.getFiltersByCategoryId(id, categories, filtersInput),
        ])

        return {
            total,
            filters,
            sorting: this.filters.getSortingOptions(),
        }
    }

    @Log(
        (id, pagination, filters) =>
            `Get product ids by category id "${id}", pagination "${JSON.stringify(pagination)}", filters "${JSON.stringify(filters)}"`,
        (result, id, pagination, filters) =>
            `Got ${result.length} product ids by category id "${id}", pagination "${JSON.stringify(pagination)}", filters "${JSON.stringify(filters)}"`
    )
    async getByCategoryId(
        id: number,
        pagination: CatalogPaginationInput,
        filters: CatalogFilterInputInterface[]
    ): Promise<number[]> {
        const categories = await this.categories.getChildrenIdsByCategoryId(id)

        return await this.filters.getProductIds(categories, filters, pagination)
    }
}
