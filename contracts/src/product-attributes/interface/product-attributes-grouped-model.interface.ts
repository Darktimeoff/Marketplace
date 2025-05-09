import { AttributeGroupAssociationEnum } from '@/attribute'
import { BaseModelInterface } from '@/generic'
import { TranslationModelInterface } from '@/translation'
import { ProductAttributesWithoutGroupingModelInterface } from './product-attributes-without-grouping-model.interface'

export interface ProductAttributesGroupedModelInterface extends BaseModelInterface {
    [AttributeGroupAssociationEnum.NAME]: TranslationModelInterface | null
    [AttributeGroupAssociationEnum.ATTRIBUTES]: ProductAttributesWithoutGroupingModelInterface[]
}
