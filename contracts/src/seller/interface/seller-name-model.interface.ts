import { BaseModelInterface } from '@/generic'
import { SellerEntityInterface } from '@/seller'

export interface SellerNameModelInterface
    extends BaseModelInterface,
        Pick<SellerEntityInterface, 'name'> {}
