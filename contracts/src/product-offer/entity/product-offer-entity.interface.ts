import { BaseEntityInterface } from '@/generic'
import { ProductEntityInterface } from '@/product'
import { SellerEntityInterface } from '@/seller'
import { ProductOfferAssociationEnum } from '@/product-offer/enum/product-offer-association.enum'

export interface ProductOfferEntityInterface extends Omit<BaseEntityInterface, 'id'> {
    productId: number
    sellerId: number
    isActive: boolean
    quantity: number

    [ProductOfferAssociationEnum.PRODUCT]?: ProductEntityInterface
    [ProductOfferAssociationEnum.SELLER]?: SellerEntityInterface
}
