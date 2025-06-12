import { ProductAttributeDataloader } from '@/attribute/dataloader/product-attribute.dataloader'
import { Cached } from '@/generic/decorator/сached.decorator'
import { Injectable } from '@nestjs/common'
import { Log } from '@rnw-community/nestjs-enterprise'
import { getErrorMessage } from '@rnw-community/shared'
import {
    ProductAttributesGroupedInterface,
    ProductAttributesWithoutGroupingInterface,
    ProductAttributesWithoutGroupingModelInterface,
} from 'contracts'
import { getProductAttributesFlatCacheKey } from '../cache-key/get-product-attributes-flat.cache-key'
import { getProductAttributesCacheKey } from '../cache-key/get-product-attributes.cache-key'

@Injectable()
export class ProductAttributeService {
    constructor(private readonly dataloader: ProductAttributeDataloader) {}

    @Log(
        productId => `Finding attributes by product id: ${productId}`,
        (attributes, productId) =>
            `Found attributes by product id ${productId}: ${attributes.length}`,
        (error, productId) =>
            `Error finding attributes by product id ${productId}: ${getErrorMessage(error)}`
    )
    @Cached(getProductAttributesFlatCacheKey)
    async findByProductIdWithoutGrouping(
        productId: number
    ): Promise<ProductAttributesWithoutGroupingInterface[]> {
        const attributes = await this.dataloader.findByProductIdWithoutGroupingAndTake(productId)

        return attributes.map(this.convertToTranslatedInterface.bind(this))
    }

    @Log(
        productId => `Finding grouped attributes by product id: ${productId}`,
        (attributes, productId) =>
            `Found grouped attributes by product id ${productId}: ${attributes.length}`,
        (error, productId) =>
            `Error finding grouped attributes by product id ${productId}: ${getErrorMessage(error)}`
    )
    @Cached(getProductAttributesCacheKey)
    async findByProductIdGrouped(productId: number): Promise<ProductAttributesGroupedInterface[]> {
        const attributesGrouped = await this.dataloader.findByProductIdGrouped(productId)

        return attributesGrouped.map(group => {
            return {
                ...group,
                name: group.name?.uk_ua ?? null,
                attributes: group.attributes.map(this.convertToTranslatedInterface.bind(this)),
            }
        })
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
