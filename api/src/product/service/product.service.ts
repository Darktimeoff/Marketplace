import { Injectable, NotFoundException } from '@nestjs/common'
import { ProductDataloader } from '@/product/dataloader/product.dataloader'
import { Log } from '@rnw-community/nestjs-enterprise'
import { ProductInterface } from 'contracts'
import { getErrorMessage } from '@rnw-community/shared'
import { Prisma } from '@/generic/db/generated'
import { DBErrorCodeEnum } from '@/generic/db/db-error-code.enum'

@Injectable()
export class ProductService {
    constructor(private readonly dataloader: ProductDataloader) {}

    @Log(
        (slug: string) => `Finding product by slug: ${slug}`,
        (product, slug) => `Found product by slug ${slug}: ${product.id}`,
        (error, slug) => `Error finding product by slug ${slug}: ${getErrorMessage(error)}`
    )
    async findBySlug(slug: string): Promise<ProductInterface> {
        try {
            const product = await this.dataloader.findBySlug(slug)

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

    @Log(
        slug => `Getting product id by slug: ${slug}`,
        (productId, slug) => `Found product id by slug ${slug}: ${productId}`,
        (error, slug) => `Error getting product id by slug ${slug}: ${getErrorMessage(error)}`
    )
    async getProductIdBySlug(slug: string): Promise<number> {
        try {
            return await this.dataloader.getProductIdBySlug(slug)
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
