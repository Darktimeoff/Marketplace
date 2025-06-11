import { ProductEntityInterface } from 'contracts'

export const getProductByIdCacheKey = (productId: ProductEntityInterface['id']) =>
    `product:${productId}`
