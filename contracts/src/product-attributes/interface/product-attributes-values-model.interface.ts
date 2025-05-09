import { ProductAttributeValuesEntityInterface } from '@/product-attributes/entity/product-attribute-values-entity.interface'
import { ProductAttributeValuesAssociationEnum } from '@/product-attributes/enum/product-attribute-values-association.enum'
import { TranslationModelInterface } from '@/translation'

type ProductAttributesValuesModelFields = 'numberValue'

export interface ProductAttributesValuesModelInterface
    extends Pick<ProductAttributeValuesEntityInterface, ProductAttributesValuesModelFields> {
    [ProductAttributeValuesAssociationEnum.TEXT_VALUE]: TranslationModelInterface | null
}
