import { BaseEntityInterface } from '@/generic'
import { CategoryInterface } from '@/category/interface/category.interface'
import { CategoryAssociationInterface } from '@/category/association/category-association.interface'

export interface CategoryEntityInterface
    extends BaseEntityInterface,
        CategoryInterface,
        CategoryAssociationInterface {}
