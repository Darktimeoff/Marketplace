import { Injectable } from '@nestjs/common'
import { CatalogCategoryFilterServiceInterface } from '@/catalog/interface/catalog-category-filter-service.interface'
import { DBService } from '@/generic/db/db.service'
import { CatalogCategoryFilterDataloader } from '@/catalog/dataloader/catalog-category-filter.dataloader'
import { CatalogFilterInputInterface } from 'contracts'
import { CatalogFilterInteface } from 'contracts'
import { CatalogDefaultFilterSlugEnum } from '@/catalog/enum/catalog-default-filter-slug.enum'

@Injectable()
export class CatalogCategoryPriceFilterDataloaderService
    implements CatalogCategoryFilterServiceInterface
{
    constructor(
        private readonly db: DBService,
        private readonly filterDataloader: CatalogCategoryFilterDataloader
    ) {}

    async getFilters(
        categoryIds: number[],
        filters: CatalogFilterInputInterface[]
    ): Promise<CatalogFilterInteface> {
        const priceAggregates = await this.db.product.aggregate({
            where: {
                categoryId: { in: categoryIds },
                ...(await this.filterDataloader.buildProductWhereByFilters(
                    filters,
                    CatalogDefaultFilterSlugEnum.PRICE
                )),
            },
            _min: { price: true },
            _max: { price: true },
        })

        return {
            id: 3,
            name: 'Ціна',
            slug: CatalogDefaultFilterSlugEnum.PRICE,
            values: {
                min: priceAggregates._min.price ? Number(priceAggregates._min.price) : 0,
                max: priceAggregates._max.price ? Number(priceAggregates._max.price) : 0,
            },
        }
    }
}
