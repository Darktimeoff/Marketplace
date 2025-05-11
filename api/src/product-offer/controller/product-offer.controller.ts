import { Controller, Get, Param } from '@nestjs/common'
import { ProductOfferService } from '@/product-offer/service/product-offer.service'

@Controller('product/:productId/offer')
export class ProductOfferController {
    constructor(private readonly service: ProductOfferService) {}

    @Get()
    async getProductOffer(@Param('productId') productId: number) {
        return await this.service.findByProductId(productId)
    }
}
