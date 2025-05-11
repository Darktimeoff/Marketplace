import { BrandDtoInterface } from '@/brand'
import { BaseDtoInterface } from '@/generic'
import { SellerDtoInterface } from '@/seller'
import { ProductAvailabilityInterface } from '@/product-offer'

export type ProductAvailabilityField = 'availabilityStatus'

export interface ProductAvailabilityDtoInterface
    extends BaseDtoInterface,
        Pick<ProductAvailabilityInterface, ProductAvailabilityField> {
    brand: BrandDtoInterface | null
    seller: SellerDtoInterface
}
