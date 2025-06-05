import { BrandDtoInterface } from '@/brand/dto/brand-dto.interface'
import { TranslatedInterface } from '@/generic'
import { MediaDtoInterface } from '@/media'
import { ProductModelInterface } from '@/product'
import { ProductAssociationEnum } from '@/product/enum/product-association.enum'

export interface ProductDtoInterface
    extends Omit<
        TranslatedInterface<ProductModelInterface>,
        ProductAssociationEnum.PRODUCT_MEDIA | ProductAssociationEnum.BRAND
    > {
    brand: BrandDtoInterface | null
    media: MediaDtoInterface[]
}
