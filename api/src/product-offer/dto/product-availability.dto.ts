import { BaseDto } from '@/generic/dto/base.dto'
import { Expose } from 'class-transformer'
import { IsEnum, IsOptional, ValidateNested } from 'class-validator'
import { type ProductAvailabilityDtoInterface, ProductAvailabilityStatusEnum } from 'contracts'
import { BrandDto } from '@/brand/dto/brand.dto'
import { Type } from 'class-transformer'
import { SellerDto } from '@/product-offer/dto/seller.dto'

export class ProductAvailabilityDto extends BaseDto implements ProductAvailabilityDtoInterface {
    @Expose()
    @IsOptional()
    @ValidateNested()
    @Type(() => BrandDto)
    brand!: ProductAvailabilityDtoInterface['brand']

    @Expose()
    @ValidateNested()
    @Type(() => SellerDto)
    seller!: ProductAvailabilityDtoInterface['seller']

    @Expose()
    @IsEnum(ProductAvailabilityStatusEnum)
    availabilityStatus!: ProductAvailabilityDtoInterface['availabilityStatus']
}
