import { CatalogFilterInteface } from './catalog-filter.interface'
import { CatalogSoringInterface } from './catalog-sorting.interface'

export interface CatalogCategoryFiltersInteface {
    total: number
    filters: CatalogFilterInteface[]
    sorting: CatalogSoringInterface[]
}
