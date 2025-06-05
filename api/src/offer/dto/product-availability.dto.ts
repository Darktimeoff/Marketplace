import { BaseDto } from '@/generic/dto/base.dto'
import { Expose } from 'class-transformer'
import { IsEnum, ValidateNested } from 'class-validator'
import { type ProductAvailabilityDtoInterface, ProductAvailabilityStatusEnum } from 'contracts'
import { Type } from 'class-transformer'
import { SellerDto } from '@/seller/dto/seller.dto'

export class ProductAvailabilityDto extends BaseDto implements ProductAvailabilityDtoInterface {
    @Expose()
    @ValidateNested()
    @Type(() => SellerDto)
    seller!: ProductAvailabilityDtoInterface['seller']

    @Expose()
    @IsEnum(ProductAvailabilityStatusEnum)
    availabilityStatus!: ProductAvailabilityDtoInterface['availabilityStatus']
}
