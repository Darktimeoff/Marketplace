import { ProductService } from '@/product/service/product.service'
import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common'
import { ProductInterface, ProductShortInfoDtoInterface } from 'contracts'
import { ProductDto } from '@/product/dto/product.dto'
import { UseSerializeValidator } from '@/generic/decorator/use-transform-validator.decorator'
import { ProductCatalogDataloaderService } from '@/product/service/product-catalog-dataloader.service'
import { ParseIdsPipe } from '@/generic/pipe/parse-ids.pipe'
import { ProductShortInfoDto } from '@/product/dto/product-short-info.dto'

@Controller('product')
export class ProductController {
    constructor(
        private readonly productService: ProductService,
        private readonly productsCatalog: ProductCatalogDataloaderService
    ) {}

    @Get('')
    @UseSerializeValidator(ProductShortInfoDto)
    async getProducts(
        @Query('ids', ParseIdsPipe) ids: number[]
    ): Promise<ProductShortInfoDtoInterface[]> {
        return await this.productsCatalog.getProductShortInfoByIds(ids)
    }

    @Get(':id')
    @UseSerializeValidator(ProductDto)
    async findById(@Param('id', ParseIntPipe) id: number): Promise<ProductInterface> {
        return await this.productService.findById(id)
    }
}
