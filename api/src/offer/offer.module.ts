import { Module } from '@nestjs/common'
import { ProductAvailabilityController } from './controller/product-availability.controller'
import { ProductAvailabilityService } from './service/product-availability.service'
import { ProductAvailabilityDataloader } from './dataloader/product-availability.dataloader'

@Module({
    imports: [],
    controllers: [ProductAvailabilityController],
    providers: [ProductAvailabilityService, ProductAvailabilityDataloader],
})
export class OfferModule {}
