import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common'
import { ProductAttributeService } from '@/product-attributes/service/product-attributes.service'
import { UseSerializeValidator } from '@/generic/decorator/use-transform-validator.decorator'
import { ProductAttributesDto } from '@/product-attributes/dto/product-attributes.dto'
import { ProductAttributesWithoutGroupingInterface } from 'contracts'
import { ProductAttributesGroupedDto } from '@/product-attributes/dto/product-attributes-grouped.dto'

@Controller('product/:productId/characteristics')
export class ProductAttributesController {
    constructor(private readonly services: ProductAttributeService) {}

    @Get('')
    @UseSerializeValidator(ProductAttributesGroupedDto)
    async findByProductIdGrouped(@Param('productId', ParseIntPipe) productId: number) {
        return await this.services.findByProductIdGrouped(productId)
    }

    @Get('short')
    @UseSerializeValidator(ProductAttributesDto)
    async findByProductIdWithoutGrouping(
        @Param('productId', ParseIntPipe) productId: number
    ): Promise<ProductAttributesWithoutGroupingInterface[]> {
        return await this.services.findByProductIdWithoutGrouping(productId)
    }
}
