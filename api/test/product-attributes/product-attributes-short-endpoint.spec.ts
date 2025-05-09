import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import request, { Response } from 'supertest'
import { AppModule } from '../../src/app/app.module'
import { DBService } from '../../src/generic/db/db.service'
import { ProductAttributeValuesDtoInterface, ProductAttributesDtoInterface} from 'contracts'
import { Server } from 'http'

function checkProductAttributeValueStructure(value: ProductAttributeValuesDtoInterface): void {
    expect(value).toHaveProperty('numberValue')
    expect(value.numberValue === null || typeof value.numberValue === 'number').toBe(true)
    expect(value).toHaveProperty('textValue')
    expect(value.textValue === null || typeof value.textValue === 'string').toBe(true)
}

export function checkProductAttributesStructure(attribute: ProductAttributesDtoInterface): void {
    expect(attribute).toHaveProperty('name')
    expect(typeof attribute.name).toBe('string')
    expect(attribute).toHaveProperty('unit')
    expect(attribute.unit === null || typeof attribute.unit === 'string').toBe(true)
    expect(attribute).toHaveProperty('values')
    expect(Array.isArray(attribute.values)).toBe(true)
    attribute.values.forEach(checkProductAttributeValueStructure)
}

describe('/product/:slug/characteristics/short (GET)', () => {
    let app: INestApplication<Server>
    let dbService: DBService
    let productSlug: string

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()

        app = moduleFixture.createNestApplication()
        await app.init()
        dbService = app.get(DBService)
        const product = await dbService.product.findFirst()
        if (!product) throw new Error('No product in database')
        productSlug = product.slug
    })

    afterAll(async () => {
        await app.close()
    })

    it('Should return attributes by product slug', async () => {
        await request(app.getHttpServer())
            .get(`/product/${productSlug}/characteristics/short`)
            .expect(200)
            .expect((res: Response) => {
                expect(Array.isArray(res.body)).toBe(true)
                res.body.forEach(checkProductAttributesStructure)
            })
    })

    it('Should return attributes by product slug', async () => {
        await request(app.getHttpServer())
            .get('/product/non-existent-slug-404/characteristics/short')
            .expect((res: Response) => {
                expect(res.body).toHaveProperty('statusCode')
                expect(res.body.statusCode).toBe(404)
                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toBe('Product not found')
            })
    })
}) 