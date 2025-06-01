import { Module } from '@nestjs/common'
import { SellerDataloader } from './dataloader/seller.dataloader'
import { SellerDataloaderService } from './service/seller-dataloader.service'
import { SellerFacade } from './facade/seller.facade'

@Module({
    providers: [SellerDataloader, SellerDataloaderService, SellerFacade],
    exports: [SellerFacade],
})
export class SellerModule {}
