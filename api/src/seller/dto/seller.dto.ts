import { SellerDtoInterface } from 'contracts'
import { BaseDto } from '@/generic/dto/base.dto'
import { Expose } from 'class-transformer'
import { IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator'
import { MediaDto } from '@/media/dto/media.dto'
import { Type } from 'class-transformer'

export class SellerDto extends BaseDto implements SellerDtoInterface {
    @Expose()
    @IsString()
    @IsNotEmpty()
    name!: SellerDtoInterface['name']

    @Expose()
    @IsString()
    @IsNotEmpty()
    slug!: SellerDtoInterface['slug']

    @Expose()
    @IsOptional()
    @ValidateNested()
    @Type(() => MediaDto)
    logo!: SellerDtoInterface['logo']
}
