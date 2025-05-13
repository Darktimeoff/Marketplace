import { Module } from '@nestjs/common'
import { ProductController } from './controller/product.controller'
import { ProductService } from './service/product.service'
import { ProductDataloader } from './dataloader/product.dataloader'
import { ProductCatalogService } from './service/product-catalaog.service'
import { ProductCatalogDataloader } from './dataloader/product-catalog.dataloader'
@Module({
    imports: [],
    controllers: [ProductController],
    providers: [ProductService, ProductDataloader, ProductCatalogService, ProductCatalogDataloader],
    exports: [ProductService, ProductCatalogService],
})
export class ProductModule {}
