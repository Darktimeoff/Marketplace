import { CategoryTreeWithChildrensInterface } from '@/category'

export interface CategoryDtoInterface
    extends Omit<CategoryTreeWithChildrensInterface, 'path' | 'childrens'> {
    childrens: CategoryDtoInterface[]
}
