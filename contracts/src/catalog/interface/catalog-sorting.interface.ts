import { CatalogSortingEnum } from '@/catalog/enum/catalog-sorting.enum'

export interface CatalogSoringInterface {
    id: CatalogSortingEnum
    isDefault: boolean
    name: string
}
