import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator'
import type { CategoryDtoInterface } from 'contracts'
import { Exclude, Expose, Type } from 'class-transformer'

export class CategoryDto implements CategoryDtoInterface {
    @Expose()
    @IsNumber()
    id!: number

    @Expose()
    @IsString()
    slug!: string

    @Exclude()
    path!: string

    @Expose()
    @IsString()
    name!: string

    @Expose()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CategoryDto)
    childrens!: CategoryDtoInterface[]
}
