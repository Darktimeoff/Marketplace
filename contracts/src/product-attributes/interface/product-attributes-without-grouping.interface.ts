import { TranslatedInterface } from '@/generic'
import { ProductAttributesWithoutGroupingModelInterface } from './product-attributes-without-grouping-model.interface'
import { AttributeAssociationEnum } from '@/attribute'

export interface ProductAttributesWithoutGroupingInterface
    extends Omit<
        TranslatedInterface<ProductAttributesWithoutGroupingModelInterface>,
        AttributeAssociationEnum.UNIT
    > {
    [AttributeAssociationEnum.UNIT]: string | null
}
