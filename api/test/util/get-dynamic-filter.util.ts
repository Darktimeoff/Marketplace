import { CatalogFilterInteface, ProductFilterSlugEnum } from "contracts";
import { isNotEmptyArray } from "@rnw-community/shared";

export function getDynamicFilter(filters: CatalogFilterInteface[]): CatalogFilterInteface {
    const dynamicFilter = filters.find(f => 
        !Object.values(ProductFilterSlugEnum).includes(f.slug as ProductFilterSlugEnum) &&
        Array.isArray(f.values) &&
        isNotEmptyArray(f.values)
    )

    if(!dynamicFilter) {
        throw new Error('Dynamic filter is not defined')
    }

    return dynamicFilter
}