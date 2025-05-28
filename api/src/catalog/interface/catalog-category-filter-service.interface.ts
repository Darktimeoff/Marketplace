import { CatalogFilterInputInterface, CatalogFilterInteface } from 'contracts'

export interface CatalogCategoryFilterServiceInterface {
    getFilters(
        categoryId: number | number[],
        filters: CatalogFilterInputInterface[]
    ): Promise<CatalogFilterInteface | CatalogFilterInteface[]>
}
