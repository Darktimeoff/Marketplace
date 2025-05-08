import { MediaModelInterface } from '@/media'
import { ProductMediaAssociationEnum } from '@/product/product-media/enum/product-media-association.enum'

export interface ProductMediaModelInterface {
    [ProductMediaAssociationEnum.MEDIA]: MediaModelInterface
}
