import { CategoryInterface } from '@/category'

export interface CategoryWithChildrensInterface extends Omit<CategoryInterface, 'name'> {
    name: string
    childrens: CategoryWithChildrensInterface[]
}
