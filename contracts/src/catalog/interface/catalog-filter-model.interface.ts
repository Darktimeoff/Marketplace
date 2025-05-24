import { BaseEntityInterface } from '@/generic'

export interface CatalogFilterValuesSelectType extends Pick<BaseEntityInterface, 'id'> {
    name: string | null
    count: number
}

export type CatalogFilterValuesRangeType = { min: number; max: number }

export interface CatalogFilterModelInteface extends Pick<BaseEntityInterface, 'id'> {
    slug: string
    name: string
    values: CatalogFilterValuesSelectType[] | CatalogFilterValuesRangeType
}
