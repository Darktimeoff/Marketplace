import { Injectable } from '@nestjs/common'
import {
    type CatalogFilterInputInterface,
    type CatalogFilterInteface,
    type CatalogPaginationInputInterface,
    type CatalogSoringInterface,
    CatalogSortingEnum,
} from 'contracts'
import { CatalogCategoryFilterDataloader } from '@/catalog/dataloader/catalog-category-filter.dataloader'
import { CatalogCategoryDynamicFilterDataloaderService } from './catalog-category-dynamic-filter-dataloader.service'
import { CatalogCategoryBrandFilterDataloaderService } from './catalog-category-brand-filter-dataloader.service'
import { CatalogCategorySellerFilterDataloaderService } from './catalog-category-seller-filter-dataloader.service'
import { CatalogCategoryPriceFilterDataloaderService } from './catalog-category-price-filter-dataloader.service'
import { Log } from '@rnw-community/nestjs-enterprise'
import { getErrorMessage } from '@rnw-community/shared'

@Injectable()
export class CatalogCategoryFilterDataloaderService {
    constructor(
        private readonly dataloader: CatalogCategoryFilterDataloader,
        private readonly dynamicFilters: CatalogCategoryDynamicFilterDataloaderService,
        private readonly brandFilters: CatalogCategoryBrandFilterDataloaderService,
        private readonly sellerFilters: CatalogCategorySellerFilterDataloaderService,
        private readonly priceFilters: CatalogCategoryPriceFilterDataloaderService
    ) {}

    @Log(
        (categoryId, categoryIds, filters) =>
            `Get filters by request category id "${categoryId}", children ids "${categoryIds}", filters "${JSON.stringify(filters)}"`,
        (result, categoryId, categoryIds, filters) =>
            `Got ${result.length} filters by request category id "${categoryId}", children ids "${categoryIds}", filters "${JSON.stringify(filters)}"`,
        (error, categoryId, categoryIds, filters) =>
            `Error getting filters by request category id "${categoryId}", children ids "${categoryIds}", filters "${JSON.stringify(filters)}": ${getErrorMessage(error)}`
    )
    async getFiltersByCategoryId(
        categoryId: number,
        categoryIds: number[],
        filters: CatalogFilterInputInterface[]
    ): Promise<CatalogFilterInteface[]> {
        const [sellerFilter, brandFilter, priceFilter, dynamicFilters] = await Promise.all([
            this.sellerFilters.getFilters(categoryIds, filters),
            this.brandFilters.getFilters(categoryIds, filters),
            this.priceFilters.getFilters(categoryIds, filters),
            this.dynamicFilters.getFilters(categoryId, filters),
        ])
        return [sellerFilter, brandFilter, priceFilter].concat(dynamicFilters)
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
        return await this.dataloader.getTotalCount(categoryIds, filters)
    }

    @Log(
        (categoryIds, filters, pagination) =>
            `Get product ids by category ids "${categoryIds}", filters "${JSON.stringify(filters)}", pagination "${JSON.stringify(pagination)}"`,
        (result, categoryIds, filters, pagination) =>
            `Got ${result.length} product ids by category ids "${categoryIds}", filters "${JSON.stringify(filters)}", pagination "${JSON.stringify(pagination)}"`,
        (error, categoryIds, filters, pagination) =>
            `Error getting product ids by category ids "${categoryIds}", filters "${JSON.stringify(filters)}", pagination "${JSON.stringify(pagination)}": ${getErrorMessage(error)}`
    )
    async getProductIds(
        categoryIds: number[],
        filters: CatalogFilterInputInterface[],
        { offset, limit, sorting }: CatalogPaginationInputInterface
    ): Promise<number[]> {
        return await this.dataloader.getFilteredProductIds(categoryIds, filters, {
            offset,
            limit,
            sorting,
        })
    }

    @Log(
        () => `Get sorting options`,
        result => `Got ${result.length} sorting options`,
        error => `Error getting sorting options: ${getErrorMessage(error)}`
    )
    getSortingOptions(): CatalogSoringInterface[] {
        return [
            {
                id: CatalogSortingEnum.NEWEST,
                isDefault: true,
                name: 'Новинки',
            },
            {
                id: CatalogSortingEnum.RATING,
                isDefault: false,
                name: 'Рейтинг',
            },
            {
                id: CatalogSortingEnum.CHEAP,
                isDefault: false,
                name: 'Дешеві',
            },
            {
                id: CatalogSortingEnum.EXPENSIVE,
                isDefault: false,
                name: 'Дорогі',
            },
        ]
    }
}
