import { CategoryAttributeAssociationEnum } from '@/category/category-attribute/enum/category-attribute-association.enum'
import { CategoryEntityInterface } from '@/category/entity/category-entity.interface'
import { AttributeEntityInterface } from '@/attribute/entity/attribute-entity.interface'

export interface CategoryAttributeAssociationInterface {
    [CategoryAttributeAssociationEnum.CATEGORY]: CategoryEntityInterface
    [CategoryAttributeAssociationEnum.ATTRIBUTE]: AttributeEntityInterface
}
