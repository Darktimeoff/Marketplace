export type FilterValuesSelectType = number[]
export type FilterValuesRangeType = { min: number; max: number }

export type FilterValuesType = FilterValuesSelectType | FilterValuesRangeType

export interface FilterInputInterface {
    slug: string
    values: FilterValuesType
}
