import { CatalogSortingEnum } from '@/catalog/enum/catalog-sorting.enum'

export interface CatalogPaginationInputInterface {
    offset: number
    limit: number
    sorting: CatalogSortingEnum
}
