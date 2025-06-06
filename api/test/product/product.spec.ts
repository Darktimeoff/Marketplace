import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import request, { Response } from 'supertest'
import { AppModule } from '../../src/app/app.module'
import { DBService } from '../../src/generic/db/db.service'
import { BrandDtoInterface, ProductInterface } from 'contracts'
import { Server } from 'http'
import { checkProductMediaStructure } from '../shared/media.structure'
import { isDefined } from '@rnw-community/shared'

function checkBrandStructure(brand: BrandDtoInterface): void {
    expect(brand).toHaveProperty('id')
    expect(typeof brand.id).toBe('number')
    expect(brand).toHaveProperty('name')
    expect(typeof brand.name).toBe('string')
}


const checkProductStructure = (product: ProductInterface): void => {
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
    expect(product).toHaveProperty('media')
    expect(Array.isArray(product.media)).toBe(true)
    product.media.forEach(checkProductMediaStructure)
    expect(product).toHaveProperty('brand')
    expect(typeof product.brand === 'object' || product.brand === null).toBe(true)
    if (isDefined(product.brand)) {
        checkBrandStructure(product.brand)
    }
}

describe('ProductController (e2e)', () => {
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

    it('/product/:id (GET) should return product by id', async () => {
        await request(app.getHttpServer())
            .get(`/product/${productId}`)
            .expect(200)
            .expect((res: Response) => {
                checkProductStructure(res.body as ProductInterface)
            })
    })

    it('/product/:id (GET) should return 404 for not found', async () => {
        await request(app.getHttpServer())
            .get('/product/99999999')
            .expect((res: Response) => {
                expect(res.body).toHaveProperty('statusCode')
                expect(res.body.statusCode).toBe(404)
                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toBe('Product not found')
            })
    })

    it('/product/:id (GET) should return bad request for not number id', async () => {
        await request(app.getHttpServer())
            .get('/product/not-number')
            .expect((res: Response) => {
                expect(res.body).toHaveProperty('statusCode')
                expect(res.body.statusCode).toBe(400)
            })
    })
})
