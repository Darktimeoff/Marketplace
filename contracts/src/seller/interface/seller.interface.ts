import { SellerModelInterface } from '@/seller/interface/seller-model.interface'
import { SellerAssociationEnum } from '@/seller/enum/seller-association.enum'
import { MediaInterface } from '@/media/interface/media.interface'

export interface SellerInterface extends SellerModelInterface {
    [SellerAssociationEnum.LOGO]: MediaInterface | null
}
