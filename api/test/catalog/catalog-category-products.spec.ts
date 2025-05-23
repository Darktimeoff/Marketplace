import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import request from 'supertest'
import { AppModule } from '../../src/app/app.module'
import { Server } from 'node:http'
import { CatalogSortingEnum } from 'contracts'
import { CatalogDefaultFilterSlugEnum } from '../../src/catalog/enum/catalog-default-filter-slug.enum'
import type { Filter, FilterValue, FilterValueRange } from '../../src/catalog/service/catalog-category-filter-dataloader.service'
import { DBService } from '../../src/generic/db/db.service'
import { isDefined } from '@rnw-community/shared'

const MOBILE_PHONE_CATEGORY_ID = 10
const INVALID_CATEGORY_ID = 'invalid'
const NON_EXISTENT_CATEGORY_ID = 999999

interface CatalogFiltersResponse {
    total: number
    filters: Filter[]
    sorting: Array<{ id: string; isDefault: boolean; name: string }>
}

function getBrandFilter(filters: Filter[]): Filter {
    const brandFilter = filters.find(f => f.slug === CatalogDefaultFilterSlugEnum.BRAND)
    expect(brandFilter).toBeDefined()
    return brandFilter!
}

function getSellerFilter(filters: Filter[]): Filter {
    const sellerFilter = filters.find(f => f.slug === CatalogDefaultFilterSlugEnum.SELLER)
    expect(sellerFilter).toBeDefined()
    return sellerFilter!
}

function getPriceFilter(filters: Filter[]): Filter {
    const priceFilter = filters.find(f => f.slug === CatalogDefaultFilterSlugEnum.PRICE)
    expect(priceFilter).toBeDefined()
    return priceFilter!
}

function getBrandValues(brandFilter: Filter): FilterValue[] {
    expect(Array.isArray(brandFilter.values)).toBe(true)
    return brandFilter.values as FilterValue[]
}

function getSellerValues(sellerFilter: Filter): FilterValue[] {
    expect(Array.isArray(sellerFilter.values)).toBe(true)
    return sellerFilter.values as FilterValue[]
}

function getPriceRange(priceFilter: Filter): FilterValueRange {
    expect(Array.isArray(priceFilter.values)).toBe(false)
    return priceFilter.values as FilterValueRange
}

async function getProductPrices(app: INestApplication, productIds: number[]): Promise<number[]> {
    const dbService = app.get(DBService)
    const products = await dbService.product.findMany({
        where: { id: { in: productIds } },
        select: { id: true, price: true },
    })

    const prices: number[] = []
    for (const id of productIds) {
        const product = products.find(p => p.id === id)
        if (product) {
            prices.push(product.price.toNumber())
        }
    }

    return prices
}

async function getProductDates(app: INestApplication, productIds: number[]): Promise<Date[]> {
    const dbService = app.get(DBService)
    const products = await dbService.product.findMany({
        where: { id: { in: productIds } },
        select: { id: true, createdAt: true },
    })

    const dates: Date[] = []
    for (const id of productIds) {
        const product = products.find(p => p.id === id)
        if (product) {
            dates.push(product.createdAt)
        }
    }

    return dates
}

async function getProductBrands(app: INestApplication, productIds: number[]): Promise<number[]> {
    const dbService = app.get(DBService)
    const products = await dbService.product.findMany({
        where: { id: { in: productIds } },
        select: { id: true, brandId: true },
    })
    return products.map(p => p.brandId).filter(isDefined)
}

async function getProductSellers(app: INestApplication, productIds: number[]): Promise<number[]> {
    const dbService = app.get(DBService)
    const products = await dbService.product.findMany({
        where: { id: { in: productIds } },
        select: { id: true, sellerId: true },
        orderBy: { id: 'asc' }
    })
    return products.map(p => p.sellerId).filter(isDefined)
}

