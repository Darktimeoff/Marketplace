import { Injectable } from '@nestjs/common'
import { DBService } from '@/generic/db/db.service'
import { ProductAssociationEnum, ProductShortInfoModelInterface } from 'contracts'

@Injectable()
export class ProductCatalogDataloader {
    constructor(private readonly db: DBService) {}

    async getProductShortInfoByIds(
        productIds: number[]
    ): Promise<ProductShortInfoModelInterface[]> {
        const products = await this.db.product.findMany({
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
                    select: {
                        media: {
                            omit: {
                                ...this.db.getDefaultOmit(),
                            },
                        },
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
            take: productIds.length,
        })

        return products.map(product => ({
            ...product,
            price: Number(product.price),
            oldPrice: product.oldPrice ? Number(product.oldPrice) : null,
        }))
    }
}
