import { Injectable } from '@nestjs/common'
import { ProductAvailabilityDataloader } from '@/product-offer/dataloader/product-availability.dataloader'

@Injectable()
export class ProductAvailabilityService {
    constructor(private readonly dataloader: ProductAvailabilityDataloader) {}

    async findByProductId(productId: number) {
        return await this.dataloader.findByProductId(productId)
    }
}
