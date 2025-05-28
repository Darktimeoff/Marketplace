import { Injectable } from '@nestjs/common'
import { CatalogCategoryFilterServiceInterface } from '@/catalog/interface/catalog-category-filter-service.interface'

import type { CatalogFilterInputInterface, CatalogFilterInteface } from 'contracts'
import { getErrorMessage, isPositiveNumber } from '@rnw-community/shared'
import { CatalogDefaultFilterSlugEnum } from '@/catalog/enum/catalog-default-filter-slug.enum'
import { Log } from '@rnw-community/nestjs-enterprise'
import { CatalogCategorySellerFilterDataloader } from '@/catalog/dataloader/catalog-category-seller-filter.dataloader'

@Injectable()
export class CatalogCategorySellerFilterDataloaderService
    implements CatalogCategoryFilterServiceInterface
{
    constructor(private readonly dataloader: CatalogCategorySellerFilterDataloader) {}

    @Log(
        (categoryIds, filters) =>
            `Get seller filters by category ids "${categoryIds}", filters "${JSON.stringify(filters)}"`,
        (result, categoryIds, filters) =>
            `Got ${result.name} seller filters by category ids "${categoryIds}", filters "${JSON.stringify(filters)}"`,
        (error, categoryIds, filters) =>
            `Error getting seller filters by category ids "${categoryIds}", filters "${JSON.stringify(filters)}": ${getErrorMessage(error)}`
    )
    async getFilters(
        categoryIds: number[],
        filters: CatalogFilterInputInterface[]
    ): Promise<CatalogFilterInteface> {
        const sellerCounts = await this.dataloader.getCount(categoryIds, filters)

        const sellerIds = sellerCounts
            .filter(sc => isPositiveNumber(sc.sellerId))
            .map(sc => sc.sellerId)
        const sellers =
            sellerIds.length > 0
                ? await this.dataloader.getNames(sellerIds.filter(isPositiveNumber))
                : []
        const sellerMap = new Map(sellers.map(s => [s.id, s.name]))
        const values = sellerCounts
            .filter(sc => isPositiveNumber(sc.sellerId))
            .map(sc => ({
                id: sc.sellerId,
                name: sellerMap.get(sc.sellerId) || null,
                count: sc._count._all || 0,
            }))
            .sort((a, b) => b.count - a.count)
        return {
            id: 1,
            name: 'Продавец',
            slug: CatalogDefaultFilterSlugEnum.SELLER,
            values,
        }
    }
}
