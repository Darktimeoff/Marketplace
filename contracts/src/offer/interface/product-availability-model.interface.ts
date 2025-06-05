import { ProductAssociationEnum } from '@/product'
import { SellerModelInterface } from '@/seller'
import { BaseModelInterface } from '@/generic'
import { ProductOfferEntityInterface } from '@/index'

export interface ProductAvailabilityModelInterface
    extends BaseModelInterface,
        Pick<ProductOfferEntityInterface, 'isActive' | 'quantity'> {
    [ProductAssociationEnum.SELLER]: SellerModelInterface
}
