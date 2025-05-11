import { Injectable } from '@nestjs/common'
import { ProductOfferDataloader } from '@/product-offer/dataloader/product-offer.dataloader'

@Injectable()
export class ProductOfferService {
    constructor(private readonly dataloader: ProductOfferDataloader) {}

    async findByProductId(productId: number) {
        return await this.dataloader.findByProductId(productId)
    }
}
