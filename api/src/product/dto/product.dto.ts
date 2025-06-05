import { BrandDto } from '@/brand/dto/brand.dto'
import { BaseDto } from '@/generic/dto/base.dto'
import { MediaDto } from '@/media/dto/media.dto'
import { Expose, Type } from 'class-transformer'
import {
    IsArray,
    IsNotEmpty,
    IsNumber,
    IsObject,
    IsOptional,
    IsPositive,
    IsString,
    ValidateNested,
} from 'class-validator'
import type { BrandDtoInterface, MediaDtoInterface, ProductDtoInterface } from 'contracts'

export class ProductDto extends BaseDto implements ProductDtoInterface {
    @Expose()
    @IsObject()
    @ValidateNested()
    @Type(() => BrandDto)
    brand!: BrandDtoInterface | null

    @Expose()
    @IsNumber()
    @IsOptional()
    @IsPositive()
    oldPrice!: number | null

    @Expose()
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    price!: number

    @Expose()
    @IsString()
    @IsOptional()
    slug!: string

    @Expose()
    @IsString()
    @IsNotEmpty()
    title!: string

    @Expose({})
    @IsArray()
    @Type(() => MediaDto)
    @ValidateNested({ each: true })
    media!: MediaDtoInterface[]
}
