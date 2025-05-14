import { Injectable } from '@nestjs/common'
import { CatalogCategoryDataloader } from '@/catalog/dataloader/catalog-category.dataloader'
import { CategoryDataloaderService } from '@/category/service/category-dataloader.service'
import { CatalogCategoryFilterDataloaderService } from './catalog-category-filter-dataloade.service'
@Injectable()
export class CatalogCategoryDataloaderService {
    constructor(
        private readonly dataloader: CatalogCategoryDataloader,
        private readonly categories: CategoryDataloaderService,
        private readonly filterDataloader: CatalogCategoryFilterDataloaderService
    ) {}

    async getByCategoryId(id: number) {
        const categories = await this.categories.getChildrenIds(id)
        // const productsIds = await this.dataloader.getByCategoryIds(categories)

        return {
            total: await this.dataloader.countByCategoryIds(categories),
            filters: await this.filterDataloader.getFiltersByCategoryId(categories),
        }
    }
}
