import { Injectable } from '@nestjs/common'
import { CategoryDataloaderService } from '@/category/service/category-dataloader.service'
import { CatalogCategoryFilterDataloaderService } from './catalog-category-filter-dataloader.service'
import { CatalogDefaultSorting } from '@/catalog/enum/catalog-default-sorting.enum'
import { FilterInputInterface } from 'contracts'

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
        offset: number,
        limit: number,
        filters: FilterInputInterface[],
        sorting: CatalogDefaultSorting
    ) {
        const categories = await this.categories.getChildrenIds(id)
        const products = await this.filters.getProductIds(
            categories,
            filters,
            offset,
            limit,
            sorting
        )
        return products
    }
}
