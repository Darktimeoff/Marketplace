import { Module } from '@nestjs/common'
import { ProductAvailabilityController } from './controller/product-availability.controller'
import { ProductAvailabilityService } from './service/product-availability.service'
import { ProductAvailabilityDataloader } from './dataloader/product-availability.dataloader'
import { OfferFacade } from './facade/offer.facade'

@Module({
    imports: [],
    controllers: [ProductAvailabilityController],
    providers: [ProductAvailabilityService, ProductAvailabilityDataloader, OfferFacade],
    exports: [OfferFacade],
})
export class OfferModule {}
