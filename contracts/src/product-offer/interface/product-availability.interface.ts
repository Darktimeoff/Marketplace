import { ProductAvailabilityModelInterface, ProductAvailabilityStatusEnum } from '@/product-offer'
import { ProductAssociationEnum } from '@/product'

export interface ProductAvailabilityInterface
    extends Omit<ProductAvailabilityModelInterface, ProductAssociationEnum.OFFERS> {
    availabilityStatus: ProductAvailabilityStatusEnum
}
