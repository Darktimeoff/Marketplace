import { DBService } from '@/generic/db/db.service'
import { Injectable } from '@nestjs/common'
import { isPositiveNumber } from '@rnw-community/shared'
import { CatalogDefaultFilterSlugEnum } from '@/catalog/enum/catalog-default-filter-slug.enum'

interface FilterValue {
    id: number
    name: string | null
    count: number
}

export interface Filter {
    id: number
    name: string
    slug: string
    values: FilterValue[] | { min: number; max: number }
}

@Injectable()
export class CatalogCategoryFilterDataloaderService {
    constructor(private readonly db: DBService) {}

    async getFiltersByCategoryId(categoryId: number, categoryIds: number[]): Promise<Filter[]> {
        const [sellerFilter, brandFilter, priceFilter, dynamicFilters] = await Promise.all([
            this.getSellerFilter(categoryIds),
            this.getBrandFilter(categoryIds),
            this.getPriceFilter(categoryIds),
            this.getDynamicFilter(categoryId),
        ])
        return [sellerFilter, brandFilter, priceFilter].concat(dynamicFilters)
    }

    private async getDynamicFilter(categoryId: number): Promise<Filter[]> {
        const attributes = await this.db.categoryAttributeFilter.findMany({
            where: { categoryId },
            orderBy: { order: 'asc' },
            select: {
                attribute: {
                    select: {
                        id: true,
                        name: {
                            omit: {
                                ...this.db.getDefaultOmit(),
                            },
                        },
                        slug: true,
                        unit: {
                            omit: {
                                ...this.db.getDefaultOmit(),
                            },
                        },
                    },
                },
            },
        })

        return await Promise.all(
            attributes.map(async a => ({
                id: a.attribute.id,
                name: a.attribute.name.uk_ua,
                slug: a.attribute.slug,
                values: await this.getValues(
                    categoryId,
                    a.attribute.id,
                    a.attribute.unit?.uk_ua ?? null
                ),
            }))
        )
    }

    private async getValues(
        categoryId: number,
        attributeId: number,
        unit: string | null
    ): Promise<FilterValue[]> {
        const values = await this.db.$queryRaw<FilterValue[]>`
            SELECT 
                MIN(PAV.id) AS id,
                COALESCE(T_PAV.uk_ua, TO_CHAR(ROUND(PAV."numberValue", 2), 'FM999999999.00')) AS name,
                COUNT(*) AS count
            FROM "ProductAttributeValue" PAV
            LEFT JOIN "Translation" T_PAV ON T_PAV.id = PAV."textValueId"
            JOIN "Product" P ON PAV."productId" = P.id
            WHERE PAV."attributeId" = ${attributeId} AND P."categoryId" = ${categoryId}
            GROUP BY name
            ORDER BY count DESC
        `

        return values.map(v => ({
            id: v.id,
            name: v.name + (unit ? ` ${unit}` : ''),
            count: Number(v.count),
        }))
    }

    private async getSellerFilter(categoryIds: number[]): Promise<Filter> {
        const sellerCounts = await this.db.product.groupBy({
            where: { categoryId: { in: categoryIds } },
            by: ['sellerId'],
            _count: { _all: true },
        })
        const sellerIds = sellerCounts
            .filter(sc => isPositiveNumber(sc.sellerId))
            .map(sc => sc.sellerId)
        const sellers =
            sellerIds.length > 0
                ? await this.db.seller.findMany({
                      where: { id: { in: sellerIds } },
                      select: { id: true, name: true },
                  })
                : []
        const sellerMap = new Map(sellers.map(s => [s.id, s.name]))
        const values: FilterValue[] = sellerCounts
            .filter(sc => isPositiveNumber(sc.sellerId))
            .map(sc => ({
                id: sc.sellerId,
                name: sellerMap.get(sc.sellerId) || null,
                count: sc._count._all || 0,
            }))
            .sort((a, b) => b.count - a.count)
        return {
            id: 1,
            name: 'Продавец',
            slug: CatalogDefaultFilterSlugEnum.SELLER,
            values,
        }
    }

    private async getBrandFilter(categoryIds: number[]): Promise<Filter> {
        const brandCounts = await this.db.product.groupBy({
            where: { categoryId: { in: categoryIds }, brandId: { not: null } },
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
        const values: FilterValue[] = brandCounts
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

    private async getPriceFilter(categoryIds: number[]): Promise<Filter> {
        const priceAggregates = await this.db.product.aggregate({
            where: { categoryId: { in: categoryIds } },
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
