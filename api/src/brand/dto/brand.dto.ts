import { BrandDtoInterface } from 'contracts'
import { BaseDto } from '@/generic/dto/base.dto'
import { Expose } from 'class-transformer'
import { IsNotEmpty, IsString } from 'class-validator'

export class BrandDto extends BaseDto implements BrandDtoInterface {
    @Expose()
    @IsString()
    @IsNotEmpty()
    name!: string

    @Expose()
    @IsString()
    @IsNotEmpty()
    slug!: string
}
