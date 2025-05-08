import { MediaInterface } from '@/media'
import { ProductMediaAssociationEnum } from '@/product/product-media/enum/product-media-association.enum'

export interface ProductMediaInterface {
    [ProductMediaAssociationEnum.MEDIA]: MediaInterface
}
