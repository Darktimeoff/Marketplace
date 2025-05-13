import { Injectable } from '@nestjs/common'
import { CatalogCategoryDataloader } from '@/catalog/dataloader/catalog-category.dataloader'

@Injectable()
export class CatalogCategoryService {
    constructor(private readonly dataloader: CatalogCategoryDataloader) {}

    async getByCategoryId(id: number) {
        return await this.dataloader.getByCategoryId(id)
    }
}
