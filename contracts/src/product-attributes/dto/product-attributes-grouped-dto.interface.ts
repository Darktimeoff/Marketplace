import { AttributeGroupAssociationEnum } from '@/attribute'
import { ProductAttributesGroupedInterface } from '@/product-attributes/interface/product-attributes-grouped.interface'
import { ProductAttributesDtoInterface } from './product-attributes-dto.interface'

export interface ProductAttributesGroupedDtoInterface
    extends Omit<ProductAttributesGroupedInterface, AttributeGroupAssociationEnum.ATTRIBUTES> {
    attributes: ProductAttributesDtoInterface[]
}
