import { Injectable } from '@nestjs/common'
import { CatalogCategoryFilterDataloader } from '@/catalog/dataloader/catalog-category-filter.dataloader'
import { getErrorMessage, isEmptyArray } from '@rnw-community/shared'
import type {
    CatalogFilterInputInterface,
    CatalogFilterInteface,
    CatalogFilterValuesSelectType,
} from 'contracts'
import { Log } from '@rnw-community/nestjs-enterprise'
import { CatalogCategoryDynamicFilterDataloader } from '@/catalog/dataloader/catalog-category-dynamic-filter.dataloader'

@Injectable()
export class CatalogCategoryDynamicFilterDataloaderService {
    constructor(
        private readonly dataloader: CatalogCategoryDynamicFilterDataloader,
        private readonly filterDataloader: CatalogCategoryFilterDataloader
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
        const attributes = await this.dataloader.getFiltersByCategoryId(categoryId)

        return await Promise.all(
            attributes.map(async a => ({
                id: a.id,
                name: a.name.uk_ua,
                slug: a.slug,
                values: await this.getValues(
                    categoryId,
                    a.id,
                    a.slug,
                    a.unit?.uk_ua ?? null,
                    filters
                ),
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
        const productIds = await this.filterDataloader.getFilteredProductIdsWithoutPagination(
            [categoryId],
            filters,
            attributeSlug
        )

        if (isEmptyArray(productIds)) {
            return []
        }

        const values = await this.dataloader.getFilterValues(categoryId, attributeId, productIds)

        return values.map(v => ({
            id: v.id,
            name: v.name + (unit ? ` ${unit}` : ''),
            count: Number(v.count),
        }))
    }
}
