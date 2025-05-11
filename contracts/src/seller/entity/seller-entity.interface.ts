import { BaseEntityInterface } from '@/generic/entity/base-entity.interface'
import { MediaEntityInterface } from '@/media/entity/media-entity.interface'
import { SellerAssociationEnum } from '@/seller/enum/seller-association.enum'

export interface SellerEntityInterface extends BaseEntityInterface {
    name: string
    slug: string
    logoId: number | null

    [SellerAssociationEnum.LOGO]?: MediaEntityInterface | null
}
