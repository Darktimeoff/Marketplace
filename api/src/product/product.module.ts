import { Module } from '@nestjs/common'
import { ProductController } from './controller/product.controller'
import { ProductDataloader } from './dataloader/product.dataloader'
import { ProductService } from './service/product.service'
import { ProductFacade } from './facade/product-filter.facade'
import { ProductFilterService } from './service/product-filter.service'
import { ProductFilterBaseDataloader } from './dataloader/product-filter-base.dataloader'
import { ProductFilterDataloader } from './dataloader/product-filter.dataloader'
import { ProductCatalogDataloaderService } from './service/product-catalog-dataloader.service'
import { ProductCatalogDataloader } from './dataloader/product-catalog.dataloader'
import { OfferModule } from '@/offer/offer.module'

@Module({
    imports: [OfferModule],
    controllers: [ProductController],
    providers: [
        ProductDataloader,
        ProductService,
        ProductFacade,
        ProductFilterService,
        ProductCatalogDataloader,
        ProductCatalogDataloaderService,
        ProductFilterBaseDataloader,
        ProductFilterDataloader,
    ],
    exports: [ProductFacade],
})
export class ProductModule {}
