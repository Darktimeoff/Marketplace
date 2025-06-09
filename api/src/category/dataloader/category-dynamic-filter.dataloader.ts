import { DBService } from '@/generic/db/db.service'
import { Injectable } from '@nestjs/common'
import { AttributeAssociationEnum, CategoryDynamicFilterModelInterface } from 'contracts'

@Injectable()
export class CategoryDynamicFilterDataloader {
    constructor(private readonly db: DBService) {}

    async getByCategoryId(categoryId: number): Promise<CategoryDynamicFilterModelInterface[]> {
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
}
