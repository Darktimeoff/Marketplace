import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import request, { Response } from 'supertest'
import { AppModule } from '../../src/app/app.module'
import { DBService } from '../../src/generic/db/db.service'
import { ProductAttributesGroupedDtoInterface} from 'contracts'
import { Server } from 'http'
import { checkProductAttributesStructure } from './product-attributes-short-endpoint.spec'

function checkProductAttributesGroupedStructure(attributeGroupped: ProductAttributesGroupedDtoInterface): void {
    expect(attributeGroupped).toHaveProperty('name')
    expect(attributeGroupped.name === null || typeof attributeGroupped.name === 'string').toBe(true)
    expect(attributeGroupped).toHaveProperty('attributes')
    expect(Array.isArray(attributeGroupped.attributes)).toBe(true)
    attributeGroupped.attributes.forEach(checkProductAttributesStructure)
}

describe('/product/:productId/characteristics/ (GET)', () => {
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

    it('Should return attributes by product id', async () => {
        await request(app.getHttpServer())
            .get(`/product/${productId}/characteristics/`)
            .expect(200)
            .expect((res: Response) => {
                expect(Array.isArray(res.body)).toBe(true)
                res.body.forEach(checkProductAttributesGroupedStructure)
            })
    })

    it('Should return empty array for not found product', async () => {
        await request(app.getHttpServer())
            .get('/product/99999999/characteristics/')
            .expect((res: Response) => {
              expect(Array.isArray(res.body)).toBe(true)
              expect(res.body.length).toBe(0)
            })
    })

    it('Should return 400 for not number product id', async () => {
        await request(app.getHttpServer())
            .get('/product/not-number/characteristics/')
            .expect((res: Response) => {
                expect(res.body).toHaveProperty('statusCode')
                expect(res.body.statusCode).toBe(400)
            })
    })
}) 