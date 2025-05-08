import { CategoryAssociationEnum } from '@/category'
import { TranslationModelInterface } from '@/translation'
import { CategoryEntityInterface } from '@/category'
import { BaseModelInterface } from '@/generic'

type CategoryModelFields = 'slug' | 'path'

export interface CategoryModelInterface
    extends BaseModelInterface,
        Pick<CategoryEntityInterface, CategoryModelFields> {
    [CategoryAssociationEnum.NAME]: TranslationModelInterface
}
