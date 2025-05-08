import { ProductAssociationEnum } from '@/product/enum/product-association.enum'
import { TranslationInterface } from '@/translation'
import { ProductEntityInterface } from '@/product/entity/product-entity.interface'
import { ProductMediaModelInterface } from '@/product/product-media/interface/product-media-model.interface'

type ProductModelFields = 'id' | 'oldPrice' | 'price' | 'slug'

export interface ProductModelInterface extends Pick<ProductEntityInterface, ProductModelFields> {
    [ProductAssociationEnum.TITLE]: TranslationInterface
    [ProductAssociationEnum.PRODUCT_MEDIA]: ProductMediaModelInterface[]
}
