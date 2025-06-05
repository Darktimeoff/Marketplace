import { TranslatedInterface } from '@/generic'
import { MediaInterface } from '@/media'
import { ProductShortInfoModelInterface } from './product-short-info-model.interface'
import { ProductAssociationEnum } from '@/product'
import { ProductAvailabilityStatusEnum } from '@/offer'

export interface ProductShortInfoInterface
    extends TranslatedInterface<
        Omit<
            ProductShortInfoModelInterface,
            ProductAssociationEnum.PRODUCT_MEDIA | ProductAssociationEnum.OFFERS
        >
    > {
    image: MediaInterface
    status: ProductAvailabilityStatusEnum
}
