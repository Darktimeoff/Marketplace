import { TranslationEntityInterface } from '@/translation'
import { AttributeAssociationEnum } from '@/attribute/enum/attribute-association.enum'
import { AttributeGroupEntityInterface } from '@/attribute/attribute-group'
import { CategoryAttributeEntityInterface } from '@/category/category-attribute'
export interface AttributeAssociationInterface {
    [AttributeAssociationEnum.NAME]?: TranslationEntityInterface
    [AttributeAssociationEnum.UNIT]?: TranslationEntityInterface | null
    [AttributeAssociationEnum.ATTRIBUTE_GROUP]?: AttributeGroupEntityInterface | null
    [AttributeAssociationEnum.CATEGORY_ATTRIBUTES]?: CategoryAttributeEntityInterface[]
}
