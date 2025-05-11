import { ProductOfferEntityInterface } from '@/product-offer/entity/product-offer-entity.interface'

type ProductOfferModelFields = 'isActive' | 'quantity'

export interface ProductOfferModelInterface
    extends Pick<ProductOfferEntityInterface, ProductOfferModelFields> {}
