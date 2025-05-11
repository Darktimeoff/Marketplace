import { BrandModelInterface } from '@/brand'
import { ProductOfferModelInterface } from '@/product-offer'
import { ProductAssociationEnum } from '@/product'
import { SellerModelInterface } from '@/seller'
import { BaseModelInterface } from '@/generic'

export interface ProductAvailabilityModelInterface extends BaseModelInterface {
    [ProductAssociationEnum.BRAND]: BrandModelInterface | null
    [ProductAssociationEnum.SELLER]: SellerModelInterface
    [ProductAssociationEnum.OFFERS]: ProductOfferModelInterface[]
}
