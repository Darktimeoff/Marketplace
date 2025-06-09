import { Module } from '@nestjs/common'
import { ProductAttributesController } from './сontroller/product-attributes.controller'
import { ProductAttributeDataloader } from './dataloader/product-attribute.dataloader'
import { ProductAttributeService } from './service/product-attributes.service'

@Module({
    imports: [],
    controllers: [ProductAttributesController],
    providers: [ProductAttributeDataloader, ProductAttributeService],
    exports: [ProductAttributeService],
})
export class AttributeModule {}
