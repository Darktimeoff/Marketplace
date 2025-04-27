import { ProductEntityInterface } from '@/product'
import { ProductAttributeValueEnum } from '@/product/product-attribute-value/enum/product-attribute-value-association.enum'
import { AttributeEntityInterface } from '@/attribute'
import { TranslationEntityInterface } from '@/translation'

export interface ProductAttributeValueAssociationInterface {
    [ProductAttributeValueEnum.PRODUCT]?: ProductEntityInterface
    [ProductAttributeValueEnum.ATTRIBUTE]?: AttributeEntityInterface
    [ProductAttributeValueEnum.TEXT_VALUE]?: TranslationEntityInterface
}
