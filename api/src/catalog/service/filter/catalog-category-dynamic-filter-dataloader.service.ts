import { Injectable } from '@nestjs/common'
import { DBService } from '@/generic/db/db.service'
import { CatalogCategoryFilterDataloader } from '@/catalog/dataloader/catalog-category-filter.dataloader'
import { getErrorMessage, isEmptyArray } from '@rnw-community/shared'
import type {
    CatalogFilterInputInterface,
    CatalogFilterInteface,
    CatalogFilterValuesSelectType,
} from 'contracts'
import { Prisma } from '@/generic/db/generated'
import { CatalogCategoryFilterServiceInterface } from '@/catalog/interface/catalog-category-filter-service.interface'
import { Log } from '@rnw-community/nestjs-enterprise'

@Injectable()
export class CatalogCategoryDynamicFilterDataloaderService
    implements CatalogCategoryFilterServiceInterface
{
    constructor(
        private readonly db: DBService,
        private readonly filterDataloader: CatalogCategoryFilterDataloader
    ) {}

    @Log(
        (categoryId, filters) =>
            `Get dynamic filters by category id "${categoryId}", filters "${JSON.stringify(filters)}"`,
        (result, categoryId, filters) =>
            `Got ${result.length} dynamic filters by category id "${categoryId}", filters "${JSON.stringify(filters)}"`,
        (error, categoryId, filters) =>
            `Error getting dynamic filters by category id "${categoryId}", filters "${JSON.stringify(filters)}": ${getErrorMessage(error)}`
    )
    async getFilters(
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
            ...(await this.filterDataloader.buildProductWhereByFilters(filters, attributeSlug)),
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
}
