import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import request, { Response } from 'supertest'
import { AppModule } from '../../src/app/app.module'
import { DBService } from '../../src/generic/db/db.service'
import { ProductAvailabilityDtoInterface, ProductAvailabilityStatusEnum, SellerDtoInterface } from 'contracts'
import { Server } from 'http'

function checkSellerStructure(seller: SellerDtoInterface): void {
    expect(seller).toHaveProperty('id')
    expect(typeof seller.id).toBe('number')
    expect(seller).toHaveProperty('name')
    expect(typeof seller.name).toBe('string')
}
function checkProductAvailabilityStructure(availability: ProductAvailabilityDtoInterface): void {
    expect(availability).toHaveProperty('seller')
    expect(typeof availability.seller).toBe('object')
    checkSellerStructure(availability.seller)
    expect(availability).toHaveProperty('availabilityStatus')
    expect(availability.availabilityStatus).toBe(ProductAvailabilityStatusEnum.AVAILABLE)
}

describe('ProductAvailabilityController (e2e)', () => {
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

    it('/product/:productId/availability (GET) should return product availability by productId', async () => {
        await request(app.getHttpServer())
            .get(`/product/${productId}/availability`)
            .expect(200)
            .expect((res: Response) => {
                checkProductAvailabilityStructure(res.body as ProductAvailabilityDtoInterface)
            })
    })

    it('/product/:productId/availability (GET) should return 404 for not found', async () => {
        await request(app.getHttpServer())
            .get('/product/99999999/availability')
            .expect((res: Response) => {
                expect(res.body).toHaveProperty('statusCode')
                expect(res.body.statusCode).toBe(404)
                expect(res.body).toHaveProperty('message')
            })
    })

    it('/product/:productId/availability (GET) should return 400 for not number productId', async () => {
        await request(app.getHttpServer())
            .get('/product/not-number/availability')
            .expect((res: Response) => {
                expect(res.body).toHaveProperty('statusCode')
                expect(res.body.statusCode).toBe(400)
            })
    })
}) 