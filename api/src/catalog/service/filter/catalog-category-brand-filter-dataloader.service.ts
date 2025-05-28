import { Injectable } from '@nestjs/common'
import { CatalogCategoryFilterServiceInterface } from '@/catalog/interface/catalog-category-filter-service.interface'
import { DBService } from '@/generic/db/db.service'
import type {
    CatalogFilterInputInterface,
    CatalogFilterInteface,
    CatalogFilterValuesSelectType,
} from 'contracts'
import { getErrorMessage, isPositiveNumber } from '@rnw-community/shared'
import { CatalogDefaultFilterSlugEnum } from '@/catalog/enum/catalog-default-filter-slug.enum'
import { CatalogCategoryFilterDataloader } from '@/catalog/dataloader/catalog-category-filter.dataloader'
import { Log } from '@rnw-community/nestjs-enterprise'

@Injectable()
export class CatalogCategoryBrandFilterDataloaderService
    implements CatalogCategoryFilterServiceInterface
{
    constructor(
        private readonly db: DBService,
        private readonly filterDataloader: CatalogCategoryFilterDataloader
    ) {}

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
        const brandCounts = await this.db.product.groupBy({
            where: {
                categoryId: { in: categoryIds },
                brandId: { not: null },
                ...(await this.filterDataloader.buildProductWhereByFilters(
                    filters,
                    CatalogDefaultFilterSlugEnum.BRAND
                )),
            },
            by: ['brandId'],
            _count: { _all: true },
        })
        const brandIds = brandCounts
            .filter(bc => isPositiveNumber(bc.brandId))
            .map(bc => bc.brandId)
        const brands =
            brandIds.length > 0
                ? await this.db.brand.findMany({
                      where: { id: { in: brandIds.filter(isPositiveNumber) } },
                      select: { id: true, name: true },
                  })
                : []
        const brandMap = new Map(brands.map(b => [b.id, b.name]))
        const values: CatalogFilterValuesSelectType[] = brandCounts
            .filter(bc => isPositiveNumber(bc.brandId))
            .map(bc => ({
                id: bc.brandId as number,
                name: brandMap.get(bc.brandId as number) ?? null,
                count: bc._count._all || 0,
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
