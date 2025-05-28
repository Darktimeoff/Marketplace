import { CatalogFilterInputInterface } from 'contracts'
import { FilterCountableModelInterface } from './filter-countable-model.interface'
import { NamesFilterModelInterface } from './names-filter-model.interface'

export interface CatalogCategoryFilterDataloaderInterface<T extends FilterCountableModelInterface> {
    getCount(categoryIds: number[], filters: CatalogFilterInputInterface[]): Promise<T[]>
    getNames(ids: number[]): Promise<NamesFilterModelInterface[]>
}
