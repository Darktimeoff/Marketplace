import { Expose } from 'class-transformer'
import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator'
import { type CatalogSortingDtoInterface, CatalogSortingEnum } from 'contracts'

export class CatalogSortingDto implements CatalogSortingDtoInterface {
    @IsEnum(CatalogSortingEnum)
    @Expose()
    id!: CatalogSortingEnum

    @IsBoolean()
    @Expose()
    isDefault!: boolean

    @IsString()
    @IsNotEmpty()
    @Expose()
    name!: string
}
