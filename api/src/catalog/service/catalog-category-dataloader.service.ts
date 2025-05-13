import { Injectable } from '@nestjs/common'
import { CatalogCategoryDataloader } from '@/catalog/dataloader/catalog-category.dataloader'
import { CategoryDataloaderService } from '@/category/service/category-dataloader.service'
import { ProductCatalogService } from '@/product/service/product-catalaog.service'

@Injectable()
export class CatalogCategoryDataloaderService {
    constructor(
        private readonly dataloader: CatalogCategoryDataloader,
        private readonly categories: CategoryDataloaderService,
        private readonly products: ProductCatalogService
    ) {}

    async getByCategoryId(id: number) {
        const categories = await this.categories.getChildrenIds(id)
        const productsIds = await this.dataloader.getByCategoryIds(categories)
        const products = await this.products.getProductShortInfoByIds(productsIds)

        return products
    }
}
