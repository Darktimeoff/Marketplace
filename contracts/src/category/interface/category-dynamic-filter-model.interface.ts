import { UnitModelInterface } from '@/unit'

import { TranslationModelInterface } from '@/translation'
import { AttributeEntityInterface } from '@/attribute'
import { AttributeAssociationEnum } from '@/attribute/enum/attribute-association.enum'

export interface CategoryDynamicFilterModelInterface
    extends Pick<AttributeEntityInterface, 'id' | 'slug'> {
    [AttributeAssociationEnum.NAME]: TranslationModelInterface
    [AttributeAssociationEnum.UNIT]: UnitModelInterface | null
}
