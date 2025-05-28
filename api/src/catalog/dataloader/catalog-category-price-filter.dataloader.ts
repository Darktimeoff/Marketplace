import { Injectable } from '@nestjs/common'
import { DBService } from '@/generic/db/db.service'
import { CatalogCategoryFilterDataloader } from './catalog-category-filter.dataloader'
import { CatalogFilterInputInterface } from 'contracts'
import { CatalogDefaultFilterSlugEnum } from '@/catalog/enum/catalog-default-filter-slug.enum'

@Injectable()
export class CatalogCategoryPriceFilterDataloader {
    constructor(
        private readonly db: DBService,
        private readonly filterDataloader: CatalogCategoryFilterDataloader
    ) {}

    async getRange(
        categoryIds: number[],
        filters: CatalogFilterInputInterface[]
    ): Promise<{ min: number; max: number }> {
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
            min: priceAggregates._min.price ? Number(priceAggregates._min.price) : 0,
            max: priceAggregates._max.price ? Number(priceAggregates._max.price) : 0,
        }
    }
}
