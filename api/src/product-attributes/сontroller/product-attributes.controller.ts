import { Controller, Get, Param } from '@nestjs/common'
import { ProductAttributeService } from '@/product-attributes/service/product-attributes.service'
import { UseSerializeValidator } from '@/generic/decorator/use-transform-validator.decorator'
import { ProductAttributesDto } from '@/product-attributes/dto/product-attributes.dto'
import { ProductAttributesWithoutGroupingInterface } from 'contracts'
import { ProductAttributesGroupedDto } from '@/product-attributes/dto/product-attributes-grouped.dto'

@Controller('product/:slug/characteristics')
export class ProductAttributesController {
    constructor(private readonly services: ProductAttributeService) {}

    @Get('')
    @UseSerializeValidator(ProductAttributesGroupedDto)
    async findBySlugGrouped(@Param('slug') slug: string) {
        return await this.services.findBySlugGrouped(slug)
    }

    @Get('short')
    @UseSerializeValidator(ProductAttributesDto)
    async findBySlugWithoutGrouping(
        @Param('slug') slug: string
    ): Promise<ProductAttributesWithoutGroupingInterface[]> {
        return await this.services.findBySlugWithoutGrouping(slug)
    }
}
