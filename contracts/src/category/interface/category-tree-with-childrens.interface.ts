import { CategoryTreeInterface } from '@/category'

export interface CategoryTreeWithChildrensInterface extends Omit<CategoryTreeInterface, 'name'> {
    name: string
    childrens: CategoryTreeWithChildrensInterface[]
}
