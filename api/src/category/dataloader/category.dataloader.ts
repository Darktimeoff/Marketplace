import { DBService } from '@/generic/db/db.service'
import { Injectable } from '@nestjs/common'
import { CategoryModelInterface } from 'contracts'

@Injectable()
export class CategoryDataloader {
    constructor(private readonly db: DBService) {}

    async getAll(): Promise<CategoryModelInterface[]> {
        const categories = await this.db.category.findMany({
            include: {
                name: {
                    omit: {
                        ...this.db.getDefaultOmit(),
                    },
                },
            },
            omit: {
                imageId: true,
                nameId: true,
                parentCategoryId: true,
                ...this.db.getDefaultOmit(),
            },
            orderBy: {
                path: 'asc',
            },
        })

        return categories
    }
}
