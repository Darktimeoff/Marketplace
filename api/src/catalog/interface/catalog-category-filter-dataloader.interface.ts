import { CatalogFilterInputInterface } from 'contracts'
import { FilterCountableModelInterface } from './filter-countable-model.interface'
import { NamesFilterModelInterface } from './names-filter-model.interface'

export interface CatalogCategoryFilterDataloaderInterface {
    getCount(
        categoryIds: number[],
        filters: CatalogFilterInputInterface[]
    ): Promise<FilterCountableModelInterface[]>
    getNames(ids: number[]): Promise<NamesFilterModelInterface[]>
}
