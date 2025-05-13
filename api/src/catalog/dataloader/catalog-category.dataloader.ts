import { Injectable } from '@nestjs/common'
import { DBService } from '@/generic/db/db.service'

@Injectable()
export class CatalogCategoryDataloader {
    constructor(private readonly db: DBService) {}

    async getByCategoryId(id: number) {
        return await this.db.category.findFirst({
            where: {
                id,
            },
        })
    }
}
