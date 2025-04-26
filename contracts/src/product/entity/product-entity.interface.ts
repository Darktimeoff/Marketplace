import { BaseEntityInterface } from '@/generic'
import { ProductInterface } from '@/product/interface/product.interface'
import { ProductAssociationInterface } from '@/product/association/product-association.interface'

export interface ProductEntityInterface
    extends BaseEntityInterface,
        ProductInterface,
        ProductAssociationInterface {}
