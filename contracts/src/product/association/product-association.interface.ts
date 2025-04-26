import { CategoryEntityInterface } from '@/category'
import { ProductAssociationEnum } from '@/product/enum/product-association.enum'
import { TranslationEntityInterface } from '@/translation'

export interface ProductAssociationInterface {
    [ProductAssociationEnum.TITLE]: TranslationEntityInterface
    [ProductAssociationEnum.DESCRIPTION]: TranslationEntityInterface | null
    [ProductAssociationEnum.CATEGORY]: CategoryEntityInterface
}
