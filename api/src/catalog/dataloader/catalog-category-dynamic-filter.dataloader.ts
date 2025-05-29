import { DBService } from '@/generic/db/db.service'
import { Prisma } from '@/generic/db/generated'
import { Injectable } from '@nestjs/common'
import { AttributeAssociationEnum, CatalogFilterValuesSelectType } from 'contracts'
import { DynamicFilterModelInterface } from '@/catalog/interface/dynamic-filter-model.interface'

@Injectable()
export class CatalogCategoryDynamicFilterDataloader {
    constructor(private readonly db: DBService) {}

    async getFiltersByCategoryId(categoryId: number): Promise<DynamicFilterModelInterface[]> {
        const categoryAttributes = await this.db.categoryAttributeFilter.findMany({
            where: { categoryId },
            orderBy: { order: 'asc' },
            select: {
                attribute: {
                    select: {
                        id: true,
                        [AttributeAssociationEnum.NAME]: {
                            omit: {
                                ...this.db.getDefaultOmit(),
                            },
                        },
                        slug: true,
                        [AttributeAssociationEnum.UNIT]: {
                            omit: {
                                ...this.db.getDefaultOmit(),
                            },
                        },
                    },
                },
            },
        })

        return categoryAttributes.map(categoryAttribute => categoryAttribute.attribute)
    }

    async getFilterValues(
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
