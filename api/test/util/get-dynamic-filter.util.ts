import { CatalogFilterInteface } from "contracts";
import { CatalogDefaultFilterSlugEnum } from "../../src/catalog/enum/catalog-default-filter-slug.enum";
import { isNotEmptyArray } from "@rnw-community/shared";

export function getDynamicFilter(filters: CatalogFilterInteface[]): CatalogFilterInteface {
    const dynamicFilter = filters.find(f => 
        !Object.values(CatalogDefaultFilterSlugEnum).includes(f.slug as CatalogDefaultFilterSlugEnum) &&
        Array.isArray(f.values) &&
        isNotEmptyArray(f.values)
    )

    if(!dynamicFilter) {
        throw new Error('Dynamic filter is not defined')
    }

    return dynamicFilter
}