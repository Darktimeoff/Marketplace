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
        const counts = await this.dataloader.getCount(categoryIds, filters)

        const ids = counts.filter(c => isPositiveNumber(c.id)).map(c => c.id)
        const nameModels =
            ids.length > 0 ? await this.dataloader.getNames(ids.filter(isPositiveNumber)) : []
        const nameMap = new Map(nameModels.map(n => [n.id, n.name]))
        const values = counts
            .filter(c => isPositiveNumber(c.id))
            .map(c => ({
                id: c.id,
                name: nameMap.get(c.id) || null,
                count: c.count,
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
