import { CategoryModelInterface } from '@/category'
import { TranslatedInterface } from '@/generic'

export interface CategoryWithChildrensInterface
    extends TranslatedInterface<CategoryModelInterface> {
    childrens: CategoryWithChildrensInterface[]
}
