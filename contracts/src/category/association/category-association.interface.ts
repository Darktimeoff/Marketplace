import { CategoryAssociationEnum } from '@/category/enum/category-association.enum'
import { MediaEntityInterface } from '@/media'
import { TranslationEntityInterface } from '@/translation'
import { CategoryEntityInterface } from '@/category/entity/category-entity.interface'

export interface CategoryAssociationInterface {
    [CategoryAssociationEnum.NAME]: TranslationEntityInterface
    [CategoryAssociationEnum.IMAGE]: MediaEntityInterface | null
    [CategoryAssociationEnum.PARENT_CATEGORY]: CategoryEntityInterface | null
    [CategoryAssociationEnum.CHILDRENS]: CategoryEntityInterface[]
}
