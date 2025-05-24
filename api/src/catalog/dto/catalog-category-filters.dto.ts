import { Expose, Type } from 'class-transformer'
import { IsArray, IsNumber, Min, ValidateNested } from 'class-validator'
import type {
    CatalogCategoryFiltersDtoInterface,
    CatalogFilterDtoInterface,
    CatalogSortingDtoInterface,
} from 'contracts'
import { CatalogFilterDto } from './catalog-filter.dto'
import { CatalogSortingDto } from './catalog-sorting.dto'

export class CatalogCategoryFiltersDto implements CatalogCategoryFiltersDtoInterface {
    @IsNumber()
    @Min(0)
    @Expose()
    total!: number

    @IsArray()
    @Expose()
    @ValidateNested({ each: true })
    @Type(() => CatalogFilterDto)
    filters!: CatalogFilterDtoInterface[]

    @IsArray()
    @Expose()
    @ValidateNested({ each: true })
    @Type(() => CatalogSortingDto)
    sorting!: CatalogSortingDtoInterface[]
}
