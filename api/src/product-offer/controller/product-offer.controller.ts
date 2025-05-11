import { Controller, Get } from '@nestjs/common'

@Controller('product/:slug/offer')
export class ProductOfferController {
    constructor() {}

    @Get()
    async getProductOffer() {
        return
    }
}
