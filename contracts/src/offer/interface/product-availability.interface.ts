import { ProductAvailabilityModelInterface, ProductAvailabilityStatusEnum } from '@/offer'

export interface ProductAvailabilityInterface
    extends Omit<ProductAvailabilityModelInterface, 'isActive' | 'quantity'> {
    availabilityStatus: ProductAvailabilityStatusEnum
}
