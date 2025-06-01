import { Injectable } from '@nestjs/common'
import { ProductCatalogDataloader } from '@/product/dataloader/product-catalog.dataloader'
import { ProductShortInfoInterface, ProductShortInfoModelInterface } from 'contracts'
import { getAvailableStatusByOffer } from '@/offer/util/get-available-status-by-offer.util'
import { Log } from '@rnw-community/nestjs-enterprise'
import { getErrorMessage } from '@rnw-community/shared'

@Injectable()
export class ProductCatalogDataloaderService {
    constructor(private readonly productCatalogDataloader: ProductCatalogDataloader) {}

    @Log(
        ids => `Getting product short info by ids: ${ids.join(', ')}`,
        (products, ids) => `Got product short info by ids ${ids.join(', ')}: ${products.length}`,
        (error, ids) =>
            `Error getting product short info by ids: ${ids.join(', ')}, ${getErrorMessage(error)}`
    )
    async getProductShortInfoByIds(productIds: number[]): Promise<ProductShortInfoInterface[]> {
        const productShortInfo =
            await this.productCatalogDataloader.getProductShortInfoByIds(productIds)

        return productShortInfo.map(this.convertModel.bind(this))
    }

    private convertModel(
        productShortInfo: ProductShortInfoModelInterface
    ): ProductShortInfoInterface {
        return {
            ...productShortInfo,
            image: productShortInfo.productMedia.map(media => media.media)[0],
            status: getAvailableStatusByOffer(productShortInfo.offers[0]),
            title: productShortInfo.title.uk_ua,
            shortDescription: productShortInfo.shortDescription?.uk_ua ?? null,
        }
    }
}
