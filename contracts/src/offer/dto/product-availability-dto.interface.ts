import { BaseDtoInterface } from '@/generic'
import { SellerDtoInterface } from '@/seller'
import { ProductAvailabilityInterface } from '@/offer'

export type ProductAvailabilityField = 'availabilityStatus'

export interface ProductAvailabilityDtoInterface
    extends BaseDtoInterface,
        Pick<ProductAvailabilityInterface, ProductAvailabilityField> {
    seller: SellerDtoInterface
}
