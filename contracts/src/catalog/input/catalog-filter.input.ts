export type CatalogFilterValuesSelectInputType = number[]
export type CatalogFilterValuesRangeInputType = { min: number; max: number }

export interface CatalogFilterInputInterface {
    slug: string
    values: CatalogFilterValuesSelectInputType | CatalogFilterValuesRangeInputType
}
