import { CatalogFilterInteface, CatalogFilterValuesRangeType, ProductFilterSlugEnum } from "contracts"

export function getPriceFilter(filters: CatalogFilterInteface[]): CatalogFilterInteface {
    const priceFilter = filters.find(f => f.slug === ProductFilterSlugEnum.PRICE)
    expect(priceFilter).toBeDefined()
    return priceFilter!
}

export function getPriceRange(priceFilter: CatalogFilterInteface): CatalogFilterValuesRangeType {
    expect(Array.isArray(priceFilter.values)).toBe(false)
    return priceFilter.values as CatalogFilterValuesRangeType
}