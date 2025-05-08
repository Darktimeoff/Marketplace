import { ProductAssociationEnum } from '@/product/enum/product-association.enum'
import { TranslationInterface } from '@/translation'
import { ProductEntityInterface } from '@/product/entity/product-entity.interface'
import { ProductMediaInterface } from '@/product/product-media/interface/product-media.interface'

type ProductModelFields = 'id' | 'oldPrice' | 'price' | 'slug'

export interface ProductModelInterface extends Pick<ProductEntityInterface, ProductModelFields> {
    [ProductAssociationEnum.TITLE]: TranslationInterface
    [ProductAssociationEnum.PRODUCT_MEDIA]: ProductMediaInterface[]
}
