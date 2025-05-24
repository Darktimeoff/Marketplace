import { Expose } from 'class-transformer'
import { IsNumber, Min } from 'class-validator'
import type { CatalogFilterValuesRangeDtoInterface } from 'contracts'

export class CatalogFilterValuesRangeDto implements CatalogFilterValuesRangeDtoInterface {
    @IsNumber()
    @Min(0)
    @Expose()
    min!: number

    @IsNumber()
    @Min(0)
    @Expose()
    max!: number
}
