import { DBService } from '@/generic/db/db.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ProductOfferDataloader {
    constructor(private db: DBService) {}

    async findProduct() {
        return await this.db.product.findMany()
    }
}
