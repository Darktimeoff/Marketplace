import { Injectable } from '@nestjs/common'
import { ProductOfferModelInterface } from 'contracts'
import { ProductAvailabilityService } from '@/offer/service/product-availability.service'

@Injectable()
export class OfferFacade {
    constructor(private readonly productAvailabilities: ProductAvailabilityService) {}

    getAvailableStatusByOffer(offer: ProductOfferModelInterface) {
        return this.productAvailabilities.getAvailableStatysByOffer(offer)
    }
}
