import { CategoryAssociationEnum } from '@/category'
import { TranslationInterface } from '@/translation'
import { CategoryEntityInterface } from '@/category'

export interface CategoryTreeInterface
    extends Pick<CategoryEntityInterface, 'id' | 'slug' | 'path'> {
    [CategoryAssociationEnum.NAME]: TranslationInterface
}
