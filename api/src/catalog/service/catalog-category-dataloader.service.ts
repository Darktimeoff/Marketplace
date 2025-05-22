import { Injectable } from '@nestjs/common'
import { CategoryDataloaderService } from '@/category/service/category-dataloader.service'
import { CatalogCategoryFilterDataloaderService } from './catalog-category-filter-dataloader.service'
import { FilterInputInterface } from 'contracts'
import { CatalogPaginationInput } from '@/catalog/input/catalog-pagination.input'

@Injectable()
export class CatalogCategoryDataloaderService {
    constructor(
        private readonly categories: CategoryDataloaderService,
        private readonly filters: CatalogCategoryFilterDataloaderService
    ) {}

    async getByCategoryIdFilters(id: number, filtersInput: FilterInputInterface[]) {
        const categories = await this.categories.getChildrenIds(id)
        const [total, filters] = await Promise.all([
            this.filters.getTotalCount(categories, filtersInput),
            this.filters.getFiltersByCategoryId(id, categories, filtersInput),
        ])

        return {
            total,
            filters,
            sorting: await this.filters.getSortingOptions(),
        }
    }

    async getByCategoryId(
        id: number,
        pagination: CatalogPaginationInput,
        filters: FilterInputInterface[]
    ) {
        const categories = await this.categories.getChildrenIds(id)
        const products = await this.filters.getProductIds(categories, filters, pagination)
        return products
    }
}
