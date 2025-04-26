import { CategoryEntityInterface } from '@/category'
import { ProductAssociationEnum } from '@/product/enum/product-association.enum'
import { TranslationEntityInterface } from '@/translation'
import { ProductMediaEntityInterface } from '@/product/product-media'
export interface ProductAssociationInterface {
    [ProductAssociationEnum.TITLE]: TranslationEntityInterface
    [ProductAssociationEnum.DESCRIPTION]: TranslationEntityInterface | null
    [ProductAssociationEnum.CATEGORY]: CategoryEntityInterface
    [ProductAssociationEnum.PRODUCT_MEDIA]: ProductMediaEntityInterface[]
}
