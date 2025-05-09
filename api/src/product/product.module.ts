import { Module } from '@nestjs/common'
import { ProductController } from './controller/product.controller'
import { ProductService } from './service/product.service'
import { ProductDataloader } from './dataloader/product.dataloader'

@Module({
    imports: [],
    controllers: [ProductController],
    providers: [ProductService, ProductDataloader],
    exports: [ProductService],
})
export class ProductModule {}
