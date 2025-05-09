import { DBService } from '@/generic/db/db.service'
import { Injectable } from '@nestjs/common'
import {
    ProductAssociationEnum,
    ProductMediaAssociationEnum,
    ProductModelInterface,
} from 'contracts'

@Injectable()
export class ProductDataloader {
    constructor(private readonly db: DBService) {}

    async findBySlug(slug: string): Promise<ProductModelInterface> {
        const product = await this.db.product.findUniqueOrThrow({
            where: {
                slug,
            },
            include: {
                [ProductAssociationEnum.TITLE]: {
                    omit: this.db.getDefaultOmit(),
                },
                [ProductAssociationEnum.PRODUCT_MEDIA]: {
                    include: {
                        [ProductMediaAssociationEnum.MEDIA]: {
                            omit: this.db.getDefaultOmit(),
                        },
                    },
                    orderBy: {
                        order: 'asc',
                    },
                    omit: {
                        mediaId: true,
                        productId: true,
                        order: true,
                        ...this.db.getDefaultOmit(),
                    },
                },
            },
            omit: {
                ...this.db.getDefaultOmit(),
                titleId: true,
                descriptionId: true,
                categoryId: true,
            },
        })

        return {
            ...product,
            oldPrice: product.oldPrice ? Number(product.oldPrice) : null,
            price: Number(product.price),
        }
    }

    async getProductIdBySlug(slug: string): Promise<number> {
        const product = await this.db.product.findUniqueOrThrow({
            where: {
                slug,
            },
            select: {
                id: true,
            },
        })

        return product.id
    }
}
