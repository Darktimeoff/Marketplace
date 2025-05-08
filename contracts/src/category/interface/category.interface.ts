import { CategoryAssociationEnum } from '@/category'
import { TranslationInterface } from '@/translation'
import { CategoryEntityInterface } from '@/category'

export interface CategoryInterface extends Pick<CategoryEntityInterface, 'id' | 'slug' | 'path'> {
    [CategoryAssociationEnum.NAME]: TranslationInterface
}