describe('CatalogCategoryProducts (e2e)', () => {
    let app: INestApplication<Server>

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()

        app = moduleFixture.createNestApplication()
        app.useGlobalPipes(new ValidationPipe({
            transform: true
        }))
        await app.init()
    })

    afterAll(async () => {
        await app.close()
    })

    describe('Pagination', () => {
        it('should return products with default pagination', async () => {
            const response = await request(app.getHttpServer())
                .get(`/catalog/category/${MOBILE_PHONE_CATEGORY_ID}`)
                .expect(200)

            const body: number[] = response.body
            expect(Array.isArray(body)).toBe(true)
            expect(body.length).toBeGreaterThan(0)
            expect(body.length).toBeLessThanOrEqual(100) // Max limit
        })

        it('should respect limit parameter', async () => {
            const limit = 5
            const response = await request(app.getHttpServer())
                .get(`/catalog/category/${MOBILE_PHONE_CATEGORY_ID}?limit=${limit}`)
                .expect(200)

            const body: number[] = response.body
            expect(body.length).toBeLessThanOrEqual(limit)
        })

        it('should respect offset parameter', async () => {
            const limit = 5

            const firstPageResponse = await request(app.getHttpServer())
                .get(`/catalog/category/${MOBILE_PHONE_CATEGORY_ID}?limit=${limit}&offset=0`)
                .expect(200)

            const secondPageResponse = await request(app.getHttpServer())
                .get(`/catalog/category/${MOBILE_PHONE_CATEGORY_ID}?limit=${limit}&offset=${limit}`)
                .expect(200)

            const firstPage: number[] = firstPageResponse.body
            const secondPage: number[] = secondPageResponse.body

            expect(firstPage.length).toBeGreaterThan(0)
            expect(secondPage.length).toBeGreaterThan(0)
            
            const intersection = firstPage.filter(id => secondPage.includes(id))
            expect(intersection.length).toBe(0)
        })

        it('should handle large offset gracefully', async () => {
            const response = await request(app.getHttpServer())
                .get(`/catalog/category/${MOBILE_PHONE_CATEGORY_ID}?offset=10000`)
                .expect(200)

            const body: number[] = response.body
            expect(Array.isArray(body)).toBe(true)
            expect(body.length).toBe(0)
        })
    })

    describe('Sorting', () => {
        it('should sort by newest (default)', async () => {
            const response = await request(app.getHttpServer())
                .get(`/catalog/category/${MOBILE_PHONE_CATEGORY_ID}`)
                .query({ limit: 10, sorting: CatalogSortingEnum.NEWEST })
                .expect(200)

            const productIds = response.body
            expect(productIds).toBeInstanceOf(Array)
            expect(productIds.length).toBeGreaterThan(1)

            const dates = await getProductDates(app, productIds)
        
            // Проверяем что даты отсортированы по убыванию (новые первыми)
            let isSorted = true
            for (let i = 0; i < dates.length - 1; i++) {
                if (dates[i].getTime() < dates[i + 1].getTime()) {
                    isSorted = false
                    break
                }
            }
            expect(isSorted).toBe(true)
        })

        it('should sort by price ascending (cheap)', async () => {
            const response = await request(app.getHttpServer())
                .get(`/catalog/category/${MOBILE_PHONE_CATEGORY_ID}`)
                .query({ limit: 10, sorting: CatalogSortingEnum.CHEAP })
                .expect(200)

            const productIds: number[] = response.body
            expect(productIds).toBeInstanceOf(Array)
            expect(productIds.length).toBeGreaterThan(1)

            const prices = await getProductPrices(app, productIds)


            let isSorted = true
            for (let i = 0; i < prices.length - 1; i++) {
                if (prices[i] > prices[i + 1]) {
                    isSorted = false
                    break
                }
            }
            expect(isSorted).toBe(true)
        })

        it('should sort by price descending (expensive)', async () => {
            const response = await request(app.getHttpServer())
                .get(`/catalog/category/${MOBILE_PHONE_CATEGORY_ID}`)
                .query({ limit: 10, sorting: CatalogSortingEnum.EXPENSIVE })
                .expect(200)

            const productIds = response.body
            expect(productIds).toBeInstanceOf(Array)
            expect(productIds.length).toBeGreaterThan(1)

            const prices = await getProductPrices(app, productIds)

            let isSorted = true
            for (let i = 0; i < prices.length - 1; i++) {
                if (prices[i] < prices[i + 1]) {
                    isSorted = false
                    break
                }
            }
            expect(isSorted).toBe(true)
        })

        it('should handle invalid sorting gracefully', async () => {
            await request(app.getHttpServer())
                .get(`/catalog/category/${MOBILE_PHONE_CATEGORY_ID}?sorting=invalid`)
                .expect(400)
        })
    })

    describe('Brand Filtering', () => {
        it('should filter products by single brand', async () => {
            // Получаем доступные бренды
            const filtersResponse = await request(app.getHttpServer())
                .get(`/catalog/category/${MOBILE_PHONE_CATEGORY_ID}/filters`)
                .expect(200)

            const filtersBody: CatalogFiltersResponse = filtersResponse.body
            const brandFilter = getBrandFilter(filtersBody.filters)
            const brandValues = getBrandValues(brandFilter)

            if (brandValues.length === 0) return

            const selectedBrand = brandValues[0]

            const response = await request(app.getHttpServer())
                .get(`/catalog/category/${MOBILE_PHONE_CATEGORY_ID}?filters=brand:${selectedBrand.id}`)
                .expect(200)

            const productIds: number[] = response.body
            expect(productIds.length).toBeGreaterThan(0)

            // Проверяем что все продукты имеют выбранный бренд
            const productBrands = await getProductBrands(app, productIds)
            productBrands.forEach(brandId => {
                expect(brandId).toBe(selectedBrand.id)
            })
        })

        it('should filter products by multiple brands', async () => {
            const filtersResponse = await request(app.getHttpServer())
                .get(`/catalog/category/${MOBILE_PHONE_CATEGORY_ID}/filters`)
                .expect(200)

            const filtersBody: CatalogFiltersResponse = filtersResponse.body
            const brandFilter = getBrandFilter(filtersBody.filters)
            const brandValues = getBrandValues(brandFilter)

            if (brandValues.length < 2) return

            const selectedBrands = [brandValues[0], brandValues[1]]
            const brandIds = selectedBrands.map(b => b.id)

            const response = await request(app.getHttpServer())
                .get(`/catalog/category/${MOBILE_PHONE_CATEGORY_ID}?filters=brand:${brandIds.join(',')}`)
                .expect(200)

            const productIds: number[] = response.body
            expect(productIds.length).toBeGreaterThan(0)

            // Проверяем что все продукты имеют один из выбранных брендов
            const productBrands = await getProductBrands(app, productIds)
            productBrands.forEach(brandId => {
                expect(brandIds).toContain(brandId)
            })
        })
    })

    describe('Seller Filtering', () => {
        it('should filter products by single seller', async () => {
            const filtersResponse = await request(app.getHttpServer())
                .get(`/catalog/category/${MOBILE_PHONE_CATEGORY_ID}/filters`)
                .expect(200)

            const filtersBody: CatalogFiltersResponse = filtersResponse.body
            const sellerFilter = getSellerFilter(filtersBody.filters)
            const sellerValues = getSellerValues(sellerFilter)

            if (sellerValues.length === 0) return

            const selectedSeller = sellerValues[0]

            const response = await request(app.getHttpServer())
                .get(`/catalog/category/${MOBILE_PHONE_CATEGORY_ID}?filters=seller:${selectedSeller.id}`)
                .expect(200)

            const productIds: number[] = response.body
            expect(productIds.length).toBeGreaterThan(0)

            // Проверяем что все продукты имеют выбранного продавца
            const productSellers = await getProductSellers(app, productIds)
            productSellers.forEach(sellerId => {
                expect(sellerId).toBe(selectedSeller.id)
            })
        })

        it('should filter products by multiple sellers', async () => {
            const filtersResponse = await request(app.getHttpServer())
                .get(`/catalog/category/${MOBILE_PHONE_CATEGORY_ID}/filters`)
                .expect(200)

            const filtersBody: CatalogFiltersResponse = filtersResponse.body
            const sellerFilter = getSellerFilter(filtersBody.filters)
            const sellerValues = getSellerValues(sellerFilter)

            if (sellerValues.length < 2) return

            const selectedSellers = [sellerValues[0], sellerValues[1]]
            const sellerIds = selectedSellers.map(s => s.id)

            const response = await request(app.getHttpServer())
                .get(`/catalog/category/${MOBILE_PHONE_CATEGORY_ID}?filters=seller:${sellerIds.join(',')}`)
                .expect(200)

            const productIds: number[] = response.body
            expect(productIds.length).toBeGreaterThan(0)

            // Проверяем что все продукты имеют одного из выбранных продавцов
            const productSellers = await getProductSellers(app, productIds)
            productSellers.forEach(sellerId => {
                expect(sellerIds).toContain(sellerId)
            })
        })
    })

    describe('Price Filtering', () => {
        it('should filter products by price range', async () => {
            const filtersResponse = await request(app.getHttpServer())
                .get(`/catalog/category/${MOBILE_PHONE_CATEGORY_ID}/filters`)
                .expect(200)

            const filtersBody: CatalogFiltersResponse = filtersResponse.body
            const priceFilter = getPriceFilter(filtersBody.filters)
            const priceRange = getPriceRange(priceFilter)

            const midPrice = Math.floor((priceRange.min + priceRange.max) / 2)
            const testMin = priceRange.min
            const testMax = midPrice

            const response = await request(app.getHttpServer())
                .get(`/catalog/category/${MOBILE_PHONE_CATEGORY_ID}?filters=price:${testMin}-to-${testMax}`)
                .expect(200)

            const productIds: number[] = response.body
            expect(productIds.length).toBeGreaterThan(0)

            // Проверяем что все продукты в заданном ценовом диапазоне
            const prices = await getProductPrices(app, productIds)
            prices.forEach(price => {
                expect(price).toBeGreaterThanOrEqual(testMin)
                expect(price).toBeLessThanOrEqual(testMax)
            })
        })

        it('should handle edge price ranges', async () => {
            const filtersResponse = await request(app.getHttpServer())
                .get(`/catalog/category/${MOBILE_PHONE_CATEGORY_ID}/filters`)
                .expect(200)

            const filtersBody: CatalogFiltersResponse = filtersResponse.body
            const priceFilter = getPriceFilter(filtersBody.filters)
            const priceRange = getPriceRange(priceFilter)

            // Тестируем минимальную цену
            const response = await request(app.getHttpServer())
                .get(`/catalog/category/${MOBILE_PHONE_CATEGORY_ID}?filters=price:${priceRange.min}-to-${priceRange.min}`)
                .expect(200)

            const productIds: number[] = response.body
            if (productIds.length > 0) {
                const prices = await getProductPrices(app, productIds)
                prices.forEach(price => {
                    expect(price).toBe(priceRange.min)
                })
            }
        })
    })

    describe('Dynamic Attribute Filtering', () => {
        it('should filter products by dynamic attributes', async () => {
            const filtersResponse = await request(app.getHttpServer())
                .get(`/catalog/category/${MOBILE_PHONE_CATEGORY_ID}/filters`)
                .expect(200)

            const filtersBody: CatalogFiltersResponse = filtersResponse.body
            const dynamicFilter = filtersBody.filters.find(f => 
                !Object.values(CatalogDefaultFilterSlugEnum).includes(f.slug as CatalogDefaultFilterSlugEnum) &&
                Array.isArray(f.values) &&
                f.values.length > 0
            )

            if (!dynamicFilter) return

            const firstValue = (dynamicFilter.values as FilterValue[])[0]

            const response = await request(app.getHttpServer())
                .get(`/catalog/category/${MOBILE_PHONE_CATEGORY_ID}?filters=${dynamicFilter.slug}:${firstValue.id}`)
                .expect(200)

            const productIds: number[] = response.body
            expect(productIds.length).toBeGreaterThan(0)
            expect(productIds.length).toBeLessThanOrEqual(firstValue.count)
        })

        it('should filter products by multiple dynamic attribute values', async () => {
            const filtersResponse = await request(app.getHttpServer())
                .get(`/catalog/category/${MOBILE_PHONE_CATEGORY_ID}/filters`)
                .expect(200)

            const filtersBody: CatalogFiltersResponse = filtersResponse.body
            const dynamicFilter = filtersBody.filters.find(f => 
                !Object.values(CatalogDefaultFilterSlugEnum).includes(f.slug as CatalogDefaultFilterSlugEnum) &&
                Array.isArray(f.values) &&
                (f.values as FilterValue[]).length > 1
            )

            if (!dynamicFilter) return

            const values = dynamicFilter.values as FilterValue[]
            const selectedValues = [values[0], values[1]]
            const valueIds = selectedValues.map(v => v.id)

            const response = await request(app.getHttpServer())
                .get(`/catalog/category/${MOBILE_PHONE_CATEGORY_ID}?filters=${dynamicFilter.slug}:${valueIds.join(',')}`)
                .expect(200)

            const productIds: number[] = response.body
            expect(productIds.length).toBeGreaterThan(0)
        })
    })

    describe('Combined Filtering', () => {
        it('should apply multiple filters correctly', async () => {
            const filtersResponse = await request(app.getHttpServer())
                .get(`/catalog/category/${MOBILE_PHONE_CATEGORY_ID}/filters`)
                .expect(200)

            const filtersBody: CatalogFiltersResponse = filtersResponse.body
            const brandFilter = getBrandFilter(filtersBody.filters)
            const priceFilter = getPriceFilter(filtersBody.filters)
            
            const brandValues = getBrandValues(brandFilter)
            const priceRange = getPriceRange(priceFilter)

            if (brandValues.length === 0) return

            const selectedBrand = brandValues[0]
            const midPrice = Math.floor((priceRange.min + priceRange.max) / 2)

            const response = await request(app.getHttpServer())
                .get(`/catalog/category/${MOBILE_PHONE_CATEGORY_ID}?filters=brand:${selectedBrand.id};price:${priceRange.min}-to-${midPrice}`)
                .expect(200)

            const productIds: number[] = response.body
            
            if (productIds.length > 0) {
                // Проверяем бренд
                const productBrands = await getProductBrands(app, productIds)
                productBrands.forEach(brandId => {
                    expect(brandId).toBe(selectedBrand.id)
                })

                // Проверяем цену
                const prices = await getProductPrices(app, productIds)
                prices.forEach(price => {
                    expect(price).toBeGreaterThanOrEqual(priceRange.min)
                    expect(price).toBeLessThanOrEqual(midPrice)
                })
            }
        })
    })

    describe('Input Validation', () => {
        it('should reject invalid category ID', async () => {
            await request(app.getHttpServer())
                .get(`/catalog/category/${INVALID_CATEGORY_ID}`)
                .expect(400)
        })

        it('should reject negative limit', async () => {
            await request(app.getHttpServer())
                .get(`/catalog/category/${MOBILE_PHONE_CATEGORY_ID}?limit=-1`)
                .expect(400)
        })

        it('should reject limit exceeding maximum', async () => {
            await request(app.getHttpServer())
                .get(`/catalog/category/${MOBILE_PHONE_CATEGORY_ID}?limit=101`)
                .expect(400)
        })

        it('should reject negative offset', async () => {
            await request(app.getHttpServer())
                .get(`/catalog/category/${MOBILE_PHONE_CATEGORY_ID}?offset=-1`)
                .expect(400)
        })

        it('should reject non-integer offset', async () => {
            await request(app.getHttpServer())
                .get(`/catalog/category/${MOBILE_PHONE_CATEGORY_ID}?offset=1.5`)
                .expect(400)
        })

        it('should reject non-integer limit', async () => {
            await request(app.getHttpServer())
                .get(`/catalog/category/${MOBILE_PHONE_CATEGORY_ID}?limit=1.5`)
                .expect(400)
        })

        it('should reject invalid sorting option', async () => {
            await request(app.getHttpServer())
                .get(`/catalog/category/${MOBILE_PHONE_CATEGORY_ID}?sorting=invalid`)
                .expect(400)
        })
    })

    describe('Edge Cases', () => {
        it('should handle non-existent category ID', async () => {
            const response = await request(app.getHttpServer())
                .get(`/catalog/category/${NON_EXISTENT_CATEGORY_ID}`)
                .expect(200)

            const body: number[] = response.body
            expect(Array.isArray(body)).toBe(true)
            expect(body.length).toBe(0)
        })

        it('should handle empty filters gracefully', async () => {
            const response = await request(app.getHttpServer())
                .get(`/catalog/category/${MOBILE_PHONE_CATEGORY_ID}?filters=`)
                .expect(200)

            const body: number[] = response.body
            expect(Array.isArray(body)).toBe(true)
        })

        it('should handle malformed filter syntax', async () => {
            await request(app.getHttpServer())
                .get(`/catalog/category/${MOBILE_PHONE_CATEGORY_ID}?filters=invalid-filter-format`)
                .expect(400)
        })

        it('should handle non-existent filter values', async () => {
            const response = await request(app.getHttpServer())
                .get(`/catalog/category/${MOBILE_PHONE_CATEGORY_ID}?filters=brand:999999`)
                .expect(200)

            const body: number[] = response.body
            expect(Array.isArray(body)).toBe(true)
            expect(body.length).toBe(0)
        })

        it('should maintain consistency with pagination and filtering', async () => {
            const filtersResponse = await request(app.getHttpServer())
                .get(`/catalog/category/${MOBILE_PHONE_CATEGORY_ID}/filters`)
                .expect(200)

            const filtersBody: CatalogFiltersResponse = filtersResponse.body
            const brandFilter = getBrandFilter(filtersBody.filters)
            const brandValues = getBrandValues(brandFilter)

            if (brandValues.length === 0) return

            const selectedBrand = brandValues[0]

            // Получаем первую страницу с фильтром
            const firstPageResponse = await request(app.getHttpServer())
                .get(`/catalog/category/${MOBILE_PHONE_CATEGORY_ID}?filters=brand:${selectedBrand.id}&limit=5&offset=0`)
                .expect(200)

            // Получаем вторую страницу с тем же фильтром
            const secondPageResponse = await request(app.getHttpServer())
                .get(`/catalog/category/${MOBILE_PHONE_CATEGORY_ID}?filters=brand:${selectedBrand.id}&limit=5&offset=5`)
                .expect(200)

            const firstPage: number[] = firstPageResponse.body
            const secondPage: number[] = secondPageResponse.body

            // Проверяем что страницы не пересекаются
            const intersection = firstPage.filter(id => secondPage.includes(id))
            expect(intersection.length).toBe(0)

            // Проверяем что все продукты соответствуют фильтру
            if (firstPage.length > 0) {
                const firstPageBrands = await getProductBrands(app, firstPage)
                firstPageBrands.forEach(brandId => {
                    expect(brandId).toBe(selectedBrand.id)
                })
            }

            if (secondPage.length > 0) {
                const secondPageBrands = await getProductBrands(app, secondPage)
                secondPageBrands.forEach(brandId => {
                    expect(brandId).toBe(selectedBrand.id)
                })
            }
        })
    })
})
