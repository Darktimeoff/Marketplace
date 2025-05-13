import { ProductAvailabilityStatusEnum, ProductOfferModelInterface } from 'contracts'

export function getAvailableStatusByOffer(
    offer: ProductOfferModelInterface
): ProductAvailabilityStatusEnum {
    if (offer.isActive && offer.quantity > 0) {
        return ProductAvailabilityStatusEnum.AVAILABLE
    }

    return ProductAvailabilityStatusEnum.UNAVAILABLE
}
