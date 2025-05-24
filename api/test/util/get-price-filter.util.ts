import { CatalogFilterInteface, CatalogFilterValuesRangeType } from "contracts"
import { CatalogDefaultFilterSlugEnum } from "../../src/catalog/enum/catalog-default-filter-slug.enum"

export function getPriceFilter(filters: CatalogFilterInteface[]): CatalogFilterInteface {
    const priceFilter = filters.find(f => f.slug === CatalogDefaultFilterSlugEnum.PRICE)
    expect(priceFilter).toBeDefined()
    return priceFilter!
}

export function getPriceRange(priceFilter: CatalogFilterInteface): CatalogFilterValuesRangeType {
    expect(Array.isArray(priceFilter.values)).toBe(false)
    return priceFilter.values as CatalogFilterValuesRangeType
}