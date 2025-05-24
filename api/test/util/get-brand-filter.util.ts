import { CatalogFilterInteface, CatalogFilterValuesSelectType } from "contracts"
import { CatalogDefaultFilterSlugEnum } from "../../src/catalog/enum/catalog-default-filter-slug.enum"

export function getBrandFilter(filters: CatalogFilterInteface[]): CatalogFilterInteface {
    const brandFilter = filters.find(f => f.slug === CatalogDefaultFilterSlugEnum.BRAND)
    expect(brandFilter).toBeDefined()
    return brandFilter!
}

export function getBrandValues(brandFilter: CatalogFilterInteface): CatalogFilterValuesSelectType[] {
    expect(Array.isArray(brandFilter.values)).toBe(true)
    return brandFilter.values as CatalogFilterValuesSelectType[]
}
