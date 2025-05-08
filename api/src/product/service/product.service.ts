import { Injectable } from '@nestjs/common'
import { ProductDataloader } from '@/product/dataloader/product.dataloader'
import { Log } from '@rnw-community/nestjs-enterprise'
import { ProductInterface } from 'contracts'
import { getErrorMessage } from '@rnw-community/shared'

@Injectable()
export class ProductService {
    constructor(private readonly dataloader: ProductDataloader) {}

    @Log(
        (slug: string) => `Finding product by slug: ${slug}`,
        (product, slug) => `Found product by slug ${slug}: ${product.id}`,
        (error, slug) => `Error finding product by slug ${slug}: ${getErrorMessage(error)}`
    )
    async findBySlug(slug: string): Promise<ProductInterface> {
        const product = await this.dataloader.findBySlug(slug)

        return {
            ...product,
            title: product.title.uk_ua,
            media: product.productMedia.map(media => media.media),
        }
    }
}
