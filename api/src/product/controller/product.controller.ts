import { ProductService } from '@/product/service/product.service'
import { Controller, Get, Param } from '@nestjs/common'
import { ProductInterface } from 'contracts'
import { ProductDto } from '@/product/dto/product.dto'
import { UseSerializeValidator } from '@/generic/decorator/use-transform-validator.decorator'
@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get(':slug')
    @UseSerializeValidator(ProductDto)
    async findBySlug(@Param('slug') slug: string): Promise<ProductInterface> {
        return await this.productService.findBySlug(slug)
    }
}
