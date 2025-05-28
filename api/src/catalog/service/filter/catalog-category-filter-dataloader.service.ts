import { Injectable } from '@nestjs/common'
import {
    CatalogFilterInputInterface,
    CatalogFilterInteface,
    CatalogPaginationInputInterface,
    CatalogSoringInterface,
    CatalogSortingEnum,
} from 'contracts'
import { CatalogCategoryFilterDataloader } from '@/catalog/dataloader/catalog-category-filter.dataloader'
import { CatalogCategoryDynamicFilterDataloaderService } from './catalog-category-dynamic-filter-dataloader.service'
import { CatalogCategoryBrandFilterDataloaderService } from './catalog-category-brand-filter-dataloader.service'
import { CatalogCategorySellerFilterDataloaderService } from './catalog-category-seller-filter-dataloader.service'
import { CatalogCategoryPriceFilterDataloaderService } from './catalog-category-price-filter-dataloader.service'

@Injectable()
export class CatalogCategoryFilterDataloaderService {
    constructor(
        private readonly dataloader: CatalogCategoryFilterDataloader,
        private readonly dynamicFilters: CatalogCategoryDynamicFilterDataloaderService,
        private readonly brandFilters: CatalogCategoryBrandFilterDataloaderService,
        private readonly sellerFilters: CatalogCategorySellerFilterDataloaderService,
        private readonly priceFilters: CatalogCategoryPriceFilterDataloaderService
    ) {}

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

    async getTotalCount(
        categoryIds: number[],
        filters: CatalogFilterInputInterface[]
    ): Promise<number> {
        return await this.dataloader.getTotalCount(categoryIds, filters)
    }

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
