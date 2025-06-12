export const getProductAttributesCacheKey = (productId: number) => {
    return `product:${productId}:attributes`
}
