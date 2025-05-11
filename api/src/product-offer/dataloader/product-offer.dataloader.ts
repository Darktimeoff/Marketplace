import { DBService } from '@/generic/db/db.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ProductOfferDataloader {
    constructor(private db: DBService) {}

    async findByProductId(productId: number) {
        return await this.db.product.findUnique({
            where: {
                id: productId,
            },
            select: {
                id: true,
                brand: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                    },
                },
                seller: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                        logo: {
                            omit: {
                                ...this.db.getDefaultOmit(),
                            },
                        },
                    },
                },
                offers: {
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
