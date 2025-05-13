import { Injectable } from '@nestjs/common'
import { CatalogCategoryDataloader } from '@/catalog/dataloader/catalog-category.dataloader'
import { CategoryDataloaderService } from '@/category/service/category-dataloader.service'

@Injectable()
export class CatalogCategoryDataloaderService {
    constructor(
        private readonly dataloader: CatalogCategoryDataloader,
        private readonly categories: CategoryDataloaderService
    ) {}

    async getByCategoryId(id: number) {
        const categories = await this.categories.getChildrenIds(id)
        const productsIds = await this.dataloader.getByCategoryIds(categories)

        return productsIds.join(',')
    }
}
