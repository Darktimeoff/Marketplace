import { IsOptional, IsString } from 'class-validator'
import { Expose } from 'class-transformer'
import { IsNumber } from 'class-validator'
import type { ProductAttributeValuesDtoInterface } from 'contracts'

export class ProductAttributeValuesDto implements ProductAttributeValuesDtoInterface {
    @Expose()
    @IsString()
    @IsOptional()
    textValue!: string | null

    @Expose()
    @IsNumber()
    @IsOptional()
    numberValue!: number | null
}
