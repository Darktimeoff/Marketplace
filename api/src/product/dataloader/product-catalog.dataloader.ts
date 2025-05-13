import { Injectable } from '@nestjs/common'
import { DBService } from '@/generic/db/db.service'
import { ProductAssociationEnum } from 'contracts'

@Injectable()
export class ProductCatalogDataloader {
    constructor(private readonly db: DBService) {}

    async getProductShortInfoByIds(productIds: number[]) {
        return await this.db.product.findMany({
            where: {
                id: { in: productIds },
            },
            select: {
                id: true,
                slug: true,
                oldPrice: true,
                price: true,
                [ProductAssociationEnum.TITLE]: {
                    omit: {
                        ...this.db.getDefaultOmit(),
                    },
                },
                [ProductAssociationEnum.SHORT_DESCRIPTION]: {
                    omit: {
                        ...this.db.getDefaultOmit(),
                    },
                },
                [ProductAssociationEnum.PRODUCT_MEDIA]: {
                    omit: {
                        ...this.db.getDefaultOmit(),
                    },
                    take: 1,
                    orderBy: {
                        order: 'asc',
                    },
                },
                [ProductAssociationEnum.OFFERS]: {
                    select: {
                        isActive: true,
                        quantity: true,
                    },
                    take: 1,
                },
            },
            take: 1,
        })
    }
}
