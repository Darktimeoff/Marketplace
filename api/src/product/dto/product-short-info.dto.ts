import { BaseDto } from '@/generic/dto/base.dto'
import { MediaDto } from '@/media/dto/media.dto'
import { Expose, Type } from 'class-transformer'
import {
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
    ValidateNested,
} from 'class-validator'
import {
    type MediaDtoInterface,
    ProductAvailabilityStatusEnum,
    type ProductShortInfoDtoInterface,
} from 'contracts'

export class ProductShortInfoDto extends BaseDto implements ProductShortInfoDtoInterface {
    @Expose()
    @IsNumber()
    @IsOptional()
    @IsPositive()
    oldPrice!: number | null

    @Expose()
    @IsNumber()
    @IsPositive()
    price!: number

    @Expose()
    @IsString()
    @IsNotEmpty()
    slug!: string

    @Expose()
    @IsString()
    @IsNotEmpty()
    title!: string

    @Expose()
    @IsString()
    @IsOptional()
    shortDescription!: string | null

    @Expose({})
    @ValidateNested()
    @Type(() => MediaDto)
    image!: MediaDtoInterface

    @Expose()
    @IsEnum(ProductAvailabilityStatusEnum)
    status!: ProductAvailabilityStatusEnum
}
