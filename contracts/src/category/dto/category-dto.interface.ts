import { CategoryWithChildrensInterface } from '@/category'

export interface CategoryDtoInterface
    extends Omit<CategoryWithChildrensInterface, 'path' | 'childrens'> {
    childrens: CategoryDtoInterface[]
}
