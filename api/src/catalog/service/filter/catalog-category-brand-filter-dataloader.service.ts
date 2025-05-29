import { Injectable } from '@nestjs/common'
import { CatalogCategoryFilterServiceInterface } from '@/catalog/interface/catalog-category-filter-service.interface'
import type {
    CatalogFilterInputInterface,
    CatalogFilterInteface,
    CatalogFilterValuesSelectType,
} from 'contracts'
import { getErrorMessage, isPositiveNumber } from '@rnw-community/shared'
import { CatalogDefaultFilterSlugEnum } from '@/catalog/enum/catalog-default-filter-slug.enum'
import { Log } from '@rnw-community/nestjs-enterprise'
import { CatalogCategoryBrandFilterDataloader } from '@/catalog/dataloader/catalog-category-brand-filter.dataloader'

@Injectable()
export class CatalogCategoryBrandFilterDataloaderService
    implements CatalogCategoryFilterServiceInterface
{
    constructor(private readonly dataloader: CatalogCategoryBrandFilterDataloader) {}

    @Log(
        (categoryIds, filters) =>
            `Get brand filters by category ids "${categoryIds}", filters "${JSON.stringify(filters)}"`,
        (result, categoryIds, filters) =>
            `Got ${result.name} brand filters by category ids "${categoryIds}", filters "${JSON.stringify(filters)}"`,
        (error, categoryIds, filters) =>
            `Error getting brand filters by category ids "${categoryIds}", filters "${JSON.stringify(filters)}": ${getErrorMessage(error)}`
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
        const values: CatalogFilterValuesSelectType[] = counts
            .filter(c => isPositiveNumber(c.id))
            .map(c => ({
                id: c.id,
                name: nameMap.get(c.id) ?? null,
                count: c.count,
            }))
            .sort((a, b) => b.count - a.count)

        return {
            id: 2,
            name: 'Бренд',
            slug: CatalogDefaultFilterSlugEnum.BRAND,
            values,
        }
    }
}
