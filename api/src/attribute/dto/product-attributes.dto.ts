import { BaseDto } from '@/generic/dto/base.dto'
import { Expose, Type } from 'class-transformer'
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator'
import {
    AttributeAssociationEnum,
    type ProductAttributeValuesDtoInterface,
    type ProductAttributesDtoInterface,
} from 'contracts'
import { ProductAttributeValuesDto } from './product-attributes-values.dto'

export class ProductAttributesDto extends BaseDto implements ProductAttributesDtoInterface {
    @Expose()
    @IsString()
    name!: string

    @Expose()
    @IsString()
    @IsOptional()
    unit!: string | null

    @Expose({ name: AttributeAssociationEnum.PRODUCT_ATTRIBUTE_VALUES })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductAttributeValuesDto)
    values!: ProductAttributeValuesDtoInterface[]
}
