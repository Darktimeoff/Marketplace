import {
    AttributeEntityInterface,
    ProductAttributeValuesEntityInterface,
    TranslationModelInterface,
} from 'contracts'

export interface CatalogAttributeValueModelInterface
    extends Pick<ProductAttributeValuesEntityInterface, 'numberValue'> {
    textValue: TranslationModelInterface | null
    attribute: Pick<AttributeEntityInterface, 'slug'>
}
