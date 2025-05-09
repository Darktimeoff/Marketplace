import { DBService } from '@/generic/db/db.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ProductAttributeDataloader {
    constructor(private readonly db: DBService) {}

    findByProductIdWithoutGroupingAndTake(productId: number, take: number = 5) {
        return this.db.attribute.findMany({
            where: {
                productAttributeValues: {
                    some: {
                        productId,
                    },
                },
            },
            select: {
                id: true,
                name: {
                    omit: this.db.getDefaultOmit(),
                },
                unit: {
                    omit: this.db.getDefaultOmit(),
                },
                productAttributeValues: {
                    where: {
                        productId,
                    },
                    orderBy: {
                        order: 'asc',
                    },
                    select: {
                        numberValue: true,
                        textValue: {
                            omit: this.db.getDefaultOmit(),
                        },
                    },
                },
            },
            orderBy: {
                order: 'asc',
            },
            take,
        })
    }
}
