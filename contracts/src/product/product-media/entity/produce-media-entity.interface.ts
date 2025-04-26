import { BaseEntityInterface } from '@/generic'
import { ProductMediaInterface } from '@/product/product-media/interface/product-media.interface'
import { ProductMediaAssociationInterface } from '@/product/product-media/association/product-media-association.interface'

export interface ProductMediaEntityInterface
    extends BaseEntityInterface,
        ProductMediaInterface,
        ProductMediaAssociationInterface {}
