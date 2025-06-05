import { DBService } from '@/generic/db/db.service'
import { Injectable } from '@nestjs/common'
import { ProductFilterBaseDataloader } from './product-filter-base.dataloader'
import {
    CatalogFilterInputInterface,
    FilterCountableModelInterface,
    ProductFilterSlugEnum,
} from 'contracts'

@Injectable()
export class ProductFilterDataloader {
    constructor(
        private readonly db: DBService,
        private readonly filters: ProductFilterBaseDataloader
    ) {}

    async getCountByGroupId(
        categoryIds: number[],
        filters: CatalogFilterInputInterface[]
    ): Promise<FilterCountableModelInterface[]> {
        const brandCounts = await this.db.product.groupBy({
            where: {
                categoryId: { in: categoryIds },
                brandId: { not: null },
                ...(await this.filters.buildProductWhereByFilters(
                    filters,
                    ProductFilterSlugEnum.BRAND
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

    async getCountBySellerId(
        categoryIds: number[],
        filters: CatalogFilterInputInterface[]
    ): Promise<FilterCountableModelInterface[]> {
        const counts = await this.db.product.groupBy({
            where: {
                categoryId: { in: categoryIds },
                ...(await this.filters.buildProductWhereByFilters(
                    filters,
                    ProductFilterSlugEnum.SELLER
                )),
            },
            by: ['sellerId'],
            _count: { _all: true },
        })

        return counts.map(c => ({
            id: c.sellerId,
            count: c._count._all,
        }))
    }

    async getPriceRange(
        categoryIds: number[],
        filters: CatalogFilterInputInterface[]
    ): Promise<{ min: number; max: number }> {
        const priceAggregates = await this.db.product.aggregate({
            where: {
                categoryId: { in: categoryIds },
                ...(await this.filters.buildProductWhereByFilters(
                    filters,
                    ProductFilterSlugEnum.PRICE
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
