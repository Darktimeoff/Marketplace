import { BaseEntityInterface } from '@/generic'
import { CategoryAttributeInterface } from '@/category/category-attribute/interface/category-attribute.interface'
import { CategoryAttributeAssociationInterface } from '@/category/category-attribute/association/category-attribute-association.interface'

export interface CategoryAttributeEntityInterface
    extends BaseEntityInterface,
        CategoryAttributeInterface,
        CategoryAttributeAssociationInterface {}
