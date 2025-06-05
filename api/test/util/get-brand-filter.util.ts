import { CatalogFilterInteface, CatalogFilterValuesSelectType, ProductFilterSlugEnum } from "contracts"

export function getBrandFilter(filters: CatalogFilterInteface[]): CatalogFilterInteface {
    const brandFilter = filters.find(f => f.slug === ProductFilterSlugEnum.BRAND)
    expect(brandFilter).toBeDefined()
    return brandFilter!
}

export function getBrandValues(brandFilter: CatalogFilterInteface): CatalogFilterValuesSelectType[] {
    expect(Array.isArray(brandFilter.values)).toBe(true)
    return brandFilter.values as CatalogFilterValuesSelectType[]
}
