import { CatalogPaginationInput } from '@/catalog/input/catalog-pagination.input'
import { CatalogFilterInputInterface } from 'contracts'
import { getByCategoryIdFiltersCacheKey } from './get-by-category-id-filters.cache-key'
import { getHashedStr } from '@/generic/util/get-hashed-str.util'

export const getByCategoryIdCacheKey = (
    id: number,
    pagination: CatalogPaginationInput,
    filters: CatalogFilterInputInterface[]
) => {
    const paginationKey = `${pagination.sorting}:${pagination.offset}:${pagination.limit}`
    return (
        getByCategoryIdFiltersCacheKey(id, filters) + `:pagination:${getHashedStr(paginationKey)}`
    )
}
