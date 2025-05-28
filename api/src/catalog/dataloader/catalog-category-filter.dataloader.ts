import { Injectable } from '@nestjs/common'
import { DBService } from '@/generic/db/db.service'
import { CatalogAttributeValueModelInterface } from '@/catalog/interface/catalog-attributes-values-model.interface'

@Injectable()
export class CatalogCategoryFilterDataloader {
    constructor(private readonly db: DBService) {}

    async getAttributeValuesByAttributeIds(
        attributeIds: number[]
    ): Promise<CatalogAttributeValueModelInterface[]> {
        const attributesValues = await this.db.productAttributeValue.findMany({
            where: {
                id: { in: attributeIds },
            },
            select: {
                attribute: { select: { slug: true } },
                numberValue: true,
                textValue: {
                    omit: this.db.getDefaultOmit(),
                },
            },
        })

        return attributesValues.map(attributeValue => {
            return {
                ...attributeValue,
                numberValue: attributeValue.numberValue?.toNumber() ?? null,
            }
        })
    }
}
