import { BaseModelInterface } from '@/generic'
import { BrandEntityInterface } from '@/brand/entity/brand-entity.interface'

export interface BrandNameModelInterface
    extends BaseModelInterface,
        Pick<BrandEntityInterface, 'name'> {}
