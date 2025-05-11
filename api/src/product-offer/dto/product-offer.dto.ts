import { BaseDto } from '@/generic/dto/base.dto'
import { Expose } from 'class-transformer'
import { IsBoolean, IsNumber, IsPositive } from 'class-validator'
import { ProductOfferDtoInterface } from 'contracts'

export class ProductOfferDto extends BaseDto implements ProductOfferDtoInterface {
    @Expose()
    @IsBoolean()
    isActive!: ProductOfferDtoInterface['isActive']

    @Expose()
    @IsNumber()
    @IsPositive()
    quantity!: ProductOfferDtoInterface['quantity']
}
