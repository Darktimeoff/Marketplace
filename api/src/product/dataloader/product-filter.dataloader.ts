import { DBService } from '@/generic/db/db.service'
import { Injectable } from '@nestjs/common'
import { ProductFilterBaseDataloader } from './product-filter-base.dataloader'
import {
    CatalogFilterInputInterface,
    CatalogFilterValuesSelectType,
    FilterCountableModelInterface,
    ProductFilterSlugEnum,
} from 'contracts'
import { Prisma } from '@/generic/db/generated'

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

    async getCountByAttributeId(
        categoryId: number,
        attributeId: number,
        productIds: number[]
    ): Promise<CatalogFilterValuesSelectType[]> {
        const values = await this.db.$queryRaw<CatalogFilterValuesSelectType[]>`
            SELECT 
                MIN(PAV.id) AS id,
                COALESCE(T_PAV.uk_ua, TO_CHAR(ROUND(PAV."numberValue", 2), 'FM999999999.00')) AS name,
                COUNT(*) AS count
            FROM "ProductAttributeValue" PAV
            LEFT JOIN "Translation" T_PAV ON T_PAV.id = PAV."textValueId"
            JOIN "Product" P ON PAV."productId" = P.id
            WHERE PAV."attributeId" = ${attributeId} AND P."categoryId" = ${categoryId} AND PAV."productId" IN (${Prisma.join(productIds)})
            GROUP BY name
            ORDER BY count DESC
        `

        return values
    }
}
