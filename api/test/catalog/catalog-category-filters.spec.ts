import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { AppModule } from '../../src/app/app.module'
import { Server } from 'node:http'
import { CatalogDefaultFilterSlugEnum } from '../../src/catalog/enum/catalog-default-filter-slug.enum'
import { CatalogFilterInteface, CatalogFilterValuesRangeType, CatalogFilterValuesSelectType } from 'contracts'
import { getDynamicFilter } from '../util/get-dynamic-filter.util'

const MOBILE_PHONE_CATEGORY_ID = 10

interface CatalogFiltersResponse {
    total: number
    filters: CatalogFilterInteface[]
    sorting: Array<{ id: string; isDefault: boolean; name: string }>
}

function getBrandFilter(filters: CatalogFilterInteface[]): CatalogFilterInteface {
    const brandFilter = filters.find(f => f.slug === CatalogDefaultFilterSlugEnum.BRAND)
    expect(brandFilter).toBeDefined()
    return brandFilter!
}

function getSellerFilter(filters: CatalogFilterInteface[]): CatalogFilterInteface {
    const sellerFilter = filters.find(f => f.slug === CatalogDefaultFilterSlugEnum.SELLER)
    expect(sellerFilter).toBeDefined()
    return sellerFilter!
}

function getPriceFilter(filters: CatalogFilterInteface[]): CatalogFilterInteface {
    const priceFilter = filters.find(f => f.slug === CatalogDefaultFilterSlugEnum.PRICE)
    expect(priceFilter).toBeDefined()
    return priceFilter!
}

function getBrandValues(brandFilter: CatalogFilterInteface): CatalogFilterValuesSelectType[] {
    expect(Array.isArray(brandFilter.values)).toBe(true)
    return brandFilter.values as CatalogFilterValuesSelectType[]
}

function getSellerValues(sellerFilter: CatalogFilterInteface): CatalogFilterValuesSelectType[] {
    expect(Array.isArray(sellerFilter.values)).toBe(true)
    return sellerFilter.values as CatalogFilterValuesSelectType[]
}

function getPriceRange(priceFilter: CatalogFilterInteface): CatalogFilterValuesRangeType {
    expect(Array.isArray(priceFilter.values)).toBe(false)
    return priceFilter.values as CatalogFilterValuesRangeType
}

