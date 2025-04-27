import { MediaEntityInterface } from '@/media'
import { ProductMediaAssociationEnum } from '@/product/product-media/enum/product-media-association.enum'
import { ProductEntityInterface } from '@/product'

export interface ProductMediaAssociationInterface {
    [ProductMediaAssociationEnum.PRODUCT]?: ProductEntityInterface
    [ProductMediaAssociationEnum.MEDIA]?: MediaEntityInterface
}
