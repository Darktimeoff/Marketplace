import { Injectable } from '@nestjs/common'
import { DBService } from '@/generic/db/db.service'
import { CatalogFilterInputInterface } from 'contracts'
import { Prisma } from '@/generic/db/generated'
import { CatalogDefaultFilterSlugEnum } from '@/catalog/enum/catalog-default-filter-slug.enum'
import { isEmptyArray, isNotEmptyArray } from '@rnw-community/shared'
import { isDefined } from 'class-validator'

@Injectable()
export class CatalogCategoryFilterDataloader {
    constructor(private readonly db: DBService) {}

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
}
