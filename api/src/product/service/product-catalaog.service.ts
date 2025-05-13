import { Injectable } from '@nestjs/common'
import { ProductCatalogDataloader } from '@/product/dataloader/product-catalog.dataloader'

@Injectable()
export class ProductCatalogService {
    constructor(private readonly productCatalogDataloader: ProductCatalogDataloader) {}

    async getProductShortInfoByIds(productIds: number[]) {
        return await this.productCatalogDataloader.getProductShortInfoByIds(productIds)
    }
}
