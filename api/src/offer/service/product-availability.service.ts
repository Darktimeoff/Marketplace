import { Injectable, NotFoundException } from '@nestjs/common'
import { ProductAvailabilityDataloader } from '@/offer/dataloader/product-availability.dataloader'
import { Prisma } from '@/generic/db/generated'
import { DBErrorCodeEnum } from '@/generic/db/db-error-code.enum'
import {
    ProductAvailabilityInterface,
    ProductAvailabilityStatusEnum,
    ProductOfferModelInterface,
} from 'contracts'
import { Log } from '@rnw-community/nestjs-enterprise'
import { getErrorMessage } from '@rnw-community/shared'

@Injectable()
export class ProductAvailabilityService {
    constructor(private readonly dataloader: ProductAvailabilityDataloader) {}

    @Log(
        productId => `Finding product availability by productId: ${productId}`,
        (productAvailability, productId) =>
            `Found product availability by productId ${productId}: ${productAvailability.availabilityStatus}`,
        (error, productId) =>
            `Error finding product availability by productId ${productId}: ${getErrorMessage(error)}`
    )
    async findByProductId(productId: number): Promise<ProductAvailabilityInterface> {
        try {
            const productAvailability = await this.dataloader.findByProductId(productId)

            return {
                ...productAvailability,
                availabilityStatus: this.getAvailableStatysByOffer(productAvailability),
            }
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === DBErrorCodeEnum.NOT_FOUND
            ) {
                throw new NotFoundException('Product availability not found')
            }
            throw error
        }
    }

    @Log(
        offer =>
            `Get avaialablility status availability by offer active: ${offer.isActive} quantity: ${offer.quantity}`,
        (status, offer) =>
            `Found product availability by offer active: ${offer.isActive} quantity: ${offer.quantity} status: ${status}`,
        (error, offer) =>
            `Error finding product availability by offer active: ${offer.isActive} quantity: ${offer.quantity}: ${getErrorMessage(error)}`
    )
    getAvailableStatysByOffer(offer: Pick<ProductOfferModelInterface, 'isActive' | 'quantity'>) {
        if (offer.isActive && offer.quantity > 0) {
            return ProductAvailabilityStatusEnum.AVAILABLE
        }

        return ProductAvailabilityStatusEnum.UNAVAILABLE
    }
}
