import { Controller, Get, Param } from '@nestjs/common'
import { ProductAttributeService } from '@/product-attributes/service/product-attributes.service'
import { UseSerializeValidator } from '@/generic/decorator/use-transform-validator.decorator'
import { ProductAttributesDto } from '@/product-attributes/dto/product-attributes.dto'
import { ProductAttributesWithoutGroupingInterface } from 'contracts'

@Controller('product/:slug/characteristics')
export class ProductAttributesController {
    constructor(private readonly services: ProductAttributeService) {}

    @Get()
    @UseSerializeValidator(ProductAttributesDto)
    async findBySlugWithoutGrouping(
        @Param('slug') slug: string
    ): Promise<ProductAttributesWithoutGroupingInterface[]> {
        return await this.services.findBySlugWithoutGrouping(slug)
    }
}