describe('CatalogCategoryFilters (e2e)', () => {
    let app: INestApplication<Server>

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()

        app = moduleFixture.createNestApplication()
        await app.init()
    })

    afterAll(async () => {
        await app.close()
    })

    describe('Brand Filtering', () => {
        it('should return correct total when single brand is selected', async () => {
            const baseResponse = await request(app.getHttpServer())
                .get(`/catalog/category/${MOBILE_PHONE_CATEGORY_ID}/filters`)
                .expect(200)

            const baseBody: CatalogFiltersResponse = baseResponse.body
            const baseBrandFilter = getBrandFilter(baseBody.filters)
            const brandValues = getBrandValues(baseBrandFilter)

            if (brandValues.length === 0) {
                return 
            }

            const firstBrand = brandValues[0]

            const filteredResponse = await request(app.getHttpServer())
                .get(`/catalog/category/${MOBILE_PHONE_CATEGORY_ID}/filters?filters=brand:${firstBrand.id}`)
                .expect(200)

            const filteredBody: CatalogFiltersResponse = filteredResponse.body

            expect(filteredBody.total).toBe(firstBrand.count)

            const filteredBrandFilter = getBrandFilter(filteredBody.filters)
            const filteredBrandValues = getBrandValues(filteredBrandFilter)
            expect(filteredBrandValues.length).toBeGreaterThan(1)

            const selectedBrandInFiltered = filteredBrandValues.find(b => b.id === firstBrand.id)
            expect(selectedBrandInFiltered).toBeDefined()

        })

        it('should return correct total when multiple brands are selected', async () => {
            const baseResponse = await request(app.getHttpServer())
                .get(`/catalog/category/${MOBILE_PHONE_CATEGORY_ID}/filters`)
                .expect(200)

            const baseBody: CatalogFiltersResponse = baseResponse.body
            const baseBrandFilter = getBrandFilter(baseBody.filters)
            const brandValues = getBrandValues(baseBrandFilter)

            if (brandValues.length < 2) {
                return
            }

            const firstBrand = brandValues[0]
            const secondBrand = brandValues[1]
            const expectedTotal = firstBrand.count + secondBrand.count

            const filteredResponse = await request(app.getHttpServer())
                .get(`/catalog/category/${MOBILE_PHONE_CATEGORY_ID}/filters?filters=${CatalogDefaultFilterSlugEnum.BRAND}:${firstBrand.id},${secondBrand.id}`)
                .expect(200)

            const filteredBody: CatalogFiltersResponse = filteredResponse.body

            expect(filteredBody.total).toBeLessThanOrEqual(expectedTotal)
            expect(filteredBody.total).toBeGreaterThan(0)

            const filteredBrandFilter = getBrandFilter(filteredBody.filters)
            const filteredBrandValues = getBrandValues(filteredBrandFilter)
            expect(filteredBrandValues.length).toBeGreaterThan(2)
        })
    })

    describe('Seller Filtering', () => {
        it('should return correct total when single seller is selected', async () => {
            const baseResponse = await request(app.getHttpServer())
                .get(`/catalog/category/${MOBILE_PHONE_CATEGORY_ID}/filters`)
                .expect(200)

            const baseBody: CatalogFiltersResponse = baseResponse.body
            const baseSellerFilter = getSellerFilter(baseBody.filters)
            const sellerValues = getSellerValues(baseSellerFilter)

            if (sellerValues.length === 0) {
                return
            }

            const firstSeller = sellerValues[0]

            const filteredResponse = await request(app.getHttpServer())
                .get(`/catalog/category/${MOBILE_PHONE_CATEGORY_ID}/filters?filters=${CatalogDefaultFilterSlugEnum.SELLER}:${firstSeller.id}`)
                .expect(200)

            const filteredBody: CatalogFiltersResponse = filteredResponse.body

            expect(filteredBody.total).toBe(firstSeller.count)

            const filteredSellerFilter = getSellerFilter(filteredBody.filters)
            const filteredSellerValues = getSellerValues(filteredSellerFilter)
            expect(filteredSellerValues.length).toBeGreaterThan(0)
        })

        it('should return correct total when multiple sellers are selected', async () => {
            const baseResponse = await request(app.getHttpServer())
                .get(`/catalog/category/${MOBILE_PHONE_CATEGORY_ID}/filters`)
                .expect(200)

            const baseBody: CatalogFiltersResponse = baseResponse.body
            const baseSellerFilter = getSellerFilter(baseBody.filters)
            const sellerValues = getSellerValues(baseSellerFilter)

            if (sellerValues.length < 2) {
                return
            }

            const firstSeller = sellerValues[0]
            const secondSeller = sellerValues[1]
            const expectedTotal = firstSeller.count + secondSeller.count

            const filteredResponse = await request(app.getHttpServer())
                .get(`/catalog/category/${MOBILE_PHONE_CATEGORY_ID}/filters?filters=${CatalogDefaultFilterSlugEnum.SELLER}:${firstSeller.id},${secondSeller.id}`)
                .expect(200)

            const filteredBody: CatalogFiltersResponse = filteredResponse.body

            expect(filteredBody.total).toBeLessThanOrEqual(expectedTotal)
            expect(filteredBody.total).toBeGreaterThan(0)
        })
    })

    describe('Price Filtering', () => {
        it('should return correct total when price range is applied', async () => {
            const baseResponse = await request(app.getHttpServer())
                .get(`/catalog/category/${MOBILE_PHONE_CATEGORY_ID}/filters`)
                .expect(200)

            const baseBody: CatalogFiltersResponse = baseResponse.body
            const basePriceFilter = getPriceFilter(baseBody.filters)
            const priceRange = getPriceRange(basePriceFilter)

            const midPrice = Math.floor((priceRange.min + priceRange.max) / 2)
            const testMin = priceRange.min
            const testMax = midPrice

            const filteredResponse = await request(app.getHttpServer())
                .get(`/catalog/category/${MOBILE_PHONE_CATEGORY_ID}/filters?filters=price:${testMin}-to-${testMax}`)
                .expect(200)

            const filteredBody: CatalogFiltersResponse = filteredResponse.body

            expect(filteredBody.total).toBeLessThanOrEqual(baseBody.total)
            expect(filteredBody.total).toBeGreaterThanOrEqual(0)

            const filteredPriceFilter = getPriceFilter(filteredBody.filters)
            const filteredPriceValues = getPriceRange(filteredPriceFilter)
            expect(filteredPriceFilter).toBeDefined()
            expect(filteredPriceValues.min).toBe(priceRange.min)
            expect(filteredPriceValues.max).toBe(priceRange.max)
        })
    })

    describe('Dynamic Attribute Filtering', () => {
        it('should return correct total when dynamic attribute is selected', async () => {
            const baseResponse = await request(app.getHttpServer())
                .get(`/catalog/category/${MOBILE_PHONE_CATEGORY_ID}/filters`)
                .expect(200)

            const baseBody: CatalogFiltersResponse = baseResponse.body

            const dynamicFilter = getDynamicFilter(baseBody.filters)

            expect(dynamicFilter).toBeDefined()
            expect(Array.isArray(dynamicFilter?.values)).toBe(true)

            const firstValue = (dynamicFilter!.values as CatalogFilterValuesSelectType[])[0]
            
            const filteredResponse = await request(app.getHttpServer())
                .get(`/catalog/category/${MOBILE_PHONE_CATEGORY_ID}/filters?filters=${dynamicFilter!.slug}:${firstValue.id}`)
                .expect(200)

            const filteredBody: CatalogFiltersResponse = filteredResponse.body

            expect(filteredBody.total).toBe(firstValue.count)

            const filteredDynamicFilter = filteredBody.filters.find(f => f.slug === dynamicFilter!.slug)
            expect(filteredDynamicFilter).toBeDefined()
            expect(filteredBody.filters.length).toBe(baseBody.filters.length)
        })

        it('should return correct total when dynamic attribute is selected with multiple values', async () => {
            const baseResponse = await request(app.getHttpServer())
                .get(`/catalog/category/${MOBILE_PHONE_CATEGORY_ID}/filters`)
                .expect(200)

            const baseBody: CatalogFiltersResponse = baseResponse.body
            const baseDynamicFilter = getDynamicFilter(baseBody.filters)

            const dynamicValues1 = (baseDynamicFilter!.values as CatalogFilterValuesSelectType[])[0]
            const dynamicValues2 = (baseDynamicFilter!.values as CatalogFilterValuesSelectType[])[1]

            const filteredResponse = await request(app.getHttpServer())
                .get(`/catalog/category/${MOBILE_PHONE_CATEGORY_ID}/filters?filters=${baseDynamicFilter!.slug}:${dynamicValues1.id},${dynamicValues2.id}`)
                .expect(200)

            const filteredBody: CatalogFiltersResponse = filteredResponse.body

            expect(filteredBody.total).toBe(dynamicValues1.count + dynamicValues2.count)

            const filteredDynamicFilter = filteredBody.filters.find(f => f.slug === baseDynamicFilter!.slug)
            const filteredDynamicValues = (filteredDynamicFilter!.values as CatalogFilterValuesSelectType[])[0]
            expect(filteredDynamicValues.id).toBe(dynamicValues1.id)

            const filteredDynamicValues2 = (filteredDynamicFilter!.values as CatalogFilterValuesSelectType[])[1]
            expect(filteredDynamicValues2.id).toBe(dynamicValues2.id)
            expect(filteredBody.filters.length).toBe(baseBody.filters.length)
        })
    })

    describe('Combined Filtering', () => {
        it('should return correct total when brand and seller filters are combined', async () => {
            const baseResponse = await request(app.getHttpServer())
                .get(`/catalog/category/${MOBILE_PHONE_CATEGORY_ID}/filters`)
                .expect(200)

            const baseBody: CatalogFiltersResponse = baseResponse.body
            const baseBrandFilter = getBrandFilter(baseBody.filters)
            const baseSellerFilter = getSellerFilter(baseBody.filters)
            
            const brandValues = getBrandValues(baseBrandFilter)
            const sellerValues = getSellerValues(baseSellerFilter)

            expect(brandValues.length).toBeGreaterThan(0)
            expect(sellerValues.length).toBeGreaterThan(0)

            const selectedBrand = brandValues[0]
            const selectedSeller = sellerValues[0]

            const filteredResponse = await request(app.getHttpServer())
                .get(`/catalog/category/${MOBILE_PHONE_CATEGORY_ID}/filters?filters=brand:${selectedBrand.id};seller:${selectedSeller.id}`)
                .expect(200)

            const filteredBody: CatalogFiltersResponse = filteredResponse.body

            expect(filteredBody.total).toBeLessThanOrEqual(selectedBrand.count)
            expect(filteredBody.total).toBeLessThanOrEqual(selectedSeller.count)
            expect(filteredBody.total).toBeGreaterThanOrEqual(0)
        })

        it('should return correct total when brand and price filters are combined', async () => {
            const baseResponse = await request(app.getHttpServer())
                .get(`/catalog/category/${MOBILE_PHONE_CATEGORY_ID}/filters`)
                .expect(200)

            const baseBody: CatalogFiltersResponse = baseResponse.body
            const baseBrandFilter = getBrandFilter(baseBody.filters)
            const basePriceFilter = getPriceFilter(baseBody.filters)
            
            const brandValues = getBrandValues(baseBrandFilter)
            const priceRange = getPriceRange(basePriceFilter)

            expect(brandValues.length).toBeGreaterThan(0)
            expect(priceRange.min).toBeLessThan(priceRange.max)

            const selectedBrand = brandValues[0]
            const midPrice = Math.floor((priceRange.min + priceRange.max) / 2)

            const filteredResponse = await request(app.getHttpServer())
                .get(`/catalog/category/${MOBILE_PHONE_CATEGORY_ID}/filters?filters=brand:${selectedBrand.id};price:${priceRange.min}-to-${midPrice}`)
                .expect(200)

            const filteredBody: CatalogFiltersResponse = filteredResponse.body

            expect(filteredBody.total).toBeLessThanOrEqual(selectedBrand.count)
            expect(filteredBody.total).toBeLessThanOrEqual(baseBody.total)
            expect(filteredBody.total).toBeGreaterThanOrEqual(0)
        })

        it('should return correct when brand and dynamic attribute filters are combined', async () => {
            const baseResponse = await request(app.getHttpServer())
                .get(`/catalog/category/${MOBILE_PHONE_CATEGORY_ID}/filters`)
                .expect(200)

            const baseBody: CatalogFiltersResponse = baseResponse.body
            const baseBrandFilter = getBrandFilter(baseBody.filters)
            const baseDynamicFilter = getDynamicFilter(baseBody.filters)

            const brandValues = getBrandValues(baseBrandFilter)
            const dynamicValues = (baseDynamicFilter!.values as CatalogFilterValuesSelectType[])[0]

            const filteredResponse = await request(app.getHttpServer())
                .get(`/catalog/category/${MOBILE_PHONE_CATEGORY_ID}/filters?filters=brand:${brandValues[0].id};${baseDynamicFilter!.slug}:${dynamicValues.id}`)
                .expect(200)

            const filteredBody: CatalogFiltersResponse = filteredResponse.body

            expect(filteredBody.total).toBeLessThanOrEqual(brandValues[0].count)
            expect(filteredBody.filters.length).toBe(baseBody.filters.length)

            const filteredBrandFilter = getBrandFilter(filteredBody.filters)
            const filteredBrandValues = getBrandValues(filteredBrandFilter)
            expect(filteredBrandValues.length).toBeGreaterThan(0)

            const filteredDynamicFilter = filteredBody.filters.find(f => f.slug === baseDynamicFilter!.slug)
            const filteredDynamicValues = (filteredDynamicFilter!.values as CatalogFilterValuesSelectType[])[0]
            expect(filteredDynamicValues.id).toBe(dynamicValues.id)
        })
    })

    describe('Edge Cases', () => {
        it('should handle non-existent brand filter gracefully', async () => {
            const nonExistentBrandId = 999999

            const response = await request(app.getHttpServer())
                .get(`/catalog/category/${MOBILE_PHONE_CATEGORY_ID}/filters?filters=brand:${nonExistentBrandId}`)
                .expect(200)

            const body: CatalogFiltersResponse = response.body
            expect(body.total).toBe(0)
        })

        it('should handle invalid price range gracefully', async () => {
            const baseResponse = await request(app.getHttpServer())
                .get(`/catalog/category/${MOBILE_PHONE_CATEGORY_ID}/filters`)
                .expect(200)

            const baseBody: CatalogFiltersResponse = baseResponse.body
            const basePriceFilter = getPriceFilter(baseBody.filters)
            const priceRange = getPriceRange(basePriceFilter)

            const invalidMin = priceRange.max + 1000
            const invalidMax = priceRange.max + 2000

            const response = await request(app.getHttpServer())
                .get(`/catalog/category/${MOBILE_PHONE_CATEGORY_ID}/filters?filters=price:${invalidMin}-to-${invalidMax}`)
                .expect(200)

            const body: CatalogFiltersResponse = response.body
            expect(body.total).toBe(0)
        })

        it('should handle empty filters array', async () => {
            const response = await request(app.getHttpServer())
                .get(`/catalog/category/${MOBILE_PHONE_CATEGORY_ID}/filters`)
                .expect(200)

            const body: CatalogFiltersResponse = response.body
            expect(body.total).toBeGreaterThan(0)
            expect(body.filters).toBeDefined()
            expect(Array.isArray(body.filters)).toBe(true)
        })

        it('should maintain filter consistency when filters exclude all products', async () => {
            const baseResponse = await request(app.getHttpServer())
                .get(`/catalog/category/${MOBILE_PHONE_CATEGORY_ID}/filters`)
                .expect(200)

            const baseBody: CatalogFiltersResponse = baseResponse.body
            const baseBrandFilter = getBrandFilter(baseBody.filters)
            const baseSellerFilter = getSellerFilter(baseBody.filters)
            
            const brandValues = getBrandValues(baseBrandFilter)
            const sellerValues = getSellerValues(baseSellerFilter)

            expect(brandValues.length).toBeGreaterThan(0)
            expect(sellerValues.length).toBeGreaterThan(0)

            const lastBrand = brandValues[brandValues.length - 1]
            const firstSeller = sellerValues[0]

            const response = await request(app.getHttpServer())
                .get(`/catalog/category/${MOBILE_PHONE_CATEGORY_ID}/filters?filters=brand:${lastBrand.id};seller:${firstSeller.id}`)
                .expect(200)

            const body: CatalogFiltersResponse = response.body
            
            expect(body.total).toBeGreaterThanOrEqual(0)
            expect(body.filters).toBeDefined()
            expect(Array.isArray(body.filters)).toBe(true)
            
            expect(getBrandFilter(body.filters)).toBeDefined()
            expect(getSellerFilter(body.filters)).toBeDefined()
            expect(getPriceFilter(body.filters)).toBeDefined()
        })
    })
}) 