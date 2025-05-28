import { BaseEntityInterface } from '@/generic'
import { ProductAssociationEnum } from '@/product/enum/product-association.enum'
import { TranslationEntityInterface } from '@/translation'
import { CategoryEntityInterface } from '@/category'
import { ProductMediaEntityInterface } from '@/product/product-media'
import { BrandEntityInterface } from '@/brand'

export interface ProductEntityInterface extends BaseEntityInterface {
    titleId: number
    descriptionId: number
    categoryId: number
    oldPrice: number | null
    brandId: number | null
    price: number
    slug: string

    [ProductAssociationEnum.BRAND]?: BrandEntityInterface
    [ProductAssociationEnum.TITLE]?: TranslationEntityInterface
    [ProductAssociationEnum.DESCRIPTION]?: TranslationEntityInterface | null
    [ProductAssociationEnum.CATEGORY]?: CategoryEntityInterface
    [ProductAssociationEnum.PRODUCT_MEDIA]?: ProductMediaEntityInterface[]
}
