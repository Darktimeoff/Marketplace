import { ProductService } from '@/product/service/product.service'
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common'
import { ProductInterface } from 'contracts'
import { ProductDto } from '@/product/dto/product.dto'
import { UseSerializeValidator } from '@/generic/decorator/use-transform-validator.decorator'
@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get(':id')
    @UseSerializeValidator(ProductDto)
    async findById(@Param('id', ParseIntPipe) id: number): Promise<ProductInterface> {
        return await this.productService.findById(id)
    }
}
