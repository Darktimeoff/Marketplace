import { Injectable } from '@nestjs/common'

import { SellerService } from '@/product-offer/service/seller.service'
import { SellerNameInterface } from 'contracts'

@Injectable()
export class OfferFacade {
    constructor(private readonly seller: SellerService) {}

    async getSellerNameByIds(ids: number[]): Promise<SellerNameInterface[]> {
        return await this.seller.findNameByIds(ids)
    }
}
