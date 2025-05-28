import { FilterCountableModelInterface } from './filter-countable-model.interface'
import { ProductEntityInterface } from 'contracts'

export interface SellerFilterCountableModelInterface
    extends FilterCountableModelInterface,
        Pick<ProductEntityInterface, 'sellerId'> {}
