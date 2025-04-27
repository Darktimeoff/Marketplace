import { CategoryAssociationEnum } from '@/category/enum/category-association.enum'
import { MediaEntityInterface } from '@/media'
import { TranslationEntityInterface } from '@/translation'
import { CategoryEntityInterface } from '@/category/entity/category-entity.interface'
import { CategoryAttributeEntityInterface } from '@/category/category-attribute'

export interface CategoryAssociationInterface {
    [CategoryAssociationEnum.NAME]?: TranslationEntityInterface
    [CategoryAssociationEnum.IMAGE]?: MediaEntityInterface | null
    [CategoryAssociationEnum.PARENT_CATEGORY]?: CategoryEntityInterface | null
    [CategoryAssociationEnum.CHILDRENS]?: CategoryEntityInterface[]
    [CategoryAssociationEnum.CATEGORY_ATTRIBUTES]?: CategoryAttributeEntityInterface[]
}
