import { BaseModelInterface } from '@/generic'
import { UnitEntityInterface } from '@/unit'

type UnitModelFields = 'type' | 'uk_ua'

export interface UnitModelInterface
    extends BaseModelInterface,
        Pick<UnitEntityInterface, UnitModelFields> {}
