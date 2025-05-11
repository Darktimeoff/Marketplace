import { Injectable, NotFoundException } from '@nestjs/common'
import { ProductAvailabilityDataloader } from '@/product-offer/dataloader/product-availability.dataloader'
import { Prisma } from '@/generic/db/generated'
import { DBErrorCodeEnum } from '@/generic/db/db-error-code.enum'
import { ProductAvailabilityInterface, ProductAvailabilityStatusEnum } from 'contracts'

@Injectable()
export class ProductAvailabilityService {
    constructor(private readonly dataloader: ProductAvailabilityDataloader) {}

    async findByProductId(productId: number): Promise<ProductAvailabilityInterface> {
        try {
            const productAvailability = await this.dataloader.findByProductId(productId)

            return {
                ...productAvailability,
                availabilityStatus:
                    productAvailability.offers[0].isActive &&
                    productAvailability.offers[0].quantity > 0
                        ? ProductAvailabilityStatusEnum.AVAILABLE
                        : ProductAvailabilityStatusEnum.UNAVAILABLE,
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
