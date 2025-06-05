import { DBService } from '@/generic/db/db.service'
import { Injectable } from '@nestjs/common'
import {
    ProductAvailabilityModelInterface,
    ProductOfferAssociationEnum,
    SellerAssociationEnum,
} from 'contracts'

@Injectable()
export class ProductAvailabilityDataloader {
    constructor(private db: DBService) {}

    async findByProductId(productId: number): Promise<ProductAvailabilityModelInterface> {
        const productOffer = await this.db.productOffer.findUniqueOrThrow({
            where: {
                productId,
            },
            select: {
                isActive: true,
                quantity: true,
                [ProductOfferAssociationEnum.SELLER]: {
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
            },
        })

        return {
            id: productId + productOffer.seller.id,
            ...productOffer,
        }
    }
}
