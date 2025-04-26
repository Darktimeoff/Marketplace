import { BaseEntityInterface } from '@/generic'
import { ProductAttributeValueInterface } from '@/product/product-attribute-value/interface/product-attribute-value.interface'
import { ProductAttributeValueAssociationInterface } from '@/product/product-attribute-value/association/product-attribute-value-association.interface'

export interface ProductAttributeValueEntityInterface
    extends BaseEntityInterface,
        ProductAttributeValueInterface,
        ProductAttributeValueAssociationInterface {}
