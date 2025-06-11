import { Injectable, NotFoundException } from '@nestjs/common'
import { ProductDataloader } from '@/product/dataloader/product.dataloader'
import { Log } from '@rnw-community/nestjs-enterprise'
import { ProductInterface } from 'contracts'
import { getErrorMessage } from '@rnw-community/shared'
import { Prisma } from '@/generic/db/generated'
import { DBErrorCodeEnum } from '@/generic/db/db-error-code.enum'
import { Cached } from '@/generic/decorator/сached.decorator'
import { getProductByIdKey } from '@/product/cache/get-product-by-id-key.cache'
import { CacheTTLEnum } from '@/generic/cache/cache-ttl.enum'

@Injectable()
export class ProductService {
    constructor(private readonly dataloader: ProductDataloader) {}

    @Log(
        (productId: number) => `Finding product by id: ${productId}`,
        (product, productId) => `Found product by id ${productId}: ${product.id}`,
        (error, productId) => `Error finding product by id ${productId}: ${getErrorMessage(error)}`
    )
    @Cached(getProductByIdKey, CacheTTLEnum.ONE_DAY)
    async findById(productId: number): Promise<ProductInterface> {
        try {
            const product = await this.dataloader.findById(productId)
            return {
                ...product,
                title: product.title.uk_ua,
                media: product.productMedia.map(media => media.media),
            }
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === DBErrorCodeEnum.NOT_FOUND
            ) {
                throw new NotFoundException('Product not found')
            }
            throw error
        }
    }
}
