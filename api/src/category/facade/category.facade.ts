import { Injectable } from '@nestjs/common'
import { CategoryDataloaderService } from '@/category/service/category-dataloader.service'
import { CategoryDynamicFilterDataloaderService } from '@/category/service/category-dynamic-filter-dataloader.service'
import { CategoryDynamicFilterInterface } from 'contracts'

@Injectable()
export class CategoryFacade {
    constructor(
        private readonly categoryFilters: CategoryDynamicFilterDataloaderService,
        private readonly categories: CategoryDataloaderService
    ) {}

    async getDynamicFiltersByCategoryId(
        categoryId: number
    ): Promise<CategoryDynamicFilterInterface[]> {
        return await this.categoryFilters.getByCategoryId(categoryId)
    }

    async getChildrenIdsByCategoryId(categoryId: number): Promise<number[]> {
        return await this.categories.getChildrenIds(categoryId)
    }
}
