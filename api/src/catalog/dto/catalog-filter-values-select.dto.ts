import { BaseDto } from '@/generic/dto/base.dto'
import { Expose } from 'class-transformer'
import { IsNumber, IsOptional, IsString, Min } from 'class-validator'
import type { CatalogFilterValuesSelectDtoInterface } from 'contracts'

export class CatalogFilterValuesSelectDto
    extends BaseDto
    implements CatalogFilterValuesSelectDtoInterface
{
    @IsString()
    @Expose()
    @IsOptional()
    name!: string | null

    @IsNumber()
    @Min(0)
    @Expose()
    count!: number
}
