import { Attribute } from '@/generic/db/generated'
import { ProductAttributeDataloader } from '@/product-attributes/dataloader/product-attribute.dataloader'
import { ProductService } from '@/product/service/product.service'
import { Injectable } from '@nestjs/common'
import { Log } from '@rnw-community/nestjs-enterprise'
import { getErrorMessage } from '@rnw-community/shared'

@Injectable()
export class ProductAttributeService {
    constructor(
        private readonly dataloader: ProductAttributeDataloader,
        private readonly products: ProductService
    ) {}

    @Log(
        slug => `Finding attributes by product slug: ${slug}`,
        (attributes, slug) => `Found attributes by product slug ${slug}: ${attributes.length}`,
        (error, slug) =>
            `Error finding attributes by product slug ${slug}: ${getErrorMessage(error)}`
    )
    async findBySlugWithoutGrouping(slug: string): Promise<Attribute[]> {
        const productId = await this.products.getProductIdBySlug(slug)

        const attributes = await this.dataloader.findByProductIdWithoutGroupingAndTake(productId)

        return attributes
    }
}
