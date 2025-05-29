import { CatalogFilterInputInterface, CatalogFilterInteface } from 'contracts'

export interface CatalogCategoryFilterServiceInterface {
    getFilter(
        categoryId: number | number[],
        filters: CatalogFilterInputInterface[]
    ): Promise<CatalogFilterInteface>
}
