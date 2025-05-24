import { DBService } from '@/generic/db/db.service'
import { BadRequestException, Injectable } from '@nestjs/common'
import { isDefined, isEmptyArray, isNotEmptyArray, isPositiveNumber } from '@rnw-community/shared'
import { CatalogDefaultFilterSlugEnum } from '@/catalog/enum/catalog-default-filter-slug.enum'
import { Prisma } from '@/generic/db/generated'
import {
    CatalogFilterInputInterface,
    CatalogFilterInteface,
    CatalogFilterValuesSelectType,
    CatalogSortingEnum,
} from 'contracts'
import { CatalogPaginationInput } from '@/catalog/input/catalog-pagination.input'

export interface SortingOption {
    id: string
    isDefault: boolean
    name: string
}

@Injectable()
export class CatalogCategoryFilterDataloaderService {
    constructor(private readonly db: DBService) {}

    async getFiltersByCategoryId(
        categoryId: number,
        categoryIds: number[],
        filters: CatalogFilterInputInterface[]
    ): Promise<CatalogFilterInteface[]> {
        const [sellerFilter, brandFilter, priceFilter, dynamicFilters] = await Promise.all([
            this.getSellerFilter(categoryIds, filters),
            this.getBrandFilter(categoryIds, filters),
            this.getPriceFilter(categoryIds, filters),
            this.getDynamicFilter(categoryId, filters),
        ])
        return [sellerFilter, brandFilter, priceFilter].concat(dynamicFilters)
    }

    async getTotalCount(
        categoryIds: number[],
        filters: CatalogFilterInputInterface[]
    ): Promise<number> {
        const productWhere = {
            categoryId: { in: categoryIds },
            ...(await this.buildProductWhereByFilters(filters)),
        }

        return await this.db.product.count({
            where: productWhere,
        })
    }

    async getProductIds(
        categoryIds: number[],
        filters: CatalogFilterInputInterface[],
        { offset, limit, sorting }: CatalogPaginationInput
    ): Promise<number[]> {
        const productWhere = {
            categoryId: { in: categoryIds },
            ...(await this.buildProductWhereByFilters(filters)),
        }

        return (
            await this.db.product.findMany({
                where: productWhere,
                select: { id: true },
                skip: offset,
                take: limit,
                orderBy: this.buildOrderBy(sorting),
            })
        ).map(p => p.id)
    }

    async getSortingOptions(): Promise<SortingOption[]> {
        return [
            {
                id: CatalogSortingEnum.NEWEST,
                isDefault: true,
                name: 'Новинки',
            },
            {
                id: CatalogSortingEnum.RATING,
                isDefault: false,
                name: 'Рейтинг',
            },
            {
                id: CatalogSortingEnum.CHEAP,
                isDefault: false,
                name: 'Дешеві',
            },
            {
                id: CatalogSortingEnum.EXPENSIVE,
                isDefault: false,
                name: 'Дорогі',
            },
        ]
    }

    private buildOrderBy(sorting: CatalogSortingEnum): Prisma.ProductOrderByWithRelationInput {
        switch (sorting) {
            case CatalogSortingEnum.NEWEST:
                return { createdAt: 'desc' }
            case CatalogSortingEnum.CHEAP:
                return { price: 'asc' }
            case CatalogSortingEnum.EXPENSIVE:
                return { price: 'desc' }
            default:
                throw new BadRequestException('Unsupported sorting')
        }
    }

    private async getDynamicFilter(
        categoryId: number,
        filters: CatalogFilterInputInterface[]
    ): Promise<CatalogFilterInteface[]> {
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
                    a.attribute.slug,
                    a.attribute.unit?.uk_ua ?? null,
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
        const productWhere = {
            categoryId,
            ...(await this.buildProductWhereByFilters(filters, attributeSlug)),
        }

        const productIds = (
            await this.db.product.findMany({
                where: productWhere,
                select: { id: true },
            })
        ).map(p => p.id)
        if (isEmptyArray(productIds)) {
            return []
        }

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

        return values.map(v => ({
            id: v.id,
            name: v.name + (unit ? ` ${unit}` : ''),
            count: Number(v.count),
        }))
    }

