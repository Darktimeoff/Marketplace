import { BaseDto } from '@/generic/dto/base.dto'
import { Expose, Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'
import { IsArray } from 'class-validator'
import { IsOptional } from 'class-validator'
import { IsString } from 'class-validator'
import type { ProductAttributesGroupedDtoInterface } from 'contracts'
import { ProductAttributesDto } from './product-attributes.dto'

export class ProductAttributesGroupedDto
    extends BaseDto
    implements ProductAttributesGroupedDtoInterface
{
    @Expose()
    @IsString()
    @IsOptional()
    name!: ProductAttributesGroupedDtoInterface['name']

    @Expose()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductAttributesDto)
    attributes!: ProductAttributesGroupedDtoInterface['attributes']
}
