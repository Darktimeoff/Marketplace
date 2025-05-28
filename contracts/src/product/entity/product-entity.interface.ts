import { BaseEntityInterface } from '@/generic'
import { ProductAssociationEnum } from '@/product/enum/product-association.enum'
import { TranslationEntityInterface } from '@/translation'
import { CategoryEntityInterface } from '@/category'
import { ProductMediaEntityInterface } from '@/product/product-media'
import { BrandEntityInterface } from '@/brand'
import { SellerEntityInterface } from '@/seller'

export interface ProductEntityInterface extends BaseEntityInterface {
    titleId: number
    descriptionId: number
    categoryId: number
    oldPrice: number | null
    brandId: number | null
    sellerId: number
    price: number
    slug: string

    [ProductAssociationEnum.SELLER]?: SellerEntityInterface
    [ProductAssociationEnum.BRAND]?: BrandEntityInterface | null
    [ProductAssociationEnum.TITLE]?: TranslationEntityInterface
    [ProductAssociationEnum.DESCRIPTION]?: TranslationEntityInterface | null
    [ProductAssociationEnum.CATEGORY]?: CategoryEntityInterface
    [ProductAssociationEnum.PRODUCT_MEDIA]?: ProductMediaEntityInterface[]
}
