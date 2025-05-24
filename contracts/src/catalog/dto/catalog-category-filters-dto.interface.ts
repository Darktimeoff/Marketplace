import { CatalogCategoryFiltersInteface } from '@/catalog/interface/catalog-category-filters.interface'
import { CatalogFilterDtoInterface } from './catalog-filter-dto.interface'
import { CatalogSortingDtoInterface } from './catalog-sorting-dto.interface'

type DtoFieldsRequiredType = 'total'

export interface CatalogCategoryFiltersDtoInterface
    extends Pick<CatalogCategoryFiltersInteface, DtoFieldsRequiredType> {
    filters: CatalogFilterDtoInterface[]
    sorting: CatalogSortingDtoInterface[]
}
