import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common'
import { ProductAvailabilityDto } from '@/offer/dto/product-availability.dto'
import { UseSerializeValidator } from '@/generic/decorator/use-transform-validator.decorator'
import { ProductAvailabilityService } from '@/offer/service/product-availability.service'
import { ProductAvailabilityInterface } from 'contracts'

@Controller('product/:productId/availability')
export class ProductAvailabilityController {
    constructor(private readonly service: ProductAvailabilityService) {}

    @Get()
    @UseSerializeValidator(ProductAvailabilityDto)
    async getProductAvailability(
        @Param('productId', ParseIntPipe) productId: number
    ): Promise<ProductAvailabilityInterface> {
        return await this.service.findByProductId(productId)
    }
}
