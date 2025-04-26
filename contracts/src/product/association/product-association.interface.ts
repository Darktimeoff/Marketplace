import { CategoryEntityInterface } from '@/category'
import { ProductAssociationEnum } from '@/product/enum/product-association.enum'
import { TranslationEntityInterface } from '@/translation'
import { ProductMediaEntityInterface } from '@/product/product-media'
import { ProductAttributeValueEntityInterface } from '@/product/product-attribute-value'
export interface ProductAssociationInterface {
    [ProductAssociationEnum.TITLE]: TranslationEntityInterface
    [ProductAssociationEnum.DESCRIPTION]: TranslationEntityInterface | null
    [ProductAssociationEnum.CATEGORY]: CategoryEntityInterface
    [ProductAssociationEnum.PRODUCT_MEDIA]: ProductMediaEntityInterface[]
    [ProductAssociationEnum.PRODUCT_ATTRIBUTE_VALUES]: ProductAttributeValueEntityInterface[]
}
