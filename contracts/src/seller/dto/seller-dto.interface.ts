import { MediaDtoInterface } from '@/media/dto/media-dto.interface'
import { SellerInterface } from '@/seller/interface/seller.interface'

export interface SellerDtoInterface extends SellerInterface {
    logo: MediaDtoInterface | null
}
