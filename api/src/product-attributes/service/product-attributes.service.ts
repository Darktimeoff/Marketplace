import { ProductAttributeDataloader } from '@/product-attributes/dataloader/product-attribute.dataloader'
import { ProductService } from '@/product/service/product.service'
import { Injectable } from '@nestjs/common'
import { Log } from '@rnw-community/nestjs-enterprise'
import { getErrorMessage } from '@rnw-community/shared'
import {
    ProductAttributesWithoutGroupingInterface,
    ProductAttributesWithoutGroupingModelInterface,
} from 'contracts'

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
    async findBySlugWithoutGrouping(
        slug: string
    ): Promise<ProductAttributesWithoutGroupingInterface[]> {
        const productId = await this.products.getProductIdBySlug(slug)

        const attributes = await this.dataloader.findByProductIdWithoutGroupingAndTake(productId)

        return attributes.map(this.convertToTranslatedInterface.bind(this))
    }

    @Log(
        slug => `Finding grouped attributes by product slug: ${slug}`,
        (attributes, slug) =>
            `Found grouped attributes by product slug ${slug}: ${attributes.length}`,
        (error, slug) =>
            `Error finding grouped attributes by product slug ${slug}: ${getErrorMessage(error)}`
    )
    async findBySlugGrouped(slug: string) {
        const productId = await this.products.getProductIdBySlug(slug)

        const attributes = await this.dataloader.findByProductIdGrouped(productId)

        return attributes
    }

    private convertToTranslatedInterface(
        attribute: ProductAttributesWithoutGroupingModelInterface
    ): ProductAttributesWithoutGroupingInterface {
        return {
            ...attribute,
            unit: attribute.unit?.uk_ua ?? null,
            name: attribute.name.uk_ua,
            productAttributeValues: attribute.productAttributeValues.map(productAttributeValue => {
                return {
                    ...productAttributeValue,
                    textValue: productAttributeValue.textValue?.uk_ua ?? null,
                }
            }),
        }
    }
}
