import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator'
import type { CategoryDtoInterface } from 'contracts'
import { Exclude, Type } from 'class-transformer'

export class CategoryDto implements CategoryDtoInterface {
    @IsNumber()
    id!: number

    @IsString()
    slug!: string

    @Exclude()
    path!: string

    @IsString()
    name!: string

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CategoryDto)
    childrens!: CategoryDtoInterface[]
}
