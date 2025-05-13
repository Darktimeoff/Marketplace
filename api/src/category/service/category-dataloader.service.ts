import { Injectable } from '@nestjs/common'
import { CategoryDataloader } from '@/category/dataloader/category.dataloader'
import { CategoryModelInterface, CategoryWithChildrensInterface } from 'contracts'
import { Log } from '@rnw-community/nestjs-enterprise'
import { getErrorMessage, isDefined, isPositiveNumber } from '@rnw-community/shared'

@Injectable()
export class CategoryDataloaderService {
    constructor(private readonly dataloader: CategoryDataloader) {}

    @Log(
        id => `Get children ids: ${id}`,
        (ids, id) => `Got children ids by id ${id}: ${ids.length}`,
        (error, id) => `Failed to get children ids by id ${id}: ${getErrorMessage(error)}`
    )
    async getChildrenIds(id: number): Promise<number[]> {
        return await this.dataloader.getChildrenIds(id)
    }

    @Log(
        'Get all categories tree',
        categories => `Got all categories tree: ${categories.length}`,
        error => `Failed to get all categories tree: ${getErrorMessage(error)}`
    )
    async getAllTree() {
        const categories = await this.dataloader.getAll()

        return this.buildTree(categories)
    }

    private buildTree(categories: CategoryModelInterface[]): CategoryWithChildrensInterface[] {
        const map = new Map<number, CategoryWithChildrensInterface>()
        const roots: CategoryWithChildrensInterface[] = []

        for (const cat of categories) {
            map.set(cat.id, { ...cat, childrens: [], name: cat.name.uk_ua })
        }

        for (const cat of categories) {
            const parts = cat.path.split('/').filter(Boolean).map(Number)
            const parentId = parts.length > 1 ? parts[parts.length - 2] : null

            const node = map.get(cat.id)

            if (!isDefined(node)) {
                continue
            }

            if (isPositiveNumber(parentId) && map.has(parentId)) {
                const parentNode = map.get(parentId)
                if (isDefined(parentNode)) {
                    parentNode.childrens.push(node)
                }
            } else {
                roots.push(node)
            }
        }

        return roots
    }
}
