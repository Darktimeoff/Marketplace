import { Module } from '@nestjs/common'
import { ProductOfferController } from './controller/product-offer.controller'
import { ProductOfferService } from './service/product-offer.service'
import { ProductOfferDataloader } from './dataloader/product-offer.dataloader'
@Module({
    imports: [],
    controllers: [ProductOfferController],
    providers: [ProductOfferService, ProductOfferDataloader],
})
export class ProductOfferModule {}
