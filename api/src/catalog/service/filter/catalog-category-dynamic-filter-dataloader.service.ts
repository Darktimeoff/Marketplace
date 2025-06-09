import { Injectable } from '@nestjs/common'
import { getErrorMessage, isEmptyArray } from '@rnw-community/shared'
import type {
    CatalogFilterInputInterface,
    CatalogFilterInteface,
    CatalogFilterValuesSelectType,
} from 'contracts'
import { Log } from '@rnw-community/nestjs-enterprise'
import { ProductFacade } from '@/product/facade/product-filter.facade'
import { CategoryFacade } from '@/category/facade/category.facade'

@Injectable()
export class CatalogCategoryDynamicFilterDataloaderService {
    constructor(
        private readonly categories: CategoryFacade,
        private readonly products: ProductFacade
    ) {}

    @Log(
        (categoryId, filters) =>
            `Get dynamic filters by category id "${categoryId}", filters "${JSON.stringify(filters)}"`,
        (result, categoryId, filters) =>
            `Got ${result.length} dynamic filters by category id "${categoryId}", filters "${JSON.stringify(filters)}"`,
        (error, categoryId, filters) =>
            `Error getting dynamic filters by category id "${categoryId}", filters "${JSON.stringify(filters)}": ${getErrorMessage(error)}`
    )
    async getFilters(
        categoryId: number,
        filters: CatalogFilterInputInterface[]
    ): Promise<CatalogFilterInteface[]> {
        const attributes = await this.categories.getDynamicFiltersByCategoryId(categoryId)

        return await Promise.all(
            attributes.map(async a => ({
                id: a.id,
                name: a.name,
                slug: a.slug,
                values: await this.getValues(categoryId, a.id, a.slug, a.unit, filters),
            }))
        )
    }

    private async getValues(
        categoryId: number,
        attributeId: number,
        attributeSlug: string,
        unit: string | null,
        filters: CatalogFilterInputInterface[]
    ): Promise<CatalogFilterValuesSelectType[]> {
        const productIds = await this.products.getFilteredProductIdsWithoutPagination(
            [categoryId],
            filters,
            attributeSlug
        )

        if (isEmptyArray(productIds)) {
            return []
        }

        const values = await this.products.getCountByAttributeId(
            categoryId,
            attributeId,
            productIds
        )

        return values.map(v => ({
            id: v.id,
            name: v.name + (unit ? ` ${unit}` : ''),
            count: Number(v.count),
        }))
    }
}
