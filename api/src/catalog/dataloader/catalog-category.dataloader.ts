import { Injectable } from '@nestjs/common'
import { DBService } from '@/generic/db/db.service'

@Injectable()
export class CatalogCategoryDataloader {
    constructor(private readonly db: DBService) {}

    async getByCategoryIds(categoryIds: number[]): Promise<number[]> {
        const products = await this.db.product.findMany({
            where: {
                categoryId: {
                    in: categoryIds,
                },
            },
            select: {
                id: true,
            },
            take: 56,
            orderBy: {
                id: 'asc',
            },
        })
        return products.map(product => product.id)
    }
}
