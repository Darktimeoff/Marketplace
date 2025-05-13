import { BaseModelInterface } from '@/generic'
import {
    ProductAssociationEnum,
    ProductEntityInterface,
    ProductMediaModelInterface,
} from '@/product'
import { ProductOfferModelInterface } from '@/product-offer'
import { TranslationModelInterface } from '@/translation'

type ProductShortInforModelFields = 'slug' | 'price' | 'oldPrice'

export interface ProductShortInfoModelInterface
    extends BaseModelInterface,
        Pick<ProductEntityInterface, ProductShortInforModelFields> {
    [ProductAssociationEnum.TITLE]: TranslationModelInterface
    [ProductAssociationEnum.SHORT_DESCRIPTION]: TranslationModelInterface | null
    [ProductAssociationEnum.PRODUCT_MEDIA]: ProductMediaModelInterface[]
    [ProductAssociationEnum.OFFERS]: ProductOfferModelInterface[]
}
