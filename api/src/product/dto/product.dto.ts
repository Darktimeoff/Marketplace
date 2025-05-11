import { BaseDto } from '@/generic/dto/base.dto'
import { MediaDto } from '@/media/dto/media.dto'
import { Expose, Type } from 'class-transformer'
import {
    IsArray,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
    ValidateNested,
} from 'class-validator'
import type { MediaDtoInterface, ProductDtoInterface } from 'contracts'

export class ProductDto extends BaseDto implements ProductDtoInterface {
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
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    id!: number

    @Expose()
    @IsString()
    @IsOptional()
    slug?: string

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
