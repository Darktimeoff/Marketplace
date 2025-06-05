import { CatalogFilterInteface, CatalogFilterValuesSelectType, ProductFilterSlugEnum } from "contracts"

export function getSellerFilter(filters: CatalogFilterInteface[]): CatalogFilterInteface {
    const sellerFilter = filters.find(f => f.slug === ProductFilterSlugEnum.SELLER)
    expect(sellerFilter).toBeDefined()
    return sellerFilter!
}

export function getSellerValues(sellerFilter: CatalogFilterInteface): CatalogFilterValuesSelectType[] {
    expect(Array.isArray(sellerFilter.values)).toBe(true)
    return sellerFilter.values as CatalogFilterValuesSelectType[]
}