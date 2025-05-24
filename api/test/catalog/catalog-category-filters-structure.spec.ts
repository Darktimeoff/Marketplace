import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import request, { Response } from 'supertest'
import { AppModule } from '../../src/app/app.module'
import { Server } from 'node:http'
import { CatalogDefaultFilterSlugEnum } from '../../src/catalog/enum/catalog-default-filter-slug.enum'
import { CatalogCategoryFiltersDtoInterface, CatalogFilterDtoInterface, CatalogFilterValuesRangeDtoInterface, CatalogFilterValuesSelectDtoInterface, CatalogSortingDtoInterface, CatalogSortingEnum } from 'contracts'
import { MOBILE_CATEGORY_ID } from '../shared/mobile-category-id.constant'

function checkFilterValueStructure(value: CatalogFilterValuesSelectDtoInterface | CatalogFilterValuesRangeDtoInterface) {
    if ('name' in value) {
        expect(typeof value.id).toBe('number')
        expect(value).toHaveProperty('name')
        expect(typeof value.name).toBe('string')
        expect(value).toHaveProperty('count')
        expect(typeof value.count).toBe('number')
    } else {
        expect(value).toHaveProperty('min')
        expect(typeof value.min).toBe('number')
        expect(value).toHaveProperty('max')
        expect(typeof value.max).toBe('number')
        expect(value.min).toBeLessThan(value.max)
        expect(value.min).toBeGreaterThan(0)
        expect(value.max).toBeGreaterThan(0)
    }
}

function checkFilterStructure(filter: CatalogFilterDtoInterface) {
    expect(filter).toHaveProperty('id')
    expect(typeof filter.id).toBe('number')
    expect(filter).toHaveProperty('name')
    expect(typeof filter.name).toBe('string')
    expect(filter).toHaveProperty('slug')
    expect(typeof filter.slug).toBe('string')
    expect(filter).toHaveProperty('values')
    if (Array.isArray(filter.values)) {
        filter.values.forEach(checkFilterValueStructure)
    } else {
        checkFilterValueStructure(filter.values)
    }
}

function checkSortingOptionStructure(sorting: CatalogSortingDtoInterface) {
    expect(sorting).toHaveProperty('id')
    expect(typeof sorting.id).toBe('string')
    expect(sorting).toHaveProperty('isDefault')
    expect(typeof sorting.isDefault).toBe('boolean')
    expect(sorting).toHaveProperty('name')
    expect(typeof sorting.name).toBe('string')
}

function checkCatalogCategoryFiltersStructure(catalog: CatalogCategoryFiltersDtoInterface) {
    expect(catalog).toHaveProperty('total')
    expect(typeof catalog.total).toBe('number')
    expect(catalog.total).toBeGreaterThan(0)
    expect(catalog).toHaveProperty('filters')
    expect(Array.isArray(catalog.filters)).toBe(true)
    catalog.filters.forEach(checkFilterStructure)
    expect(catalog).toHaveProperty('sorting')
    expect(Array.isArray(catalog.sorting)).toBe(true)
    catalog.sorting.forEach(checkSortingOptionStructure)
    expect(catalog.sorting.find(sorting => sorting.isDefault)?.id).toBe(CatalogSortingEnum.NEWEST)
    expect(catalog.sorting.every(sorting => Object.values(CatalogSortingEnum).includes(sorting.id as CatalogSortingEnum))).toBe(true)
    expect(Object.values(CatalogDefaultFilterSlugEnum).every(slug => catalog.filters.find(filter => filter.slug === slug))).toBe(true)
}

describe('CatalogCategoryController (e2e)', () => {
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

    it('/catalog/category/:id/filters (GET) should return an array of products', async () => {
        await request(app.getHttpServer())
            .get(`/catalog/category/${MOBILE_CATEGORY_ID}/filters`)
            .expect(200)
            .expect((res: Response) => {
                const body: CatalogCategoryFiltersDtoInterface = res.body

                checkCatalogCategoryFiltersStructure(body)
            })
    })
})  