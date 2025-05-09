import { AttributeAssociationEnum } from '@/attribute'
import { BaseModelInterface } from '@/generic'
import { TranslationModelInterface } from '@/translation'
import { UnitModelInterface } from '@/unit'
import { ProductAttributesValuesModelInterface } from './product-attributes-values-model.interface'

export interface ProductAttributesWithoutGroupingModelInterface extends BaseModelInterface {
    [AttributeAssociationEnum.NAME]: TranslationModelInterface
    [AttributeAssociationEnum.UNIT]: UnitModelInterface | null
    [AttributeAssociationEnum.PRODUCT_ATTRIBUTE_VALUES]: ProductAttributesValuesModelInterface[]
}
