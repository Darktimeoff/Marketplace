import { DBService } from '@/generic/db/db.service'
import { Injectable } from '@nestjs/common'
import { CatalogDefaultFilterSlugEnum } from '@/catalog/enum/catalog-default-filter-slug.enum'
import {
    CatalogFilterInputInterface,
    CatalogFilterInteface,
    CatalogPaginationInputInterface,
    CatalogSoringInterface,
    CatalogSortingEnum,
} from 'contracts'
import { CatalogCategoryFilterDataloader } from '@/catalog/dataloader/catalog-category-filter.dataloader'
import { CatalogCategoryDynamicFilterDataloaderService } from './filter/catalog-category-dynamic-filter-dataloader.service'
import { CatalogCategoryBrandFilterDataloaderService } from './filter/catalog-category-brand-filter-dataloader.service'
import { CatalogCategorySellerFilterDataloaderService } from './filter/catalog-category-seller-filter-dataloader.service'

@Injectable()
export class CatalogCategoryFilterDataloaderService {
    constructor(
        private readonly db: DBService,
        private readonly dataloader: CatalogCategoryFilterDataloader,
        private readonly dynamicFilters: CatalogCategoryDynamicFilterDataloaderService,
        private readonly brandFilters: CatalogCategoryBrandFilterDataloaderService,
        private readonly sellerFilters: CatalogCategorySellerFilterDataloaderService
    ) {}

    async getFiltersByCategoryId(
        categoryId: number,
        categoryIds: number[],
        filters: CatalogFilterInputInterface[]
    ): Promise<CatalogFilterInteface[]> {
        const [sellerFilter, brandFilter, priceFilter, dynamicFilters] = await Promise.all([
            this.sellerFilters.getFilters(categoryIds, filters),
            this.brandFilters.getFilters(categoryIds, filters),
            this.getPriceFilter(categoryIds, filters),
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

    private async getPriceFilter(
        categoryIds: number[],
        filters: CatalogFilterInputInterface[]
    ): Promise<CatalogFilterInteface> {
        const priceAggregates = await this.db.product.aggregate({
            where: {
                categoryId: { in: categoryIds },
                ...(await this.dataloader.buildProductWhereByFilters(
                    filters,
                    CatalogDefaultFilterSlugEnum.PRICE
                )),
            },
            _min: { price: true },
            _max: { price: true },
        })
        return {
            id: 3,
            name: 'Ціна',
            slug: CatalogDefaultFilterSlugEnum.PRICE,
            values: {
                min: priceAggregates._min.price ? Number(priceAggregates._min.price) : 0,
                max: priceAggregates._max.price ? Number(priceAggregates._max.price) : 0,
            },
        }
    }
}
