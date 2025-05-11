import { BaseModelInterface } from '@/generic'
import { MediaModelInterface } from '@/media/interface/media-model.interface'
import { SellerEntityInterface } from '@/seller/entity/seller-entity.interface'
import { SellerAssociationEnum } from '@/seller/enum/seller-association.enum'

type SellerModelFields = 'name' | 'slug'

export interface SellerModelInterface
    extends BaseModelInterface,
        Pick<SellerEntityInterface, SellerModelFields> {
    [SellerAssociationEnum.LOGO]: MediaModelInterface | null
}
