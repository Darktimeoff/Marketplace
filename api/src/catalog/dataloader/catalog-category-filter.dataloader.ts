import { BadRequestException, Injectable } from '@nestjs/common'
import { DBService } from '@/generic/db/db.service'
import {
    CatalogFilterInputInterface,
    CatalogPaginationInputInterface,
    CatalogSortingEnum,
} from 'contracts'
import { Prisma } from '@/generic/db/generated'
import { CatalogDefaultFilterSlugEnum } from '@/catalog/enum/catalog-default-filter-slug.enum'
import { isEmptyArray, isNotEmptyArray } from '@rnw-community/shared'
import { isDefined } from 'class-validator'

@Injectable()
export class CatalogCategoryFilterDataloader {
    constructor(private readonly db: DBService) {}

    async getFilteredProductIds(
        categoryIds: number[],
        filters: CatalogFilterInputInterface[],
        { offset, limit, sorting }: CatalogPaginationInputInterface
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

    async getTotalCount(
        categoryIds: number[],
        filters: CatalogFilterInputInterface[]
    ): Promise<number> {
        const where = {
            categoryId: { in: categoryIds },
            ...(await this.buildProductWhereByFilters(filters)),
        }

        return await this.db.product.count({
            where,
        })
    }

    async getFilteredProductIdsWithoutPagination(
        categoryIds: number[],
        filters: CatalogFilterInputInterface[],
        excludeSlug?: string
    ): Promise<number[]> {
        const productWhere = {
            categoryId: { in: categoryIds },
            ...(await this.buildProductWhereByFilters(filters, excludeSlug)),
        }

        const productIds = await this.db.product.findMany({
            where: productWhere,
            select: { id: true },
        })

        return productIds.map(p => p.id)
    }

    async buildProductWhereByFilters(
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
}
