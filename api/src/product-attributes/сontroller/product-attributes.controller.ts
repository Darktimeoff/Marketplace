import { Controller, Get, Param } from '@nestjs/common'
import { ProductAttributeService } from '@/product-attributes/service/product-attributes.service'

@Controller('product/:slug/characteristics')
export class ProductAttributesController {
    constructor(private readonly services: ProductAttributeService) {}

    @Get()
    async findBySlugWithoutGrouping(@Param('slug') slug: string) {
        return await this.services.findBySlugWithoutGrouping(slug)
    }
}
