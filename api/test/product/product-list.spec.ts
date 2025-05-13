import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { AppModule } from '../../src/app/app.module'
import { DBService } from '../../src/generic/db/db.service'
import { ProductAvailabilityStatusEnum, ProductShortInfoDtoInterface } from 'contracts'
import { Server } from 'http'
import { checkProductMediaStructure } from '../shared/media.structure'

const checkProductStructure = (product: ProductShortInfoDtoInterface): void => {
    expect(product).toHaveProperty('id')
    expect(typeof product.id).toBe('number')
    expect(product).toHaveProperty('slug')
    expect(typeof product.slug).toBe('string')
    expect(product).toHaveProperty('title')
    expect(typeof product.title).toBe('string')
    expect(product).toHaveProperty('price')
    expect(typeof product.price).toBe('number')
    expect(product.price).toBeGreaterThan(0)
    expect(product).toHaveProperty('oldPrice')
    expect(product.oldPrice === null || typeof product.oldPrice === 'number').toBe(true)
    expect(product).toHaveProperty('image')
    expect(typeof product.image).toBe('object')
    checkProductMediaStructure(product.image)
    expect(Object.values(ProductAvailabilityStatusEnum).includes(product.status as ProductAvailabilityStatusEnum)).toBe(true)
}

describe('ProductController (e2e) - GET /product?ids', () => {
    let app: INestApplication<Server>
    let dbService: DBService
    let productId: number

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()

        app = moduleFixture.createNestApplication()
        await app.init()
        dbService = app.get(DBService)
        const product = await dbService.product.findFirst()
        if (!product) throw new Error('No product in database')
        productId = product.id
    })

    afterAll(async () => {
        await app.close()
    })

    it('/product (GET) should return products by ids', async () => {
        const res = await request(app.getHttpServer())
            .get(`/product?ids=${productId}`)
            .expect(200)
        expect(Array.isArray(res.body)).toBe(true)
        expect(res.body.length).toBe(1)
        res.body.forEach(checkProductStructure)
    })

    it('/product (GET) should return 400 for invalid ids', async () => {
        await request(app.getHttpServer())
            .get('/product?ids=abc,def')
            .expect(400)
    })

    it('/product (GET) should return exception ids required', async () => {
        await request(app.getHttpServer())
            .get('/product')
            .expect(400)
    })

    it('/product (GET) should return exception ids required', async () => {
        await request(app.getHttpServer())
            .get('/product?ids=')
            .expect(400)
    })

    it('/product (GET) should return empty array for empty ids', async () => {
        const res = await request(app.getHttpServer())
            .get('/product?ids=9999999')
            .expect(200)
        expect(Array.isArray(res.body)).toBe(true)
        expect(res.body.length).toBe(0)
    })
}) 