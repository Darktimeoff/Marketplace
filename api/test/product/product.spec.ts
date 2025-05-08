import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import request, { Response } from 'supertest'
import { AppModule } from '../../src/app/app.module'
import { DBService } from '../../src/generic/db/db.service'
import { MediaFormatEnum, MediaModelInterface, MediaTypeEnum, ProductInterface } from 'contracts'
import { Server } from 'http'

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
}

const checkProductMediaStructure = (media: MediaModelInterface): void => {
    expect(media).toHaveProperty('id')
    expect(typeof media.id).toBe('number')
    expect(media).toHaveProperty('url')
    expect(typeof media.url).toBe('string')
    expect(media).toHaveProperty('type')
    expect(typeof media.type).toBe('string')
    expect(Object.values(MediaTypeEnum).includes(media.type as MediaTypeEnum)).toBe(true)
    expect(media).toHaveProperty('format')
    expect(typeof media.format).toBe('string')
    expect(Object.values(MediaFormatEnum).includes(media.format as MediaFormatEnum)).toBe(true)
}

describe('ProductController (e2e)', () => {
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

    it('/product/:slug (GET) should return product by slug', async () => {
        await request(app.getHttpServer())
            .get(`/product/${productSlug}`)
            .expect(200)
            .expect((res: Response) => {
                checkProductStructure(res.body as ProductInterface)
            })
    })

    it('/product/:slug (GET) should return 404 for not found', async () => {
        await request(app.getHttpServer())
            .get('/product/non-existent-slug-404')
            .expect((res: Response) => {
                expect(res.body).toHaveProperty('statusCode')
                expect(res.body.statusCode).toBe(404)
                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toBe('Product not found')
            })
    })
})
