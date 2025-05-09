import { TranslatedInterface } from '@/generic'
import { ProductAttributesGroupedModelInterface } from './product-attributes-grouped-model.interface'
import { AttributeGroupAssociationEnum } from '@/attribute'
import { ProductAttributesWithoutGroupingInterface } from './product-attributes-without-grouping.interface'

export interface ProductAttributesGroupedInterface
    extends Omit<
        TranslatedInterface<ProductAttributesGroupedModelInterface>,
        AttributeGroupAssociationEnum.ATTRIBUTES
    > {
    [AttributeGroupAssociationEnum.ATTRIBUTES]: ProductAttributesWithoutGroupingInterface[]
}
