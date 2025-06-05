import { Injectable } from '@nestjs/common'
import { CatalogCategoryFilterServiceInterface } from '@/catalog/interface/catalog-category-filter-service.interface'
import {
    type CatalogFilterInputInterface,
    type CatalogFilterInteface,
    ProductFilterSlugEnum,
} from 'contracts'
import { Log } from '@rnw-community/nestjs-enterprise'
import { getErrorMessage } from '@rnw-community/shared'
import { ProductFacade } from '@/product/facade/product-filter.facade'

@Injectable()
export class CatalogCategoryPriceFilterDataloaderService
    implements CatalogCategoryFilterServiceInterface
{
    constructor(private readonly products: ProductFacade) {}

    @Log(
        (categoryIds, filters) =>
            `Get price filters by category ids "${categoryIds}", filters "${JSON.stringify(filters)}"`,
        (result, categoryIds, filters) =>
            `Got ${result.name} price filters by category ids "${categoryIds}", filters "${JSON.stringify(filters)}"`,
        (error, categoryIds, filters) =>
            `Error getting price filters by category ids "${categoryIds}", filters "${JSON.stringify(filters)}": ${getErrorMessage(error)}`
    )
    async getFilter(
        categoryIds: number[],
        filters: CatalogFilterInputInterface[]
    ): Promise<CatalogFilterInteface> {
        const values = await this.products.getPriceRange(categoryIds, filters)

        return {
            id: 3,
            name: 'Ціна',
            slug: ProductFilterSlugEnum.PRICE,
            values,
        }
    }
}
