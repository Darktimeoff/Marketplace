import { DBService } from '@/generic/db/db.service'
import { Injectable } from '@nestjs/common'
import {
    ProductAssociationEnum,
    ProductAvailabilityModelInterface,
    SellerAssociationEnum,
} from 'contracts'

@Injectable()
export class ProductAvailabilityDataloader {
    constructor(private db: DBService) {}

    async findByProductId(productId: number): Promise<ProductAvailabilityModelInterface> {
        return await this.db.product.findUniqueOrThrow({
            where: {
                id: productId,
            },
            select: {
                id: true,
                [ProductAssociationEnum.BRAND]: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                    },
                },
                [ProductAssociationEnum.SELLER]: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                        [SellerAssociationEnum.LOGO]: {
                            omit: {
                                ...this.db.getDefaultOmit(),
                            },
                        },
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
        })
    }
}
