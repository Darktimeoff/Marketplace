import { Injectable } from '@nestjs/common'
import { CategoryDynamicFilterDataloader } from '@/category/dataloader/category-dynamic-filter.dataloader'
import { Log } from '@rnw-community/nestjs-enterprise'
import { getErrorMessage } from '@rnw-community/shared'
import { CategoryDynamicFilterInterface } from 'contracts'

@Injectable()
export class CategoryDynamicFilterDataloaderService {
    constructor(private readonly dataloader: CategoryDynamicFilterDataloader) {}

    @Log(
        (categoryId: number) => `Get filters by category id: ${categoryId}`,
        (result, categoryId) => `Got "${result.length}" filters by category id: ${categoryId}`,
        (error, categoryId) =>
            `Error getting filters by category id ${categoryId}: ${getErrorMessage(error)}`
    )
    async getByCategoryId(categoryId: number): Promise<CategoryDynamicFilterInterface[]> {
        const attributes = await this.dataloader.getByCategoryId(categoryId)

        return attributes.map(attribute => ({
            ...attribute,
            name: attribute.name.uk_ua,
            unit: attribute.unit?.uk_ua ?? null,
        }))
    }
}
