import { AttributeAssociationEnum } from '@/attribute'
import {
    ProductAttributeValuesDtoInterface,
    ProductAttributesWithoutGroupingInterface,
} from '@/product-attributes'

export interface ProductAttributesDtoInterface
    extends Omit<
        ProductAttributesWithoutGroupingInterface,
        AttributeAssociationEnum.PRODUCT_ATTRIBUTE_VALUES
    > {
    values: ProductAttributeValuesDtoInterface[]
}
