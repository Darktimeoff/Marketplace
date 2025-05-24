import { CatalogFilterInteface, CatalogFilterValuesSelectType } from "contracts"
import { CatalogDefaultFilterSlugEnum } from "../../src/catalog/enum/catalog-default-filter-slug.enum"

export function getSellerFilter(filters: CatalogFilterInteface[]): CatalogFilterInteface {
    const sellerFilter = filters.find(f => f.slug === CatalogDefaultFilterSlugEnum.SELLER)
    expect(sellerFilter).toBeDefined()
    return sellerFilter!
}

export function getSellerValues(sellerFilter: CatalogFilterInteface): CatalogFilterValuesSelectType[] {
    expect(Array.isArray(sellerFilter.values)).toBe(true)
    return sellerFilter.values as CatalogFilterValuesSelectType[]
}