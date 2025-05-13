import { Module } from '@nestjs/common'
import { ProductController } from './controller/product.controller'
import { ProductService } from './service/product.service'
import { ProductDataloader } from './dataloader/product.dataloader'
import { ProductCatalogDataloaderService } from './service/product-catalog-dataloader.service'
import { ProductCatalogDataloader } from './dataloader/product-catalog.dataloader'
@Module({
    imports: [],
    controllers: [ProductController],
    providers: [
        ProductService,
        ProductDataloader,
        ProductCatalogDataloaderService,
        ProductCatalogDataloader,
    ],
    exports: [ProductService, ProductCatalogDataloaderService],
})
export class ProductModule {}