    private async getSellerFilter(
        categoryIds: number[],
        filters: CatalogFilterInputInterface[]
    ): Promise<CatalogFilterInteface> {
        const sellerCounts = await this.db.product.groupBy({
            where: {
                categoryId: { in: categoryIds },
                ...(await this.buildProductWhereByFilters(
                    filters,
                    CatalogDefaultFilterSlugEnum.SELLER
                )),
            },
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
        const values = sellerCounts
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

    private async getBrandFilter(
        categoryIds: number[],
        filters: CatalogFilterInputInterface[]
    ): Promise<CatalogFilterInteface> {
        const brandCounts = await this.db.product.groupBy({
            where: {
                categoryId: { in: categoryIds },
                brandId: { not: null },
                ...(await this.buildProductWhereByFilters(
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

    private async getPriceFilter(
        categoryIds: number[],
        filters: CatalogFilterInputInterface[]
    ): Promise<CatalogFilterInteface> {
        const priceAggregates = await this.db.product.aggregate({
            where: {
                categoryId: { in: categoryIds },
                ...(await this.buildProductWhereByFilters(
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

    private async buildProductWhereByFilters(
        filters: CatalogFilterInputInterface[],
        excludeSlug?: string
    ): Promise<Prisma.ProductWhereInput> {
        const where: Prisma.ProductWhereInput = {}
        const attributeFilters: { slug: string; values: number[] }[] = []

        for (const filter of filters) {
            if (filter.slug === excludeSlug) {
                continue
            }
            switch (filter.slug) {
                case CatalogDefaultFilterSlugEnum.SELLER:
                    if (Array.isArray(filter.values)) {
                        where.sellerId = { in: filter.values }
                    }
                    break
                case CatalogDefaultFilterSlugEnum.BRAND:
                    if (Array.isArray(filter.values)) {
                        where.brandId = { in: filter.values }
                    }
                    break
                case CatalogDefaultFilterSlugEnum.PRICE:
                    if (!Array.isArray(filter.values)) {
                        where.price = {
                            gte: filter.values.min,
                            lte: filter.values.max,
                        }
                    }
                    break
                default:
                    if (Array.isArray(filter.values)) {
                        attributeFilters.push({
                            slug: filter.slug,
                            values: filter.values,
                        })
                    }
                    break
            }
        }

        if (isEmptyArray(attributeFilters)) {
            return where
        }

        const attributesValues = await this.db.productAttributeValue.findMany({
            where: {
                id: { in: attributeFilters.flatMap(f => f.values) },
            },
            select: {
                attribute: { select: { slug: true } },
                numberValue: true,
                textValue: { select: { uk_ua: true } },
            },
        })

        const attributeValuesMap = new Map<
            string,
            Array<{ numberValue: number | null; textValue: string | null }>
        >()

        attributesValues.forEach(value => {
            const slug = value.attribute.slug
            const currentValue = {
                numberValue: value.numberValue?.toNumber() ?? null,
                textValue: value.textValue?.uk_ua ?? null,
            }

            if (!attributeValuesMap.has(slug)) {
                attributeValuesMap.set(slug, [])
            }

            attributeValuesMap.get(slug)?.push(currentValue)
        })

        where.AND = attributeFilters.map(f => {
            const values = attributeValuesMap.get(f.slug)

            if (!isNotEmptyArray(values)) {
                return {}
            }

            return {
                productAttributeValues: {
                    some: {
                        attribute: { slug: f.slug },
                        OR: values.map(v => ({
                            ...(isDefined(v.textValue) && { textValue: { uk_ua: v.textValue } }),
                            ...(isDefined(v.numberValue) && { numberValue: v.numberValue }),
                        })),
                    },
                },
            }
        })

        return where
    }
}
