import { BaseEntityInterface } from '@/generic'
import { TranslationEntityInterface } from '@/translation'
import { CategoryAssociationEnum } from '@/category/enum/category-association.enum'

export interface CategoryEntityInterface extends BaseEntityInterface {
    nameId: number
    slug: string
    parentCategoryId: number | null
    imageId: number | null
    path: string
    [CategoryAssociationEnum.NAME]?: TranslationEntityInterface
    [CategoryAssociationEnum.PARENT_CATEGORY]?: CategoryEntityInterface | null
    [CategoryAssociationEnum.CHILDRENS]?: CategoryEntityInterface[]
}
