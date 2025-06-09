import { TranslatedInterface } from '@/generic'
import { CategoryDynamicFilterModelInterface } from './category-dynamic-filter-model.interface'

export interface CategoryDynamicFilterInterface
    extends TranslatedInterface<Omit<CategoryDynamicFilterModelInterface, 'unit'>> {
    unit: string | null
}
