import { CategoryEntityInterface } from '@/category'
import { MediaAssociationEnum } from '@/media/enum/media-association.enum'
import { ProductMediaEntityInterface } from '@/product'

export interface MediaAssociationInterface {
    [MediaAssociationEnum.CATEGORIES]?: CategoryEntityInterface[]
    [MediaAssociationEnum.PRODUCT_MEDIA]?: ProductMediaEntityInterface[]
}
