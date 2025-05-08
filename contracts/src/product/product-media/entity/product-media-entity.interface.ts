import { BaseEntityInterface } from '@/generic'
import { MediaEntityInterface } from '@/media'
import { ProductMediaAssociationEnum } from '@/product/product-media/enum/product-media-association.enum'
import { ProductEntityInterface } from '@/product/entity/product-entity.interface'

export interface ProductMediaEntityInterface extends Omit<BaseEntityInterface, 'id'> {
    productId: number
    mediaId: number
    order: number

    [ProductMediaAssociationEnum.MEDIA]?: MediaEntityInterface
    [ProductMediaAssociationEnum.PRODUCT]?: ProductEntityInterface
}
