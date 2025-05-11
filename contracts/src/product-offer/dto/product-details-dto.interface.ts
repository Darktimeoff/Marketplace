import { BrandDtoInterface } from '@/brand'
import { BaseModelInterface } from '@/generic'
import { ProductAvailabilityStatusEnum } from '@/product-offer'
import { SellerDtoInterface } from '@/seller'

export interface ProductAvailabilityDtoInterface extends BaseModelInterface {
    brand: BrandDtoInterface | null
    seller: SellerDtoInterface
    availabilityStatus: ProductAvailabilityStatusEnum
}
