import { Type } from 'class-transformer'
import { IsEnum, IsInt, IsNumber, IsPositive, Max, Min } from 'class-validator'
import { CatalogPaginationInputInterface, CatalogSortingEnum } from 'contracts'

export class CatalogPaginationInput implements CatalogPaginationInputInterface {
    @IsNumber()
    @Min(0)
    @IsInt()
    @Type(() => Number)
    offset: number = 0

    @IsNumber()
    @IsPositive()
    @IsInt()
    @Max(100)
    @Type(() => Number)
    limit: number = 20

    @IsEnum(CatalogSortingEnum)
    sorting: CatalogSortingEnum = CatalogSortingEnum.NEWEST
}
