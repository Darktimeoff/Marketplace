import { DBService } from '@/generic/db/db.service'
import { Injectable } from '@nestjs/common'
import { CatalogCategoryFilterDataloader } from './catalog-category-filter.dataloader'
import { CatalogDefaultFilterSlugEnum } from '@/catalog/enum/catalog-default-filter-slug.enum'
import { CatalogFilterInputInterface } from 'contracts'
import { CatalogCategoryFilterDataloaderInterface } from '@/catalog/interface/catalog-category-filter-dataloader.interface'
import { NamesFilterModelInterface } from '@/catalog/interface/names-filter-model.interface'
import { FilterCountableModelInterface } from '@/catalog/interface/filter-countable-model.interface'

@Injectable()
export class CatalogCategoryBrandFilterDataloader
    implements CatalogCategoryFilterDataloaderInterface
{
    constructor(
        private readonly db: DBService,
        private readonly filterDataloader: CatalogCategoryFilterDataloader
    ) {}

    async getCount(
        categoryIds: number[],
        filters: CatalogFilterInputInterface[]
    ): Promise<FilterCountableModelInterface[]> {
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

        return brandCounts.map(bc => ({
            id: bc.brandId as number,
            count: bc._count._all ?? 0,
        }))
    }

    async getNames(ids: number[]): Promise<NamesFilterModelInterface[]> {
        return await this.db.brand.findMany({
            where: { id: { in: ids } },
            select: { id: true, name: true },
        })
    }
}
