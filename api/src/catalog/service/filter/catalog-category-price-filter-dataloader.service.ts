import { Injectable } from '@nestjs/common'
import { CatalogCategoryFilterServiceInterface } from '@/catalog/interface/catalog-category-filter-service.interface'
import type { CatalogFilterInputInterface, CatalogFilterInteface } from 'contracts'
import { CatalogDefaultFilterSlugEnum } from '@/catalog/enum/catalog-default-filter-slug.enum'
import { Log } from '@rnw-community/nestjs-enterprise'
import { getErrorMessage } from '@rnw-community/shared'
import { CatalogCategoryPriceFilterDataloader } from '@/catalog/dataloader/catalog-category-price-filter.dataloader'

@Injectable()
export class CatalogCategoryPriceFilterDataloaderService
    implements CatalogCategoryFilterServiceInterface
{
    constructor(private readonly dataloader: CatalogCategoryPriceFilterDataloader) {}

    @Log(
        (categoryIds, filters) =>
            `Get price filters by category ids "${categoryIds}", filters "${JSON.stringify(filters)}"`,
        (result, categoryIds, filters) =>
            `Got ${result.name} price filters by category ids "${categoryIds}", filters "${JSON.stringify(filters)}"`,
        (error, categoryIds, filters) =>
            `Error getting price filters by category ids "${categoryIds}", filters "${JSON.stringify(filters)}": ${getErrorMessage(error)}`
    )
    async getFilters(
        categoryIds: number[],
        filters: CatalogFilterInputInterface[]
    ): Promise<CatalogFilterInteface> {
        const values = await this.dataloader.getRange(categoryIds, filters)

        return {
            id: 3,
            name: 'Ціна',
            slug: CatalogDefaultFilterSlugEnum.PRICE,
            values,
        }
    }
}
