import { BaseEntityInterface } from '@/generic'
import { AttributeAssociationEnum } from '@/attribute/enum/attribute-association.enum'
import { TranslationEntityInterface } from '@/translation'
import { UnitEntityInterface } from '@/unit'
import { ProductAttributeValuesEntityInterface } from '@/product-attributes'

export interface AttributeEntityInterface extends BaseEntityInterface {
    slug: string
    nameId: number
    order: number
    unitId: number | null
    attributeGroupId: number

    [AttributeAssociationEnum.NAME]?: TranslationEntityInterface
    [AttributeAssociationEnum.UNIT]?: UnitEntityInterface | null
    [AttributeAssociationEnum.PRODUCT_ATTRIBUTE_VALUES]?: ProductAttributeValuesEntityInterface[]
}
