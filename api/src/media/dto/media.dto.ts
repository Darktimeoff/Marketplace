import { type MediaDtoInterface, MediaFormatEnum, MediaTypeEnum } from 'contracts'
import { Expose } from 'class-transformer'
import { IsEnum, IsNotEmpty, IsString } from 'class-validator'
import { BaseDto } from '@/generic/dto/base.dto'

export class MediaDto extends BaseDto implements MediaDtoInterface {
    @Expose()
    @IsString()
    @IsNotEmpty()
    url!: string

    @Expose()
    @IsEnum(MediaFormatEnum)
    format!: MediaFormatEnum

    @Expose()
    @IsEnum(MediaTypeEnum)
    type!: MediaTypeEnum
}
