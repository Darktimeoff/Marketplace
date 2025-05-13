import { MediaDtoInterface } from '@/media'
import { ProductShortInfoInterface } from '@/product/interface/product-short-info.interface'

export interface ProductShortInfoDtoInterface extends ProductShortInfoInterface {
    image: MediaDtoInterface
}
