import { AttributeEntityInterface } from '@/attribute'
import { BaseEntityInterface } from '@/generic'
import { ProductAttributeValuesAssociationEnum } from '@/product-attributes/enum/product-attribute-values-association.enum'
import { ProductEntityInterface } from '@/product/entity/product-entity.interface'
import { TranslationEntityInterface } from '@/translation'

export interface ProductAttributeValuesEntityInterface extends BaseEntityInterface {
    attributeId: number
    productId: number
    order: number
    textValueId: number | null
    numberValue: number | null

    [ProductAttributeValuesAssociationEnum.ATTRIBUTE]?: AttributeEntityInterface
    [ProductAttributeValuesAssociationEnum.TEXT_VALUE]?: TranslationEntityInterface | null
    [ProductAttributeValuesAssociationEnum.PRODUCT]?: ProductEntityInterface
}
