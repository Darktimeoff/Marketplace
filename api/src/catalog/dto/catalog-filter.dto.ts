import { BaseDto } from '@/generic/dto/base.dto'
import { IsNotEmpty, IsString } from 'class-validator'
import type {
    CatalogFilterDtoInterface,
    CatalogFilterValuesRangeDtoInterface,
    CatalogFilterValuesSelectDtoInterface,
} from 'contracts'
import { IsCatalogFilterValues } from '@/catalog/validator/is-catalog-filter-values.validator'
import { Expose } from 'class-transformer'

export class CatalogFilterDto extends BaseDto implements CatalogFilterDtoInterface {
    @IsString()
    @IsNotEmpty()
    @Expose()
    slug!: string

    @IsString()
    @IsNotEmpty()
    @Expose()
    name!: string

    @Expose()
    @IsCatalogFilterValues()
    values!: CatalogFilterValuesSelectDtoInterface[] | CatalogFilterValuesRangeDtoInterface
}
