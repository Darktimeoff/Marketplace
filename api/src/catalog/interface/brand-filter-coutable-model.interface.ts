import { ProductEntityInterface } from 'contracts'
import { FilterCountableModelInterface } from './filter-countable-model.interface'

export interface BrandFilterCountableModelInterface
    extends FilterCountableModelInterface,
        Pick<ProductEntityInterface, 'brandId'> {}
