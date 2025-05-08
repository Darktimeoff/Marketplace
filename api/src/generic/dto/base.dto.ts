import { IsPositive } from 'class-validator'
import { Expose } from 'class-transformer'
import { IsNumber } from 'class-validator'
import { BaseEntityInterface } from 'contracts'

export class BaseDto implements Pick<BaseEntityInterface, 'id'> {
    @Expose()
    @IsNumber()
    @IsPositive()
    id!: number
}
