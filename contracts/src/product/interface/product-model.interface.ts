import { ProductAssociationEnum } from '@/product/enum/product-association.enum'
import { TranslationModelInterface } from '@/translation'
import { ProductEntityInterface } from '@/product/entity/product-entity.interface'
import { ProductMediaModelInterface } from '@/product/product-media/interface/product-media-model.interface'
import { BaseModelInterface } from '@/generic'
import { BrandModelInterface } from '@/brand'

type ProductModelFields = 'oldPrice' | 'price' | 'slug'

export interface ProductModelInterface
    extends BaseModelInterface,
        Pick<ProductEntityInterface, ProductModelFields> {
    [ProductAssociationEnum.BRAND]: BrandModelInterface | null
    [ProductAssociationEnum.TITLE]: TranslationModelInterface
    [ProductAssociationEnum.PRODUCT_MEDIA]: ProductMediaModelInterface[]
}
