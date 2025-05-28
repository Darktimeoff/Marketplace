import { Injectable } from '@nestjs/common'
import { CatalogCategoryFilterDataloaderInterface } from '@/catalog/interface/catalog-category-filter-dataloader.interface'
import { SellerFilterCountableModelInterface } from '@/catalog/interface/sellter-filter-countable-model.interface'
import { CatalogFilterInputInterface } from 'contracts'
import { DBService } from '@/generic/db/db.service'
import { CatalogDefaultFilterSlugEnum } from '@/catalog/enum/catalog-default-filter-slug.enum'
import { CatalogCategoryFilterDataloader } from './catalog-category-filter.dataloader'
import { NamesFilterModelInterface } from '@/catalog/interface/names-filter-model.interface'

@Injectable()
export class CatalogCategorySellerFilterDataloader
    implements CatalogCategoryFilterDataloaderInterface<SellerFilterCountableModelInterface>
{
    constructor(
        private readonly db: DBService,
        private readonly filterDataloader: CatalogCategoryFilterDataloader
    ) {}

    async getCount(
        categoryIds: number[],
        filters: CatalogFilterInputInterface[]
    ): Promise<SellerFilterCountableModelInterface[]> {
        const counts = await this.db.product.groupBy({
            where: {
                categoryId: { in: categoryIds },
                ...(await this.filterDataloader.buildProductWhereByFilters(
                    filters,
                    CatalogDefaultFilterSlugEnum.SELLER
                )),
            },
            by: ['sellerId'],
            _count: { _all: true },
        })

        return counts
    }

    async getNames(ids: number[]): Promise<NamesFilterModelInterface[]> {
        return await this.db.seller.findMany({
            where: { id: { in: ids } },
            select: { id: true, name: true },
        })
    }
}
