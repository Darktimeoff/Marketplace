import { getHashedStr } from '@/generic/util/get-hashed-str.util'

export const getProductsShortInfoByIdsCacheKey = (ids: number[]) => {
    return `products:${getHashedStr(ids.join())}`
}
