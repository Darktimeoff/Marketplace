import { BaseEntityInterface } from '@/generic'
import { UnitTypeEnum } from '@/unit/enum/unit-type.enum'

export interface UnitEntityInterface extends BaseEntityInterface {
    name: string
    type: `${UnitTypeEnum}`
    uk_ua: string
}
