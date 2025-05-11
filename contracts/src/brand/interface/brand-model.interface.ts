import { BaseModelInterface } from '@/generic'
import { BrandEntityInterface } from '@/brand/entity/brand-entity.interface'

type BrandModelFields = 'name' | 'slug'

export interface BrandModelInterface
    extends BaseModelInterface,
        Pick<BrandEntityInterface, BrandModelFields> {}
