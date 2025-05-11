import { IsPositive } from 'class-validator'
import { Expose } from 'class-transformer'
import { IsNumber } from 'class-validator'
import type { BaseDtoInterface } from 'contracts'

export class BaseDto implements BaseDtoInterface {
    @Expose()
    @IsNumber()
    @IsPositive()
    id!: number
}
