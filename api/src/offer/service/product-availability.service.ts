import { Injectable, NotFoundException } from '@nestjs/common'
import { ProductAvailabilityDataloader } from '@/offer/dataloader/product-availability.dataloader'
import { Prisma } from '@/generic/db/generated'
import { DBErrorCodeEnum } from '@/generic/db/db-error-code.enum'
import { ProductAvailabilityInterface } from 'contracts'
import { Log } from '@rnw-community/nestjs-enterprise'
import { getErrorMessage } from '@rnw-community/shared'
import { getAvailableStatusByOffer } from '@/offer/util/get-available-status-by-offer.util'

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
                availabilityStatus: getAvailableStatusByOffer(productAvailability.offers[0]),
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
}
