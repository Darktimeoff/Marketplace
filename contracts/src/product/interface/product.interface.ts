import { TranslatedInterface } from '@/generic'
import { MediaInterface } from '@/media'
import { ProductAssociationEnum, ProductModelInterface } from '@/product'

export interface ProductInterface
    extends Omit<TranslatedInterface<ProductModelInterface>, ProductAssociationEnum.PRODUCT_MEDIA> {
    media: MediaInterface[]
}
