import {
    CatalogFilterInteface,
    CatalogFilterValuesRangeType,
    CatalogFilterValuesSelectType,
} from '@/catalog/interface/catalog-filter.interface'

export interface CatalogFilterValuesSelectDtoInterface extends CatalogFilterValuesSelectType {}

export interface CatalogFilterValuesRangeDtoInterface extends CatalogFilterValuesRangeType {}

export interface CatalogFilterDtoInterface extends Omit<CatalogFilterInteface, 'values'> {
    values: CatalogFilterValuesSelectDtoInterface[] | CatalogFilterValuesRangeDtoInterface
}
