import { CacheKeyFactory } from '@/generic/decorator/сached.decorator'
import { getHashedStr } from '@/generic/util/get-hashed-str.util'
import { CatalogFilterInputInterface } from 'contracts'

export const getByCategoryIdFiltersCacheKey: CacheKeyFactory<
    [number, CatalogFilterInputInterface[]]
> = (id: number, filtersInput: CatalogFilterInputInterface[]) => {
    const filterKey = filtersInput
        .map(filter => `${filter.slug}:${getFilterValue(filter.values)}`)
        .join()

    return `category:${id}:filters:${getHashedStr(filterKey)}`
}

function getFilterValue(values: CatalogFilterInputInterface['values']) {
    if (Array.isArray(values)) {
        return values.join()
    }

    return values.min + ':' + values.max
}
