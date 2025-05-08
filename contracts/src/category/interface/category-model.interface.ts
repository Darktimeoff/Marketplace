import { CategoryAssociationEnum } from '@/category'
import { TranslationModelInterface } from '@/translation'
import { CategoryEntityInterface } from '@/category'

type CategoryModelFields = 'id' | 'slug' | 'path'

export interface CategoryModelInterface extends Pick<CategoryEntityInterface, CategoryModelFields> {
    [CategoryAssociationEnum.NAME]: TranslationModelInterface
}
