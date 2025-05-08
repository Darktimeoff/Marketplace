import { DBService } from '@/generic/db/db.service'
import { Injectable } from '@nestjs/common'
import { CategoryInterface } from 'contracts'

@Injectable()
export class CategoryDataloader {
    constructor(private readonly db: DBService) {}

    async getAll(): Promise<CategoryInterface[]> {
        const categories = await this.db.category.findMany({
            include: {
                name: {
                    omit: {
                        id: true,
                        createdAt: true,
                        updatedAt: true,
                        deletedAt: true,
                    },
                },
            },
            omit: {
                imageId: true,
                nameId: true,
                parentCategoryId: true,
                createdAt: true,
                updatedAt: true,
                deletedAt: true,
            },
            orderBy: {
                path: 'asc',
            },
        })

        return categories
    }
}
